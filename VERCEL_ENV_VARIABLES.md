# Vercel Environment Variables Configuration

## Required Environment Variables for Vercel Deployment

Add these environment variables in your Vercel project settings:

### 1. MONGODB_URI (Required)
**Value:** Your MongoDB Atlas connection string
```
mongodb+srv://aideveloperindia_db_user:y3VndJC8SvQovBKY@realestatecrm.fiq02a1.mongodb.net/karimnagar_crm?retryWrites=true&w=majority&appName=realestatecrm
```

**Note:** Make sure to include the database name (`karimnagar_crm`) in the connection string.

---

### 2. JWT_SECRET (Required)
**Value:** A strong random string for JWT token signing

**Generate a secure secret:**
- Use an online generator: https://randomkeygen.com/
- Or generate using Node.js: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Minimum 32 characters recommended

**Example:**
```
karimnagar-crm-super-secret-jwt-key-2024-production-change-this-to-random-string
```

**⚠️ Important:** Use a different, strong random string in production!

---

### 3. NEXT_PUBLIC_APP_URL (Required)
**Value:** Your Vercel deployment URL

**After first deployment, update with your actual URL:**
```
https://your-app-name.vercel.app
```

**Note:** 
- Vercel will provide this URL after deployment
- You can update it later if needed
- For initial deployment, you can use: `https://realestatecrm.vercel.app` (or your chosen domain)

---

### 4. ADMIN_EMAIL (Optional - for seed script only)
**Value:** Admin user email
```
admin@karimnagar.properties
```

**Note:** Only needed if you want to run the seed script on Vercel. Can be set later.

---

### 5. ADMIN_PASSWORD (Optional - for seed script only)
**Value:** Admin user password
```
Passw0rd!
```

**Note:** Only needed if you want to run the seed script on Vercel. Change after first login!

---

## How to Add Environment Variables in Vercel

### Step-by-Step:

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Select your project (or create new project)

2. **Navigate to Settings**
   - Click on your project
   - Go to **Settings** tab
   - Click on **Environment Variables** in the left sidebar

3. **Add Each Variable**
   - Click **Add New**
   - Enter the **Key** (e.g., `MONGODB_URI`)
   - Enter the **Value** (paste your connection string)
   - Select environments: **Production**, **Preview**, and **Development** (or as needed)
   - Click **Save**

4. **Repeat for All Variables**
   - Add `JWT_SECRET`
   - Add `NEXT_PUBLIC_APP_URL`
   - Add `ADMIN_EMAIL` (optional)
   - Add `ADMIN_PASSWORD` (optional)

5. **Redeploy**
   - After adding variables, go to **Deployments** tab
   - Click **Redeploy** on the latest deployment
   - Or push a new commit to trigger automatic deployment

---

## Quick Copy-Paste for Vercel

### Minimum Required (3 variables):

```
MONGODB_URI=mongodb+srv://aideveloperindia_db_user:y3VndJC8SvQovBKY@realestatecrm.fiq02a1.mongodb.net/karimnagar_crm?retryWrites=true&w=majority&appName=realestatecrm

JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-change-this

NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
```

### With Optional Variables (5 variables):

```
MONGODB_URI=mongodb+srv://aideveloperindia_db_user:y3VndJC8SvQovBKY@realestatecrm.fiq02a1.mongodb.net/karimnagar_crm?retryWrites=true&w=majority&appName=realestatecrm

JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-change-this

NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app

ADMIN_EMAIL=admin@karimnagar.properties

ADMIN_PASSWORD=Passw0rd!
```

---

## Important Notes

1. **JWT_SECRET:** 
   - Must be a strong, random string
   - Never commit this to git
   - Use different secrets for development and production

2. **MONGODB_URI:**
   - Make sure MongoDB Atlas IP whitelist includes Vercel IPs (or use `0.0.0.0/0` for all)
   - Include database name in connection string

3. **NEXT_PUBLIC_APP_URL:**
   - Update this after first deployment with your actual Vercel URL
   - Used for generating absolute URLs if needed

4. **After Deployment:**
   - Run seed script to create admin user (if not done)
   - Change admin password immediately after first login
   - Test all features to ensure everything works

---

## Verifying Environment Variables

After deployment, you can verify variables are set correctly by:
1. Checking Vercel deployment logs for any errors
2. Testing the login functionality
3. Checking MongoDB connection in logs

---

## Troubleshooting

**If MongoDB connection fails:**
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` to allow all IPs)
- Verify connection string includes database name
- Check MongoDB Atlas cluster is running

**If authentication fails:**
- Verify JWT_SECRET is set correctly
- Check for typos in environment variable names
- Ensure variables are set for the correct environment (Production/Preview)

**If app URL issues:**
- Update NEXT_PUBLIC_APP_URL with actual Vercel URL
- Redeploy after updating

