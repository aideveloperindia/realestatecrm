# Fixing MongoDB Connection Error in Vercel

## Error: "Database connection failed. Please check MONGODB_URI environment variable."

## Quick Fix Steps

### Step 1: Verify MONGODB_URI in Vercel

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Check if `MONGODB_URI` exists
3. If not, add it with this exact value:

```
mongodb+srv://aideveloperindia_db_user:y3VndJC8SvQovBKY@realestatecrm.fiq02a1.mongodb.net/karimnagar_crm?retryWrites=true&w=majority&appName=realestatecrm
```

**⚠️ CRITICAL:** Make sure the connection string includes:
- Database name: `/karimnagar_crm` (after `.net/`)
- No extra spaces or line breaks
- All query parameters included: `?retryWrites=true&w=majority&appName=realestatecrm`

### Step 2: Check MongoDB Atlas IP Whitelist

1. Go to **MongoDB Atlas Dashboard**
2. Click **Network Access** (left sidebar)
3. Click **Add IP Address**
4. Click **Allow Access from Anywhere** (or enter `0.0.0.0/0`)
5. Click **Confirm**
6. Wait 1-2 minutes for changes to propagate

**Why this is needed:** Vercel serverless functions use dynamic IPs, so you must allow all IPs.

### Step 3: Verify MongoDB User Credentials

1. Go to **MongoDB Atlas** → **Database Access**
2. Find user: `aideveloperindia_db_user`
3. Verify password is: `y3VndJC8SvQovBKY`
4. Ensure user has **Read and write** permissions
5. If password is different, update `MONGODB_URI` in Vercel

### Step 4: Verify Database Name

The connection string includes `/karimnagar_crm` which is the database name.

- If database doesn't exist, MongoDB will create it automatically on first write
- Or create it manually in MongoDB Atlas → Browse Collections → Create Database

### Step 5: Redeploy After Adding Environment Variable

After adding/updating `MONGODB_URI` in Vercel:

1. Go to **Deployments** tab
2. Click **...** (three dots) on latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### Step 6: Test Connection

After redeploy, try logging in again. If still failing:

1. Go to **Deployments** → Latest → **Functions** tab
2. Look for error logs
3. Check for specific error messages like:
   - "authentication failed" → Wrong username/password
   - "network timeout" → IP whitelist issue
   - "server selection timeout" → Connection string issue

## Complete MONGODB_URI Format

Your connection string should look exactly like this:

```
mongodb+srv://aideveloperindia_db_user:y3VndJC8SvQovBKY@realestatecrm.fiq02a1.mongodb.net/karimnagar_crm?retryWrites=true&w=majority&appName=realestatecrm
```

**Breakdown:**
- `mongodb+srv://` - Protocol
- `aideveloperindia_db_user` - Username
- `y3VndJC8SvQovBKY` - Password
- `@realestatecrm.fiq02a1.mongodb.net` - Cluster host
- `/karimnagar_crm` - Database name (IMPORTANT!)
- `?retryWrites=true&w=majority&appName=realestatecrm` - Connection options

## Common Issues

### Issue 1: Connection String Missing Database Name

**Wrong:**
```
mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority
```

**Correct:**
```
mongodb+srv://user:pass@cluster.mongodb.net/karimnagar_crm?retryWrites=true&w=majority
```

### Issue 2: IP Whitelist Blocking

**Solution:** Add `0.0.0.0/0` to MongoDB Atlas IP whitelist

### Issue 3: Environment Variable Not Applied

**Solution:**
- Make sure variable is set for correct environment (Production/Preview/Development)
- Redeploy after adding variable
- Check variable name is exactly `MONGODB_URI` (case-sensitive)

### Issue 4: Special Characters in Password

If password has special characters, URL encode them:
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`
- etc.

## Testing the Connection

You can test if the connection string works:

```bash
# Using Node.js
node -e "const mongoose = require('mongoose'); mongoose.connect('YOUR_MONGODB_URI').then(() => console.log('✅ Connected')).catch(e => console.error('❌', e.message))"
```

## After Fixing

1. ✅ Set `MONGODB_URI` in Vercel environment variables
2. ✅ Add `0.0.0.0/0` to MongoDB Atlas IP whitelist
3. ✅ Redeploy in Vercel
4. ✅ Seed database using `/api/seed` endpoint
5. ✅ Test login

## Still Not Working?

Check Vercel function logs for detailed error messages:
1. Vercel Dashboard → Deployments → Latest
2. Click "Functions" tab
3. Look at runtime logs
4. Share the specific error message for further help

