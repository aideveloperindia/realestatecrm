# Vercel Environment Variables Verification Checklist

## 🔍 Critical Issue Found: Connection String Format

Your original connection string was:
```
mongodb+srv://aideveloperindia_db_user:y3VndJC8SvQovBKY@realestatecrm.fiq02a1.mongodb.net/?appName=realestatecrm
```

**❌ PROBLEM:** This is missing:
1. Database name (`/karimnagar_crm`)
2. Required query parameters (`retryWrites=true&w=majority`)

---

## ✅ CORRECT Connection String for Vercel

Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

### Variable 1: MONGODB_URI

**Key:** `MONGODB_URI`

**Value (COPY THIS EXACTLY - NO SPACES):**
```
mongodb+srv://aideveloperindia_db_user:y3VndJC8SvQovBKY@realestatecrm.fiq02a1.mongodb.net/karimnagar_crm?retryWrites=true&w=majority&appName=realestatecrm
```

**Environments:** ☑ Production ☑ Preview ☑ Development

**⚠️ IMPORTANT:**
- Must include `/karimnagar_crm` (database name)
- Must include `?retryWrites=true&w=majority` (query parameters)
- No spaces or line breaks
- No quotes around the value

---

### Variable 2: JWT_SECRET

**Key:** `JWT_SECRET`

**Value:**
```
6fa9e19fcca83be9b4eec7277bd48d171d07934c879bf67a3ba8fb2089a26ca3
```

**Environments:** ☑ Production ☑ Preview ☑ Development

---

### Variable 3: NEXT_PUBLIC_APP_URL

**Key:** `NEXT_PUBLIC_APP_URL`

**Value:**
```
https://realestatecrms.vercel.app
```

**Environments:** ☑ Production ☑ Preview ☑ Development

---

## 🔍 Verification Steps

### Step 1: Check Variable Names (Case-Sensitive!)

In Vercel, verify these exact names:
- ✅ `MONGODB_URI` (not `mongodb_uri` or `MONGODB_URI_`)
- ✅ `JWT_SECRET` (not `jwt_secret`)
- ✅ `NEXT_PUBLIC_APP_URL` (not `NEXT_PUBLIC_APP_URL_`)

### Step 2: Check Variable Values

**MONGODB_URI should be:**
```
mongodb+srv://aideveloperindia_db_user:y3VndJC8SvQovBKY@realestatecrm.fiq02a1.mongodb.net/karimnagar_crm?retryWrites=true&w=majority&appName=realestatecrm
```

**Check for:**
- ✅ Starts with `mongodb+srv://`
- ✅ Has username: `aideveloperindia_db_user`
- ✅ Has password: `y3VndJC8SvQovBKY`
- ✅ Has cluster: `@realestatecrm.fiq02a1.mongodb.net`
- ✅ **Has database name:** `/karimnagar_crm` ← **CRITICAL!**
- ✅ Has query params: `?retryWrites=true&w=majority&appName=realestatecrm`

### Step 3: Check Environment Scope

Each variable should be set for:
- ☑ Production
- ☑ Preview  
- ☑ Development

### Step 4: Redeploy After Changes

**IMPORTANT:** After adding/updating variables:
1. Go to **Deployments** tab
2. Click **...** (three dots) on latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

---

## 🚨 Common Mistakes

### Mistake 1: Missing Database Name
❌ `...mongodb.net/?appName=realestatecrm`
✅ `...mongodb.net/karimnagar_crm?retryWrites=true&w=majority&appName=realestatecrm`

### Mistake 2: Extra Spaces
❌ `mongodb+srv://... ` (space at end)
✅ `mongodb+srv://...` (no spaces)

### Mistake 3: Quotes Around Value
❌ Value: `"mongodb+srv://..."`
✅ Value: `mongodb+srv://...` (no quotes)

### Mistake 4: Wrong Environment Scope
❌ Only set for Production
✅ Set for Production, Preview, AND Development

### Mistake 5: Variable Name Typo
❌ `MONGODB_URI_` (extra underscore)
❌ `mongodb_uri` (lowercase)
✅ `MONGODB_URI` (exact case)

---

## 🔒 MongoDB Atlas IP Whitelist

Even with correct connection string, MongoDB Atlas might block Vercel:

1. Go to **MongoDB Atlas** → **Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
4. Click **Confirm**
5. Wait 1-2 minutes

---

## 🧪 Test After Fixing

1. **Redeploy** in Vercel
2. Visit: `https://realestatecrms.vercel.app/login`
3. Try login:
   - Email: `admin@realestatecrms`
   - Password: `Passw0rd!`

If still failing:
- Check Vercel function logs (Deployments → Functions → Runtime Logs)
- Look for specific error messages
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`

---

## 📋 Quick Copy-Paste Checklist

In Vercel Environment Variables, you should have:

| Variable Name | Value | Environments |
|--------------|-------|--------------|
| `MONGODB_URI` | `mongodb+srv://aideveloperindia_db_user:y3VndJC8SvQovBKY@realestatecrm.fiq02a1.mongodb.net/karimnagar_crm?retryWrites=true&w=majority&appName=realestatecrm` | All |
| `JWT_SECRET` | `6fa9e19fcca83be9b4eec7277bd48d171d07934c879bf67a3ba8fb2089a26ca3` | All |
| `NEXT_PUBLIC_APP_URL` | `https://realestatecrms.vercel.app` | All |

---

## ✅ After All Variables Are Set

1. ✅ All 3 variables added
2. ✅ All set for Production, Preview, Development
3. ✅ MONGODB_URI includes `/karimnagar_crm`
4. ✅ MongoDB Atlas IP whitelist has `0.0.0.0/0`
5. ✅ Redeployed in Vercel
6. ✅ Database seeded (visit `/api/seed` or use seed script)
7. ✅ Test login works

---

## 🆘 Still Not Working?

Check Vercel function logs:
1. Vercel Dashboard → Deployments → Latest
2. Click **"Functions"** tab
3. Look at **Runtime Logs**
4. Share the exact error message

Common errors:
- `MONGODB_URI is not defined` → Variable not set or wrong name
- `Authentication failed` → Wrong username/password
- `Network timeout` → IP whitelist issue
- `Invalid connection string` → Format issue (missing database name)

