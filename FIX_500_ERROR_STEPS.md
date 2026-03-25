# 🔴 Quick Fix Guide for 500 Error

## What's Happening

Your production site (`https://realestatecrms.vercel.app`) is showing:
- ❌ Error: "Database connection failed. Please check MONGODB_URI environment variable."
- ❌ Console: `api/auth/login:1 Failed to load resource: the server responded with a status of 500 ()`

---

## 🔍 3 Most Likely Causes

### 1. Environment Variable Not Set Correctly in Vercel
### 2. Didn't Redeploy After Setting Variable
### 3. MongoDB Atlas IP Whitelist Blocking

---

## ✅ SOLUTION (Do These in Order)

### STEP 1: Check Vercel Function Logs

This shows the EXACT error:

1. Go to: https://vercel.com/dashboard
2. Click project: **realestatecrms**
3. Click **"Deployments"** tab
4. Click **LATEST** deployment (top one)
5. Click **"Functions"** tab
6. Find **`/api/auth/login`**
7. Click it and check **"Runtime Logs"**

**Copy the error message you see there!**

---

### STEP 2: Verify MONGODB_URI in Vercel

1. **Vercel Dashboard** → **Settings** → **Environment Variables**

2. **Check if `MONGODB_URI` exists:**
   - If NO → Add it
   - If YES → Edit it

3. **Set the value EXACTLY to this (copy entire line):**
   ```
   mongodb+srv://aideveloperindia_db_user:y3VndJC8SvQovBKY@realestatecrm.fiq02a1.mongodb.net/karimnagar_crm?retryWrites=true&w=majority&appName=realestatecrm
   ```

4. **Make sure it's enabled for:**
   - ☑ Production
   - ☑ Preview
   - ☑ Development

5. **Click "Save"**

---

### STEP 3: REDEPLOY (MOST IMPORTANT!)

**After updating the variable, you MUST redeploy:**

1. Go to **"Deployments"** tab
2. Click **"..."** (three dots) on the **LATEST** deployment
3. Click **"Redeploy"**
4. Wait 2-5 minutes for deployment to complete

**⚠️ If you don't redeploy, your changes won't apply!**

---

### STEP 4: Check MongoDB Atlas IP Whitelist

1. Go to: https://cloud.mongodb.com/
2. Select your cluster
3. Click **"Network Access"** (left sidebar)
4. Check if `0.0.0.0/0` exists

**If NOT:**
1. Click **"Add IP Address"**
2. Click **"Allow Access from Anywhere"**
3. Wait 2-3 minutes

---

### STEP 5: Test Using Diagnostic Endpoint

After I push the diagnostic endpoint, visit:
```
https://realestatecrms.vercel.app/api/debug/env
```

This will show you:
- ✅ If `MONGODB_URI` is set
- ✅ If it includes the database name
- ✅ If all variables are configured

---

## 📋 Quick Checklist

- [ ] Checked Vercel function logs (see exact error)
- [ ] Verified `MONGODB_URI` exists in Vercel
- [ ] Verified value includes `/karimnagar_crm`
- [ ] Verified value includes `?retryWrites=true&w=majority`
- [ ] Set for ALL environments (Production/Preview/Development)
- [ ] **REDEPLOYED after updating variable** ⚠️
- [ ] MongoDB Atlas IP whitelist has `0.0.0.0/0`

---

## 🎯 Most Common Mistake

**You update the environment variable but forget to REDEPLOY!**

**Solution:** Always redeploy after changing environment variables.

---

## 🆘 Still Not Working?

1. Share the error from Vercel function logs (Step 1)
2. Visit `/api/debug/env` and share the response
3. Confirm you redeployed after updating variables

---

## ✅ After Fixing

1. Visit: `https://realestatecrms.vercel.app/login`
2. Login with:
   - Email: `admin@karimnagar.properties`
   - Password: `Passw0rd!`

**Note:** If database isn't seeded, you'll need to seed it first using `/api/seed` endpoint.

