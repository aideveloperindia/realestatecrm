# Production Internal Server Errors - Explained & Fixed

## 🔴 Main Issue: "Database connection failed"

This error happens because **MongoDB connection is failing** in production (Vercel).

---

## 📋 Root Causes & Fixes

### Cause #1: MONGODB_URI Not Set in Vercel ⚠️ MOST COMMON

**What's happening:**
- Vercel doesn't have access to your `.env` file
- Environment variables must be set in Vercel Dashboard
- Without `MONGODB_URI`, the app can't connect to MongoDB

**Fix:**
1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Click **"Add New"**
3. Add this variable:
   - **Key:** `MONGODB_URI`
   - **Value:** `mongodb+srv://aideveloperindia_db_user:y3VndJC8SvQovBKY@realestatecrm.fiq02a1.mongodb.net/karimnagar_crm?retryWrites=true&w=majority&appName=realestatecrm`
   - **Environments:** Check ☑ Production ☑ Preview ☑ Development
4. Click **Save**
5. **Redeploy** (Deployments → Latest → Redeploy)

---

### Cause #2: MongoDB Atlas IP Whitelist Blocking Vercel 🔒

**What's happening:**
- MongoDB Atlas only allows connections from whitelisted IPs
- Vercel serverless functions use dynamic IPs
- Your current whitelist doesn't include Vercel IPs

**Fix:**
1. Go to **MongoDB Atlas** → **Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** button
   - This adds `0.0.0.0/0` (allows all IPs)
4. Click **Confirm**
5. Wait 1-2 minutes for changes to apply

---

### Cause #3: Connection String Missing Database Name 📝

**What's happening:**
- Connection string must include database name: `/karimnagar_crm`
- Missing database name causes connection issues

**Check your connection string includes:**
```
...mongodb.net/karimnagar_crm?retryWrites...
```
✅ Correct: Has `/karimnagar_crm`
❌ Wrong: `...mongodb.net/?retryWrites...` (missing database name)

---

### Cause #4: Database Not Seeded 👤

**What's happening:**
- Even if connection works, there's no admin user in database
- Login fails because user doesn't exist

**Fix:**
After fixing MongoDB connection, seed the database:

1. Add `SEED_SECRET` in Vercel (optional but recommended):
   - Key: `SEED_SECRET`
   - Value: `temp-secret-12345`

2. Call seed endpoint:
   ```bash
   POST https://your-app.vercel.app/api/seed
   Headers: Authorization: Bearer temp-secret-12345
   ```

3. **After seeding, DELETE** `/app/api/seed/route.ts` for security!

---

## 🚀 Complete Fix Checklist

Do these in order:

### ✅ Step 1: Add Environment Variables to Vercel

Go to: **Vercel Dashboard** → Project → **Settings** → **Environment Variables**

Add these 3 variables:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | `mongodb+srv://aideveloperindia_db_user:y3VndJC8SvQovBKY@realestatecrm.fiq02a1.mongodb.net/karimnagar_crm?retryWrites=true&w=majority&appName=realestatecrm` |
| `JWT_SECRET` | `6fa9e19fcca83be9b4eec7277bd48d171d07934c879bf67a3ba8fb2089a26ca3` |
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` (replace with your actual URL) |

**Important:** Select all environments (Production, Preview, Development) for each variable!

### ✅ Step 2: Fix MongoDB Atlas IP Whitelist

1. MongoDB Atlas → **Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"**
4. Confirm
5. Wait 2 minutes

### ✅ Step 3: Redeploy in Vercel

1. Vercel Dashboard → **Deployments**
2. Click **...** on latest deployment
3. Click **"Redeploy"**
4. Wait for completion

### ✅ Step 4: Seed Database

Call the seed API endpoint to create admin user (see Cause #4 above)

### ✅ Step 5: Test Login

- URL: `https://your-app.vercel.app/login`
- Email: `admin@realestatecrms`
- Password: `Passw0rd!`

---

## 🔍 How to Check What's Wrong

### Check Vercel Function Logs:

1. Vercel Dashboard → Your Project
2. **Deployments** tab → Latest deployment
3. Click **"Functions"** tab
4. Look at **Runtime Logs**

### Common Error Messages:

```
❌ "MONGODB_URI is not defined"
   → Add MONGODB_URI in Vercel environment variables

❌ "MongoServerError: Authentication failed"
   → Check username/password in connection string

❌ "MongoNetworkError" or "timeout"
   → Add 0.0.0.0/0 to MongoDB Atlas IP whitelist

❌ "User not found" on login
   → Database not seeded - run seed script
```

---

## 📝 Exact Connection String Format

Your `MONGODB_URI` should be exactly this:

```
mongodb+srv://aideveloperindia_db_user:y3VndJC8SvQovBKY@realestatecrm.fiq02a1.mongodb.net/karimnagar_crm?retryWrites=true&w=majority&appName=realestatecrm
```

**Parts:**
- `mongodb+srv://` - Protocol
- `aideveloperindia_db_user:y3VndJC8SvQovBKY` - Username:Password
- `@realestatecrm.fiq02a1.mongodb.net` - Cluster host
- `/karimnagar_crm` - **Database name** (IMPORTANT!)
- `?retryWrites=true&w=majority&appName=realestatecrm` - Options

---

## 🎯 Quick Summary

**The error "Database connection failed" means:**
1. ❌ `MONGODB_URI` not set in Vercel → Add it
2. ❌ MongoDB Atlas blocking Vercel IPs → Add `0.0.0.0/0` to whitelist
3. ❌ Database not seeded → Run seed script

**After fixing:**
1. ✅ Redeploy in Vercel
2. ✅ Seed database
3. ✅ Test login
4. ✅ Change admin password

---

## 💡 Why This Happens

- **Local vs Production:** Your `.env` file works locally but isn't available in Vercel
- **Environment Variables:** Must be set separately in Vercel Dashboard
- **IP Whitelisting:** MongoDB Atlas requires IP whitelist (Vercel uses dynamic IPs)
- **First-Time Setup:** Database needs to be seeded with admin user

---

## ✅ After All Fixes

Once everything is set up:
1. Login should work
2. Dashboard should load
3. All features should function
4. Delete seed API route for security
5. Change admin password

---

For detailed troubleshooting, see: `PRODUCTION_ISSUES_AND_FIXES.md`

