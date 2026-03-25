# 🔴 Debugging 500 Error - Step by Step Guide

## Current Error
- URL: `https://realestatecrms.vercel.app/login`
- Error: `api/auth/login:1 Failed to load resource: the server responded with a status of 500`
- Message: "Database connection failed. Please check MONGODB_URI environment variable."

---

## 🔍 STEP 1: Check Vercel Function Logs (MOST IMPORTANT!)

This will tell us the EXACT error:

1. Go to **Vercel Dashboard**: https://vercel.com/dashboard
2. Click on your project: **realestatecrms**
3. Click **"Deployments"** tab
4. Click on the **LATEST deployment** (top one)
5. Click **"Functions"** tab at the top
6. Look for **`/api/auth/login`** function
7. Click on it to see **Runtime Logs**
8. Look for error messages - they will tell you EXACTLY what's wrong

**Common errors you might see:**
- `MONGODB_URI is not defined` → Variable not set
- `MongoServerError: Authentication failed` → Wrong username/password
- `MongoNetworkError` or `timeout` → IP whitelist issue
- `Invalid connection string` → Format issue

**📋 Copy the error message and share it!**

---

## ✅ STEP 2: Verify Environment Variables in Vercel

### Check All 3 Variables Exist:

1. Go to: **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

2. **Verify MONGODB_URI:**
   - Should exist with name: `MONGODB_URI` (exact case, no spaces)
   - Value should be:
   ```
   mongodb+srv://aideveloperindia_db_user:y3VndJC8SvQovBKY@realestatecrm.fiq02a1.mongodb.net/karimnagar_crm?retryWrites=true&w=majority&appName=realestatecrm
   ```
   - ☑ Production
   - ☑ Preview
   - ☑ Development

3. **Verify JWT_SECRET:**
   - Name: `JWT_SECRET`
   - Value: `6fa9e19fcca83be9b4eec7277bd48d171d07934c879bf67a3ba8fb2089a26ca3`
   - ☑ All environments

4. **Verify NEXT_PUBLIC_APP_URL:**
   - Name: `NEXT_PUBLIC_APP_URL`
   - Value: `https://realestatecrms.vercel.app`
   - ☑ All environments

### ⚠️ Common Mistakes:
- ❌ Variable only set for "Production" (missing Preview/Development)
- ❌ Variable name has typo: `MONGODB_URI_` or `mongodb_uri`
- ❌ Value has quotes around it: `"mongodb+srv://..."`
- ❌ Value has spaces at beginning/end
- ❌ Connection string missing `/karimnagar_crm`

---

## 🔄 STEP 3: REDEPLOY After Updating Variables

**CRITICAL:** After updating environment variables, you MUST redeploy!

1. Go to **Deployments** tab
2. Click **"..."** (three dots) on the **LATEST** deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete (2-5 minutes)
5. Try login again

**If you updated variables but didn't redeploy, the old values are still in use!**

---

## 🔒 STEP 4: Check MongoDB Atlas IP Whitelist

Even with correct connection string, MongoDB might be blocking Vercel:

1. Go to **MongoDB Atlas**: https://cloud.mongodb.com/
2. Select your cluster
3. Click **"Network Access"** (left sidebar)
4. Check if `0.0.0.0/0` exists in the list

**If NOT:**
1. Click **"Add IP Address"**
2. Click **"Allow Access from Anywhere"** button
3. Click **Confirm**
4. Wait 2-3 minutes

**If YES:**
- Check if it's **enabled** (not deleted)
- Make sure there are no IP restrictions that override it

---

## 🧪 STEP 5: Test Connection String Locally

Test if the connection string actually works:

```bash
node -e "const mongoose = require('mongoose'); mongoose.connect('mongodb+srv://aideveloperindia_db_user:y3VndJC8SvQovBKY@realestatecrm.fiq02a1.mongodb.net/karimnagar_crm?retryWrites=true&w=majority&appName=realestatecrm').then(() => { console.log('✅ Connected!'); process.exit(0); }).catch(e => { console.error('❌ Error:', e.message); process.exit(1); })"
```

**If this fails locally, the connection string itself is wrong.**

---

## ✅ STEP 6: Verify Variable is Actually Being Used

To verify Vercel is using the variable, we can temporarily log it:

But first, let's check the function logs from Step 1 to see what error it's actually throwing.

---

## 🚨 Most Common Issues (In Order)

### Issue #1: Didn't Redeploy After Setting Variable
**Fix:** Redeploy after adding/updating environment variables

### Issue #2: Variable Not Set for All Environments
**Fix:** Make sure it's set for Production, Preview, AND Development

### Issue #3: MongoDB Atlas IP Whitelist
**Fix:** Add `0.0.0.0/0` to Network Access

### Issue #4: Connection String Format Wrong
**Fix:** Ensure it includes `/karimnagar_crm` and `?retryWrites=true&w=majority`

### Issue #5: Variable Name Typo
**Fix:** Exact name must be `MONGODB_URI` (case-sensitive)

---

## 📋 Quick Checklist

- [ ] Checked Vercel function logs (Step 1)
- [ ] Verified `MONGODB_URI` exists in Vercel
- [ ] Verified `MONGODB_URI` includes `/karimnagar_crm`
- [ ] Verified `MONGODB_URI` includes `?retryWrites=true&w=majority`
- [ ] Verified variable is set for ALL environments (Production/Preview/Development)
- [ ] Redeployed after setting variable
- [ ] Checked MongoDB Atlas IP whitelist has `0.0.0.0/0`
- [ ] Tested connection string locally

---

## 🆘 What to Do Next

1. **First:** Check Vercel function logs (Step 1) - this will tell you the exact error
2. **Second:** Verify all environment variables are set correctly (Step 2)
3. **Third:** Redeploy (Step 3)
4. **Fourth:** Check MongoDB Atlas IP whitelist (Step 4)

**After doing these steps, share:**
- The exact error from Vercel function logs
- Screenshot of your environment variables in Vercel (with values hidden)
- Confirmation that you redeployed

---

## 💡 Quick Test

After fixing, test by visiting:
```
https://realestatecrms.vercel.app/api/auth/login
```

You should get a JSON response (not HTML error page).

