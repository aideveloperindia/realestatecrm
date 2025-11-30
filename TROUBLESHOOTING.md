# Troubleshooting Guide

## Common Errors and Solutions

### 1. 500 Internal Server Error on Dashboard

**Symptoms:**
- `GET http://localhost:3000/ 500 (Internal Server Error)`
- Dashboard not loading

**Possible Causes:**
1. **Not logged in** - API routes require authentication
   - **Solution:** Go to `/login` and log in first
   - Default credentials: `admin@karimnagar.properties` / `Passw0rd!`

2. **MongoDB connection failing**
   - **Solution:** Check MongoDB Atlas:
     - IP whitelist includes your IP (or `0.0.0.0/0` for all)
     - Connection string is correct in `.env`
     - Database user has proper permissions

3. **Environment variables not loaded**
   - **Solution:** 
     - Restart dev server: `npm run dev`
     - Check `.env` file exists and has correct values
     - Verify `MONGODB_URI` and `JWT_SECRET` are set

**Quick Fix:**
```bash
# 1. Stop the dev server (Ctrl+C)
# 2. Check .env file exists
# 3. Restart server
npm run dev
# 4. Go to http://localhost:3000/login
# 5. Login with admin credentials
```

---

### 2. Chrome Extension Errors (Can be Ignored)

**Symptoms:**
```
Uncaught (in promise) TypeError: Failed to fetch dynamically imported module: 
chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/...
```

**Solution:** 
- These are from browser extensions (PDF viewers, etc.)
- **Completely safe to ignore** - they don't affect the app
- To hide them: Disable browser extensions or use incognito mode

---

### 3. Authentication Errors

**Symptoms:**
- Redirected to login page repeatedly
- "Invalid credentials" error

**Solution:**
1. Clear browser cookies for localhost
2. Reset admin password:
   ```bash
   npm run reset-admin
   ```
3. Try logging in again

---

### 4. MongoDB Connection Errors

**Symptoms:**
- "MongoDB connection failed" in server logs
- API routes returning 500 errors

**Solution:**
1. Check MongoDB Atlas:
   - Cluster is running
   - IP whitelist includes `0.0.0.0/0` (all IPs)
   - Connection string in `.env` is correct

2. Test connection:
   ```bash
   # Check if connection string works
   node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => console.log('Connected')).catch(e => console.error(e))"
   ```

3. Update connection string if needed:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/karimnagar_crm?retryWrites=true&w=majority
   ```

---

### 5. Build Errors

**Symptoms:**
- `npm run build` fails
- TypeScript errors

**Solution:**
1. Check for TypeScript errors:
   ```bash
   npm run build
   ```
2. Fix any type errors shown
3. Ensure all dependencies are installed:
   ```bash
   npm install
   ```

---

### 6. API Routes Not Working

**Symptoms:**
- API calls returning 500 errors
- "Internal server error" messages

**Solution:**
1. Check server logs in terminal where `npm run dev` is running
2. Verify authentication - most API routes require login
3. Check MongoDB connection
4. Verify environment variables are set

---

## Quick Diagnostic Steps

1. **Check if server is running:**
   ```bash
   # Should see Node.js process
   Get-Process -Name node
   ```

2. **Check environment variables:**
   ```bash
   # Should show MONGODB_URI
   Get-Content .env
   ```

3. **Test MongoDB connection:**
   - Go to MongoDB Atlas dashboard
   - Check cluster status
   - Verify IP whitelist

4. **Check browser console:**
   - Press F12 in browser
   - Look at Console tab for errors
   - Check Network tab for failed requests

5. **Check server logs:**
   - Look at terminal where `npm run dev` is running
   - Check for error messages

---

## Most Common Solution

**If you see 500 error on dashboard:**

1. **Make sure you're logged in:**
   - Go to `http://localhost:3000/login`
   - Login with: `admin@karimnagar.properties` / `Passw0rd!`

2. **If login fails:**
   ```bash
   npm run reset-admin
   ```

3. **If still not working:**
   - Check MongoDB connection
   - Restart dev server
   - Clear browser cache/cookies

---

## Getting Help

If issues persist:
1. Check server logs in terminal
2. Check browser console (F12)
3. Verify all environment variables are set
4. Ensure MongoDB Atlas is accessible
5. Try restarting dev server

