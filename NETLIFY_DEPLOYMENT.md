# Netlify Deployment Guide for Dr. Rajan Jaiswal's Website

Your project is configured for deployment on Netlify.

## Pre-configured Files
- **`netlify.toml`**: Configures the build command (`npm run build`), publish directory (`dist`), Node version (`20`), SPA rewrites (`/* -> /index.html 200`), and security headers.
- **`public/_redirects`**: Ensures proper client-side routing on page refresh.

---

## Method 1: Git-Connected Deployment (Recommended)

1. Push your repository to **GitHub** (or GitLab/Bitbucket).
2. Go to [Netlify Dashboard](https://app.netlify.com/) and click **"Add new site"** > **"Import an existing project"**.
3. Select your repository.
4. Netlify will auto-detect the build settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. **Environment Variables**:
   Under **Site configuration > Environment variables**, add:
   - `VITE_SUPABASE_URL`: `https://cayznhwdupgcxijclgve.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `sb_publishable_DXICplRLbX4InsM81nAGIw_QPoj6PDH`
6. Click **Deploy Site**.

---

## Method 2: Manual Deploy via Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Build the production bundle:
   ```bash
   npm run build
   ```
3. Deploy:
   ```bash
   netlify deploy --prod --dir=dist
   ```
