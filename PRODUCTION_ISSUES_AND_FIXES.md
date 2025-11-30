# Production Deployment Issues & Fixes

## Current Issues in Production

### 1. ❌ Internal Server Error - "Database connection failed"

**Error Message:**
```
Database connection failed. Please check MONGODB_URI environment variable.
```

**Root Causes:**

#### Issue A: MONGODB_URI Not Set in Vercel
- **Problem:** Environment variable is missing or incorrect
- **Fix:** 
  1. Go to Vercel Dashboard → Project → Settings → Environment Variables
  2. Add `MONGODB_URI` with value:
     ```
     mongodb+srv://aideveloperindia_db_user:y3VndJC8SvQovBKY@realestatecrm.fiq02a1.mongodb.net/karimnagar_crm?retryWrites=true&w=majority&appName=realestatecrm
     ```
  3. Select all environments: Production, Preview, Development
  4. **Redeploy** after adding

#### Issue B: MongoDB Atlas IP Whitelist
- **Problem:** Vercel serverless functions use dynamic IPs, and MongoDB Atlas is blocking them
- **Fix:**
  1. Go to MongoDB Atlas → Network Access
  2. Click "Add IP Address"
  3. Click "Allow Access from Anywhere" (adds `0.0.0.0/0`)
  4. Save and wait 1-2 minutes for propagation

#### Issue C: Connection String Missing Database Name
- **Problem:** Connection string doesn't include `/karimnagar_crm`
- **Fix:** Ensure connection string includes database name:
  ```
  ...mongodb.net/karimnagar_crm?retryWrites...
  ```
  Not: `...mongodb.net/?retryWrites...` ❌

#### Issue D: Database Not Seeded
- **Problem:** Even if connection works, no admin user exists
- **Fix:** Seed the database using `/api/seed` endpoint

---

### 2. ❌ 500 Error on Login Endpoint

**Error:** `POST /api/auth/login` returns 500

**Possible Causes:**
1. MongoDB connection failing (see Issue #1 above)
2. Database user doesn't exist
3. JWT_SECRET not set

**Fix:**
1. Fix MongoDB connection (Issue #1)
2. Seed database (create admin user)
3. Verify `JWT_SECRET` is set in Vercel

---

### 3. ⚠️ Missing Environment Variables

**Required Variables in Vercel:**
```
MONGODB_URI=mongodb+srv://aideveloperindia_db_user:y3VndJC8SvQovBKY@realestatecrm.fiq02a1.mongodb.net/karimnagar_crm?retryWrites=true&w=majority&appName=realestatecrm

JWT_SECRET=6fa9e19fcca83be9b4eec7277bd48d171d07934c879bf67a3ba8fb2089a26ca3

NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

**How to Add:**
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Click "Add New"
3. Enter key and value
4. Select environments (Production, Preview, Development)
5. Save
6. **Redeploy** for changes to take effect

---

## Step-by-Step Fix for Production

### Step 1: Set Environment Variables in Vercel

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these 3 variables:

   **Variable 1:**
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://aideveloperindia_db_user:y3VndJC8SvQovBKY@realestatecrm.fiq02a1.mongodb.net/karimnagar_crm?retryWrites=true&w=majority&appName=realestatecrm`
   - Environments: ☑ Production ☑ Preview ☑ Development

   **Variable 2:**
   - Key: `JWT_SECRET`
   - Value: `6fa9e19fcca83be9b4eec7277bd48d171d07934c879bf67a3ba8fb2089a26ca3`
   - Environments: ☑ Production ☑ Preview ☑ Development

   **Variable 3:**
   - Key: `NEXT_PUBLIC_APP_URL`
   - Value: `https://your-actual-vercel-url.vercel.app` (replace with your URL)
   - Environments: ☑ Production ☑ Preview ☑ Development

5. Click **Save** for each variable

### Step 2: Configure MongoDB Atlas

1. Go to https://cloud.mongodb.com/
2. Login to your account
3. Select your cluster
4. Click **Network Access** (left sidebar)
5. Click **Add IP Address**
6. Click **Allow Access from Anywhere** button
7. Click **Confirm**
8. Wait 1-2 minutes for changes to apply

### Step 3: Redeploy in Vercel

1. Go to Vercel Dashboard → **Deployments**
2. Click **...** (three dots) on latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### Step 4: Seed the Database

After deployment, create the admin user:

**Option A: Use Seed API (Recommended)**

1. In Vercel, add environment variable:
   - Key: `SEED_SECRET`
   - Value: `temp-seed-secret-12345` (or any random string)

2. Call the seed endpoint:
   ```bash
   curl -X POST https://your-app.vercel.app/api/seed \
     -H "Authorization: Bearer temp-seed-secret-12345"
   ```

   Or use Postman/Thunder Client:
   - Method: POST
   - URL: `https://your-app.vercel.app/api/seed`
   - Headers: `Authorization: Bearer temp-seed-secret-12345`

3. After successful seed, **DELETE** `/app/api/seed/route.ts` from codebase for security

**Option B: Use Vercel CLI**

```bash
npm i -g vercel
vercel login
vercel link
vercel env pull .env.local
npm run seed
```

### Step 5: Test Login

1. Go to: `https://your-app.vercel.app/login`
2. Login with:
   - Email: `admin@karimnagar.properties`
   - Password: `Passw0rd!`
3. If successful, change password immediately!

---

## Checking Vercel Logs for Errors

1. Go to Vercel Dashboard → Your Project
2. Click **Deployments** tab
3. Click on latest deployment
4. Click **Functions** tab
5. Look at **Runtime Logs**

**Common Error Messages:**

| Error | Cause | Fix |
|-------|-------|-----|
| `MONGODB_URI is not defined` | Environment variable missing | Add in Vercel settings |
| `MongoServerError: Authentication failed` | Wrong username/password | Check connection string |
| `MongoNetworkError` | IP not whitelisted | Add `0.0.0.0/0` to MongoDB Atlas |
| `server selection timeout` | Connection string issue | Verify format and database name |
| `User not found` | Database not seeded | Run seed script |

---

## Verification Checklist

Before testing, verify:

- [ ] `MONGODB_URI` set in Vercel (with database name `/karimnagar_crm`)
- [ ] `JWT_SECRET` set in Vercel
- [ ] `NEXT_PUBLIC_APP_URL` set in Vercel (with your actual URL)
- [ ] MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- [ ] Vercel deployment successful (check Deployments tab)
- [ ] Database seeded (admin user created)
- [ ] Checked Vercel function logs for errors

---

## Quick Reference: Exact Values

**MONGODB_URI:**
```
mongodb+srv://aideveloperindia_db_user:y3VndJC8SvQovBKY@realestatecrm.fiq02a1.mongodb.net/karimnagar_crm?retryWrites=true&w=majority&appName=realestatecrm
```

**JWT_SECRET:**
```
6fa9e19fcca83be9b4eec7277bd48d171d07934c879bf67a3ba8fb2089a26ca3
```

**Login Credentials:**
- Email: `admin@karimnagar.properties`
- Password: `Passw0rd!`

---

## Still Having Issues?

1. **Check Vercel Function Logs:**
   - Deployments → Latest → Functions → Runtime Logs
   - Look for specific error messages

2. **Test MongoDB Connection:**
   - Verify connection string works
   - Test from a Node.js script or MongoDB Compass

3. **Verify Environment Variables:**
   - Double-check variable names (case-sensitive)
   - Ensure no extra spaces
   - Verify all environments selected

4. **Check MongoDB Atlas:**
   - Cluster is running (not paused)
   - Database user exists and has permissions
   - IP whitelist is correct

