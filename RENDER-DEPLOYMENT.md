# 🚀 Render Deployment Guide

Complete guide to deploy your Fabrice E-Commerce application to Render.

---

## 📋 Prerequisites

1. **GitHub Account** - Your code is already pushed
2. **Render Account** - Sign up at https://render.com (free)
3. **Repository Access** - Render needs access to your GitHub repo

---

## 🎯 Quick Deploy (Automatic)

### Option 1: Deploy with render.yaml (Recommended)

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Click "New +" → "Blueprint"

2. **Connect Repository**
   - Select your GitHub repository: `fabrice-shop-front`
   - Render will automatically detect `render.yaml`

3. **Review Configuration**
   - Database: `fabrice-ecommerce-db` (PostgreSQL)
   - API Service: `fabrice-ecommerce-api` (Node.js)
   - All environment variables are auto-configured

4. **Deploy**
   - Click "Apply"
   - Wait 5-10 minutes for deployment

5. **Initialize Database**
   - Once deployed, go to the database service
   - Click "Connect" → "External Connection"
   - Run the initialization script:
   ```bash
   chmod +x scripts/init-db.sh
   ./scripts/init-db.sh
   ```

---

## 🔧 Manual Deploy (Step by Step)

### Step 1: Create PostgreSQL Database

1. **In Render Dashboard**
   - Click "New +" → "PostgreSQL"
   - Name: `fabrice-ecommerce-db`
   - Database: `fabrice_ecommerce`
   - User: `fabrice_user`
   - Region: Oregon (or closest to you)
   - Plan: Free
   - Click "Create Database"

2. **Wait for Database Creation** (2-3 minutes)

3. **Initialize Database**
   - Click on your database
   - Go to "Connect" → "External Connection"
   - Copy the connection details
   - Run locally:
   ```bash
   # Set environment variables from Render
   export DB_HOST=<your-db-host>
   export DB_PORT=5432
   export DB_USER=fabrice_user
   export DB_PASSWORD=<your-db-password>
   export DB_NAME=fabrice_ecommerce

   # Run initialization script
   chmod +x scripts/init-db.sh
   ./scripts/init-db.sh
   ```

### Step 2: Create Web Service

1. **In Render Dashboard**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   - Name: `fabrice-ecommerce-api`
   - Region: Oregon (same as database)
   - Branch: `main`
   - Root Directory: (leave empty)
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm run server`
   - Plan: Free

3. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable":
   
   ```
   NODE_ENV = production
   PORT = 3001
   JWT_SECRET = <generate-random-string>
   ```

4. **Link Database**
   - Click "Add Environment Variable"
   - For each database variable, select "Add from Database":
     - `DB_HOST` → Select your database → Host
     - `DB_PORT` → Select your database → Port
     - `DB_NAME` → Select your database → Database
     - `DB_USER` → Select your database → User
     - `DB_PASSWORD` → Select your database → Password

5. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment

---

## 🔍 Verify Deployment

### Check API Health
```bash
curl https://your-app-name.onrender.com/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-03-09T..."
}
```

### Test Authentication
```bash
curl -X POST https://your-app-name.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@test.com",
    "password": "customer123"
  }'
```

### Access Frontend
- Backend Portal: `https://your-app-name.onrender.com/backend/login.html`
- Plain HTML: `https://your-app-name.onrender.com/plain-html-version/pages/login.html`

---

## 🎨 Update Frontend URLs

After deployment, update the API URLs in your frontend:

### For Production
Update these files to use your Render URL:

1. **plain-html-version/js/auth.js**
```javascript
// Change from:
this.API_BASE_URL = 'http://localhost:3001/api';

// To:
this.API_BASE_URL = 'https://your-app-name.onrender.com/api';
```

2. **All backend HTML files**
```javascript
// Change from:
const API_BASE_URL = 'http://localhost:3001/api';

// To:
const API_BASE_URL = 'https://your-app-name.onrender.com/api';
```

### Environment-Based URLs (Better Approach)
Create a config file:

**public/config.js**
```javascript
window.APP_CONFIG = {
  API_BASE_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api'
    : 'https://your-app-name.onrender.com/api'
};
```

Then use it in your files:
```javascript
const API_BASE_URL = window.APP_CONFIG.API_BASE_URL;
```

---

## 🔒 Security Checklist

Before going live:

- [ ] Change default test passwords
- [ ] Set strong JWT_SECRET
- [ ] Enable HTTPS only
- [ ] Review CORS settings
- [ ] Set up rate limiting
- [ ] Enable database backups
- [ ] Set up monitoring

---

## 📊 Monitoring

### Render Dashboard
- View logs: Service → Logs
- Monitor metrics: Service → Metrics
- Check health: Service → Events

### Database Monitoring
- Connection count
- Query performance
- Storage usage

---

## 🐛 Troubleshooting

### Service Won't Start
1. Check logs in Render dashboard
2. Verify all environment variables are set
3. Ensure database is running
4. Check build command succeeded

### Database Connection Failed
1. Verify database is running
2. Check connection string
3. Ensure database is initialized
4. Check firewall rules

### 502 Bad Gateway
1. Service might be starting (wait 2-3 minutes)
2. Check if port 3001 is correct
3. Verify start command is correct

### Database Not Initialized
```bash
# Connect to database via Render shell
# Go to Database → Connect → PSQL Command
# Copy and run the command, then:

\i backend/database/schema.sql
\i backend/database/seed.sql
```

---

## 💰 Cost Breakdown

### Free Tier (Perfect for Testing)
- **PostgreSQL**: Free (1GB storage, 1GB RAM)
- **Web Service**: Free (512MB RAM, auto-sleep after 15min inactivity)
- **Bandwidth**: 100GB/month free
- **Build Minutes**: 500 minutes/month free

### Paid Tier (For Production)
- **PostgreSQL**: $7/month (10GB storage, 1GB RAM)
- **Web Service**: $7/month (512MB RAM, no sleep)
- **Total**: ~$14/month

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [x] Code pushed to GitHub
- [x] render.yaml created
- [x] Database initialization script ready
- [x] Environment variables documented
- [ ] Test accounts ready
- [ ] Documentation updated

### Deployment
- [ ] Create Render account
- [ ] Connect GitHub repository
- [ ] Deploy with Blueprint (render.yaml)
- [ ] Initialize database
- [ ] Verify API health
- [ ] Test all endpoints
- [ ] Update frontend URLs

### Post-Deployment
- [ ] Test all features
- [ ] Change default passwords
- [ ] Set up monitoring
- [ ] Configure custom domain (optional)
- [ ] Enable auto-deploy
- [ ] Set up backups

---

## 🌐 Custom Domain (Optional)

1. **In Render Dashboard**
   - Go to your web service
   - Click "Settings" → "Custom Domain"
   - Add your domain

2. **Update DNS**
   - Add CNAME record pointing to Render
   - Wait for DNS propagation (5-30 minutes)

3. **Enable HTTPS**
   - Render automatically provisions SSL certificate
   - Force HTTPS in your app

---

## 📈 Scaling

### When to Upgrade

**Free Tier Limits:**
- Service sleeps after 15 minutes of inactivity
- 512MB RAM
- Shared CPU

**Upgrade When:**
- Need 24/7 availability
- More than 100 concurrent users
- Database > 1GB
- Need faster response times

### Upgrade Path
1. Free → Starter ($7/month)
2. Starter → Standard ($25/month)
3. Standard → Pro ($85/month)

---

## 🎯 Next Steps After Deployment

1. **Test Everything**
   - All API endpoints
   - Authentication flow
   - Product browsing
   - Order creation
   - Review system

2. **Monitor Performance**
   - Response times
   - Error rates
   - Database queries
   - Memory usage

3. **Optimize**
   - Add caching
   - Optimize queries
   - Compress responses
   - Add CDN for static files

4. **Market Your App**
   - Share the URL
   - Get user feedback
   - Iterate and improve

---

## 📞 Support

### Render Support
- Documentation: https://render.com/docs
- Community: https://community.render.com
- Status: https://status.render.com

### Your Application
- GitHub: https://github.com/Byiringiro215/fabrice-shop-front
- Documentation: See README.md
- Issues: GitHub Issues

---

## 🎉 Success!

Once deployed, your application will be live at:
- **API**: `https://fabrice-ecommerce-api.onrender.com`
- **Frontend**: `https://fabrice-ecommerce-api.onrender.com/backend/login.html`

**Congratulations on deploying your e-commerce platform! 🚀**

---

*Deployment Guide Version 1.0*
*Last Updated: March 9, 2026*
