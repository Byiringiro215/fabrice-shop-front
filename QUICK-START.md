# Quick Start Guide

## 🚀 Starting the Server

The server is now running from the project root to access all files.

### Current Status
✅ Server is running on: **http://localhost:8000**

### Access Points

#### Integrated Pages (Backend API)
- **Home:** http://localhost:8000/backend/index.html
- **Login:** http://localhost:8000/backend/login.html
- **Register:** http://localhost:8000/backend/register.html
- **Test Auth:** http://localhost:8000/backend/test-auth.html

#### Dashboards (Role-Based)
- **Customer:** http://localhost:8000/backend/customer-dashboard.html
- **Seller:** http://localhost:8000/backend/seller-dashboard.html
- **Admin:** http://localhost:8000/backend/admin-dashboard.html

#### API Endpoints
- **Login:** POST http://localhost:8000/backend/api/auth/login.php
- **Register:** POST http://localhost:8000/backend/api/auth/register.php
- **Products:** GET http://localhost:8000/backend/api/products/index.php
- **Cart:** POST http://localhost:8000/backend/api/cart/index.php
- **Orders:** GET/POST http://localhost:8000/backend/api/orders/index.php

## 🔑 Test Credentials

### Customer Account
- Email: `customer@test.com`
- Password: `customer123`
- Role: Customer

### Seller Account
- Email: `seller@test.com`
- Password: `seller123`
- Role: Seller

### Admin Account
- Email: `admin@test.com`
- Password: `admin123`
- Role: Admin

## 📋 How to Use

1. **Login:**
   - Go to: http://localhost:8000/backend/login.html
   - Select your role (Customer/Seller/Admin)
   - Enter credentials
   - Click Login

2. **After Login:**
   - You'll be redirected to your role-specific dashboard
   - Dashboard shows real data from PostgreSQL database
   - Navigate using sidebar links

3. **Security:**
   - You MUST select the correct role that matches your account
   - Trying to login with wrong role will fail
   - Each dashboard verifies your role before allowing access

## 🔄 Server Management

### To Restart Server:
```bash
# Stop current server (Ctrl+C in terminal)
# Then run:
php -S localhost:8000 -t .
```

### Or use the batch file:
```bash
start-server.bat
```

## 📁 File Structure

```
project-root/
├── backend/
│   ├── api/              # API endpoints
│   ├── login.html        # ✅ Integrated login
│   ├── register.html     # ✅ Integrated register
│   ├── *-dashboard.html  # ✅ Role-based dashboards
│   └── styles.css        # Shared styles
├── plain-html-version/
│   ├── pages/            # Other pages (not yet integrated)
│   ├── css/
│   └── js/
└── start-server.bat      # Server startup script
```

## ✅ What's Working

- ✅ Authentication (Login/Register) with backend API
- ✅ Role-based access control
- ✅ Customer/Seller/Admin dashboards
- ✅ PostgreSQL database integration
- ✅ Password hashing (bcrypt)
- ✅ Session management
- ✅ CORS configuration

## ⚠️ Known Limitations

- Other pages (products, cart, orders) still use localStorage
- Need to integrate them with backend API next

## 🎯 Next Steps

1. Integrate Products page with backend API
2. Integrate Cart functionality
3. Integrate Orders management
4. Add more features as needed

## 🐛 Troubleshooting

### "Connection error" on login
- Make sure server is running: `php -S localhost:8000 -t .`
- Check PostgreSQL is running
- Verify database credentials in `backend/config/database.php`

### "404 Not Found"
- Make sure you're accessing through http://localhost:8000
- Don't open HTML files directly (file://)
- Server must be running from project root

### "Access denied" on dashboard
- Make sure you logged in with correct role
- Clear localStorage and login again
- Check browser console for errors

## 📞 Support

If you encounter issues:
1. Check the browser console (F12)
2. Check the PHP server terminal for errors
3. Verify PostgreSQL is running
4. Check database connection in `backend/config/database.php`
