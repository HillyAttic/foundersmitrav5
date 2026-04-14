# 🚀 Quick Start Guide - FoundersMitra Backend

## Ready to Launch in 5 Steps!

---

## Step 1: Install Dependencies (2 minutes)

Open terminal in project folder and run:

```bash
cd D:/foundersmitra
npm install
```

This installs Resend (email) and Wrangler (Cloudflare CLI).

---

## Step 2: Get Resend API Key (5 minutes)

1. Go to **https://resend.com**
2. Click "Sign Up" (free account)
3. Verify your email
4. Go to "API Keys" section
5. Click "Create API Key"
6. Copy the key (starts with `re_`)

---

## Step 3: Create .env File (1 minute)

Create a new file named `.env` in `D:/foundersmitra/` with this content:

```env
RESEND_API_KEY=re_paste_your_actual_key_here
NOTIFICATION_EMAIL=foundersmitra@gmail.com
FROM_EMAIL=noreply@foundersmitra.com
RATE_LIMIT_REQUESTS=5
RATE_LIMIT_WINDOW_HOURS=1
```

**Important:** Replace `re_paste_your_actual_key_here` with your real Resend API key!

---

## Step 4: Test Locally (5 minutes)

Start the development server:

```bash
npm run dev
```

You should see:
```
⛅️ wrangler 3.78.0
------------------
⎔ Starting local server...
[wrangler:inf] Ready on http://localhost:8788
```

**Test the contact form:**
1. Open browser: `http://localhost:8788/contact.html`
2. Fill out the form with your details
3. Click "Send Message"
4. Check **foundersmitra@gmail.com** inbox for the email!

If email arrives ✅ → Everything works! Ready to deploy.

---

## Step 5: Deploy to Cloudflare Pages (10 minutes)

### Option A: Deploy via GitHub (Recommended)

**5.1 Push to GitHub:**
```bash
git add .
git commit -m "Add backend integration with Cloudflare Workers"
git push origin master
```

**5.2 Connect to Cloudflare:**
1. Go to **https://dash.cloudflare.com**
2. Sign up/login (free account)
3. Click "Workers & Pages" in sidebar
4. Click "Create application" → "Pages" tab
5. Click "Connect to Git"
6. Select your GitHub repository
7. Click "Begin setup"

**5.3 Configure Build Settings:**
- Project name: `foundersmitra`
- Production branch: `master`
- Build command: (leave empty)
- Build output directory: `/`
- Root directory: (leave empty)

Click "Save and Deploy"

**5.4 Add Environment Variables:**
After deployment, go to:
- Settings → Environment variables → Production
- Add these variables:
  - `RESEND_API_KEY` = your Resend API key
  - `NOTIFICATION_EMAIL` = foundersmitra@gmail.com
  - `FROM_EMAIL` = noreply@foundersmitra.com
  - `RATE_LIMIT_REQUESTS` = 5
  - `RATE_LIMIT_WINDOW_HOURS` = 1

Click "Save" and "Redeploy"

**5.5 Test Live Site:**
- Cloudflare gives you a URL like: `foundersmitra.pages.dev`
- Open: `https://foundersmitra.pages.dev/contact.html`
- Test the form!

---

### Option B: Direct Deploy (Faster, No GitHub)

```bash
npm run deploy
```

Follow the prompts to login to Cloudflare and deploy.

Then add environment variables in Cloudflare dashboard (same as Option A, step 5.4).

---

## Step 6: Add Custom Domain (Optional, 5 minutes)

If you have a domain (e.g., foundersmitra.com):

1. In Cloudflare Pages dashboard, go to "Custom domains"
2. Click "Set up a custom domain"
3. Enter your domain: `foundersmitra.com`
4. Cloudflare will show DNS records to add
5. Add the records at your domain registrar
6. Wait 5-10 minutes for DNS propagation
7. SSL certificate issued automatically ✅

---

## Step 7: Submit to Google (Optional, 5 minutes)

**7.1 Google Search Console:**
1. Go to **https://search.google.com/search-console**
2. Click "Add property"
3. Enter: `https://foundersmitra.com`
4. Verify ownership (DNS TXT record or HTML file)
5. Submit sitemap: `https://foundersmitra.com/sitemap.xml`

**7.2 Google Analytics (Optional):**
1. Go to **https://analytics.google.com**
2. Create account and property
3. Get tracking ID (G-XXXXXXXXXX)
4. Add to all HTML pages before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Contact form loads without errors
- [ ] Form validation works (try submitting empty form)
- [ ] Success message appears after submission
- [ ] Email arrives at foundersmitra@gmail.com
- [ ] Email contains all form data
- [ ] Reply-to works (reply to the email)
- [ ] Rate limiting works (submit 6 times quickly)
- [ ] All existing pages still work
- [ ] No console errors in browser
- [ ] Mobile responsive (test on phone)

---

## 🎯 What You've Accomplished

✅ **Contact Form:** Fully functional, sends to foundersmitra@gmail.com  
✅ **Cloudflare Hosting:** Unlimited bandwidth, global CDN, free SSL  
✅ **Email Service:** 3,000 free emails/month via Resend  
✅ **Security:** Rate limiting, input validation, XSS protection  
✅ **SEO:** Sitemap, robots.txt, ready for Google indexing  
✅ **Firebase Ready:** Authentication and database ready when needed  
✅ **Calendly Ready:** Appointment booking integration documented  
✅ **Zero Cost:** Everything on free tier  

---

## 🆘 Common Issues & Fixes

### "npm: command not found"
**Fix:** Install Node.js from https://nodejs.org (LTS version)

### "Module not found: resend"
**Fix:** Run `npm install` in project directory

### Form submits but no email
**Fix:** 
1. Check spam folder in Gmail
2. Verify Resend API key in `.env` and Cloudflare dashboard
3. Check Resend dashboard for delivery logs

### "Cannot find module 'wrangler'"
**Fix:** Run `npm install` again

### Local dev server won't start
**Fix:**
1. Make sure `.env` file exists
2. Check port 8788 isn't already in use
3. Try `npx wrangler pages dev .` instead

### Deployment fails
**Fix:**
1. Verify all files are committed to git
2. Check `functions/` folder exists
3. Verify environment variables in Cloudflare dashboard

---

## 📚 Documentation Links

- **Cloudflare Pages:** https://developers.cloudflare.com/pages/
- **Cloudflare Workers:** https://developers.cloudflare.com/workers/
- **Resend API:** https://resend.com/docs
- **Firebase:** https://firebase.google.com/docs
- **Calendly:** https://help.calendly.com/hc/en-us/articles/223147027

---

## 🔮 Future Enhancements

### Add Firebase Database (When Ready)
1. Create Firebase project: https://console.firebase.google.com
2. Update `js/firebase-config.js` with your credentials
3. Uncomment Firebase code
4. Deploy firestore.rules

### Add Calendly Booking (When Ready)
1. Create Calendly account: https://calendly.com
2. Set up event type (e.g., "30-minute consultation")
3. Add embed code to services.html or create booking.html

### Add Admin Dashboard (When Ready)
1. Enable Firebase Authentication
2. Create admin login page
3. Build dashboard to view contact submissions
4. Track response status

---

## 💡 Pro Tips

1. **Test locally first** - Always test with `npm run dev` before deploying
2. **Check spam folder** - First emails from Resend might go to spam
3. **Monitor Resend dashboard** - Track email delivery and opens
4. **Use Cloudflare Analytics** - Free analytics built into Cloudflare Pages
5. **Keep .env secret** - Never commit `.env` to git (already in .gitignore)
6. **Update sitemap** - When adding new pages, update sitemap.xml

---

## 🎉 You're Done!

Your website is now live with:
- ✅ Working contact form
- ✅ Email notifications
- ✅ Professional hosting
- ✅ SEO optimization
- ✅ Future-ready for Firebase & Calendly

**Next:** Test the form and start receiving inquiries at foundersmitra@gmail.com!

---

**Need Help?** Check `IMPLEMENTATION_COMPLETE.md` for detailed troubleshooting.
