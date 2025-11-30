# 🔍 Diagnostic Guide: Why Production Fails But Local Works

## The Problem

✅ **Local:** Website opens and works  
❌ **Production (Vercel):** Shows "Database connection failed. Please check MONGODB_URI environment variable."

## Why This Happens

### Reason #1: Environment Variables Not Set in Vercel ⚠️ MOST COMMON

**Your local `.env` file works, but Vercel doesn't use it!**

- ✅ Local: Reads from `.env` file
- ❌ Vercel: Doesn't have access to `.env` file
- ✅ Solution: Must set environment variables in Vercel Dashboard

### Reason #2: Variable Set But Not Redeployed

- ✅ You added `MONGODB_URI` in Vercel
- ❌ But didn't redeploy
- ✅ Solution: Must redeploy after changing environment variables

### Reason #3: MongoDB Atlas IP Whitelist Blocking

- ✅ Local: Your IP is whitelisted
- ❌ Vercel: Uses different IPs that aren't whitelisted
- ✅ Solution: Add `0.0.0.0/0` to allow all IPs

---

## 🧪 STEP 1: Use Diagnostic Endpoint

After deployment, visit this URL to check if variables are set:

```
https://realestatecrms.vercel.app/api/debug/env
```

This will show you:
- ✅ If `MONGODB_URI` exists
- ✅ If it includes database name
- ✅ If all required variables are set

---

## ✅ STEP 2: Check Vercel Function Logs

1. Go to: https://vercel.com/dashboard
2. Click project: **realestatecrms**
3. Click **"Deployments"** tab
4. Click **LATEST** deployment
5. Click **"Functions"** tab
6. Click **`/api/auth/login`**
7. Check **"Runtime Logs"**

**Look for these errors:**

```
❌ "MONGODB_URI is not defined"
   → Variable not set in Vercel

❌ "MongoServerError: Authentication failed"
   → Wrong username/password in connection string

❌ "MongoNetworkError" or "timeout"
   → IP whitelist issue - add 0.0.0.0/0

❌ "Invalid connection string"
   → Format issue - missing database name
```

---

## 🔧 STEP 3: Verify Environment Variables in Vercel

Go to: **Vercel Dashboard** → **Settings** → **Environment Variables**

### Variable 1: MONGODB_URI

**Key:** `MONGODB_URI`

**Value (copy exactly - NO quotes, NO spaces):**
```
mongodb+srv://aideveloperindia_db_user:y3VndJC8SvQovBKY@realestatecrm.fiq02a1.mongodb.net/karimnagar_crm?retryWrites=true&w=majority&appName=realestatecrm
```

**Check:**
- ☑ Includes `/karimnagar_crm` (database name)
- ☑ Includes `?retryWrites=true&w=majority`
- ☑ Set for: Production, Preview, Development

### Variable 2: JWT_SECRET

**Key:** `JWT_SECRET`

**Value:**
```
6fa9e19fcca83be9b4eec7277bd48d171d07934c879bf67a3ba8fb2089a26ca3
```

### Variable 3: NEXT_PUBLIC_APP_URL

**Key:** `NEXT_PUBLIC_APP_URL`

**Value:**
```
https://realestatecrms.vercel.app
```

---

## 🔄 STEP 4: REDEPLOY After Setting Variables

**CRITICAL:** After adding/updating environment variables:

1. Go to **"Deployments"** tab
2. Click **"..."** (three dots) on LATEST deployment
3. Click **"Redeploy"**
4. Wait 2-5 minutes for deployment to complete

**If you don't redeploy, the old configuration is still running!**

---

## 🔒 STEP 5: Fix MongoDB Atlas IP Whitelist

1. Go to: https://cloud.mongodb.com/
2. Select your cluster
3. Click **"Network Access"** (left sidebar)
4. Check if `0.0.0.0/0` exists

**If NOT:**
1. Click **"Add IP Address"**
2. Click **"Allow Access from Anywhere"** button
3. Click **Confirm**
4. Wait 2-3 minutes

---

## 🎯 Most Common Issues (In Order)

### Issue #1: Variable Not Set (90% of cases)
- **Symptom:** Works locally, fails in production
- **Fix:** Add `MONGODB_URI` in Vercel Dashboard

### Issue #2: Didn't Redeploy (5% of cases)
- **Symptom:** Added variable but still getting error
- **Fix:** Redeploy after adding variable

### Issue #3: IP Whitelist (4% of cases)
- **Symptom:** Connection timeout errors
- **Fix:** Add `0.0.0.0/0` to MongoDB Atlas

### Issue #4: Wrong Format (1% of cases)
- **Symptom:** Connection string errors
- **Fix:** Ensure includes `/karimnagar_crm` and query params

---

## 📋 Complete Checklist

- [ ] Checked `/api/debug/env` endpoint response
- [ ] Checked Vercel function logs for exact error
- [ ] Verified `MONGODB_URI` exists in Vercel
- [ ] Verified `MONGODB_URI` includes `/karimnagar_crm`
- [ ] Verified `MONGODB_URI` includes `?retryWrites=true&w=majority`
- [ ] Verified all variables set for ALL environments
- [ ] **REDEPLOYED after updating variables** ⚠️
- [ ] MongoDB Atlas IP whitelist has `0.0.0.0/0`
- [ ] Tested connection after redeploy

---

## 🆘 Still Not Working?

1. Visit: `https://realestatecrms.vercel.app/api/debug/env`
   - Share the JSON response

2. Check Vercel function logs
   - Share the exact error message

3. Verify in Vercel Dashboard:
   - Screenshot of environment variables (hide values)
   - Confirmation you redeployed

---

## 💡 Why Local Works But Production Doesn't

| Aspect | Local | Production (Vercel) |
|--------|-------|---------------------|
| Environment Variables | From `.env` file | From Vercel Dashboard |
| IP Address | Your local IP | Dynamic Vercel IPs |
| Database Connection | Your IP whitelisted | May not be whitelisted |
| Configuration | `.env` file | Vercel settings |

**The solution:** Set environment variables in Vercel Dashboard (not just local `.env` file).

