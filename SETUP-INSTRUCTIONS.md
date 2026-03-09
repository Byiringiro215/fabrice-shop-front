# Fabrice E-Commerce Platform - Setup Instructions

## 📦 What's Included

This is a complete full-stack e-commerce platform with:
- ✅ Node.js/Express backend API
- ✅ PostgreSQL database (using Neon cloud)
- ✅ Plain HTML/CSS/JS frontend
- ✅ React frontend (optional)
- ✅ Authentication & role-based access
- ✅ Complete API testing suite
- ✅ Deployment configuration for Render

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
The `.env` file is already configured with Neon PostgreSQL cloud database.
No local database setup needed!

### 3. Start the Server
```bash
npm run server
```

### 4. Access the Application
- **Plain HTML Version**: http://localhost:3001/plain-html-version/pages/login.html
- **API Health Check**: http://localhost:3001/api/health
- **API Testing Interface**: http://localhost:3001/test-api.html

## 👤 Test Accounts

```
Customer Account:
Email: customer@test.com
Password: customer123

Seller Account:
Email: seller@test.com
Password: seller123

Admin Account:
Email: admin@test.com
Password: admin123
```

## 🧪 Run Tests

```bash
npm run test:api
```

## 📚 Available Scripts

- `npm run server` - Start the backend server
- `npm run server:dev` - Start with auto-reload (requires nodemon)
- `npm run test:api` - Run API endpoint tests
- `npm run dev` - Start React development server
- `npm run build` - Build React app for production

## 🌐 Deployment

The project is already deployed on Render:
- **API**: https://fabrice-ecommerce-api.onrender.com
- **Database**: Neon PostgreSQL (cloud)

To deploy your own instance, see `DEPLOYMENT-SUCCESS-FINAL.md`

## 📖 Documentation

- `API-TESTING-COMPLETE.md` - API testing guide
- `TESTING-GUIDE.md` - Comprehensive testing documentation
- `NEON-MIGRATION-SUCCESS.md` - Database setup details
- `DEPLOYMENT-SUCCESS-FINAL.md` - Deployment guide
- `NODE-BACKEND-GUIDE.md` - Backend API documentation

## 🔧 Project Structure

```
├── server/              # Node.js/Express backend
│   ├── config/         # Database configuration
│   ├── models/         # Database models
│   └── routes/         # API routes
├── plain-html-version/ # Plain HTML frontend
│   ├── pages/         # HTML pages
│   ├── js/            # JavaScript files
│   └── css/           # Stylesheets
├── src/               # React frontend (optional)
├── scripts/           # Utility scripts
└── test-api-endpoints.js # API testing script
```

## 💡 Features

- User authentication (login/register)
- Role-based access control (Customer, Seller, Admin)
- Product browsing and management
- Shopping cart functionality
- Order management
- Product reviews
- User profiles
- Admin dashboard

## 🆘 Troubleshooting

### Server won't start
- Make sure port 3001 is available
- Check `.env` file exists
- Run `npm install` first

### Database connection issues
- The project uses Neon cloud database (no local setup needed)
- Check internet connection
- Verify `.env` credentials

### Tests failing
- Make sure server is running: `npm run server`
- Check database is accessible
- Review test output for specific errors

## 📞 Support

For issues or questions:
1. Check the documentation files
2. Review the test output
3. Check server logs
4. Verify environment variables

---

**Built with**: Node.js, Express, PostgreSQL, HTML/CSS/JS, React
**Database**: Neon PostgreSQL (Cloud)
**Deployment**: Render
**Status**: Production Ready ✅
