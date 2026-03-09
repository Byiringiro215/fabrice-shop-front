# Node.js/Express Backend Guide

## Overview
The backend has been successfully migrated from PHP to Node.js/Express for easier deployment and better performance.

## Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file in the root directory with:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fabrice-ecommerce
DB_USER=postgres
DB_PASSWORD=postgres
PORT=3001
NODE_ENV=development
JWT_SECRET=your-secret-key-here
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run server:dev
```

### Production Mode
```bash
npm run server
```

The server will start on `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (seller only)
- `PUT /api/products/:id` - Update product (seller only)
- `DELETE /api/products/:id` - Delete product (seller only)

### Orders
- `GET /api/orders?user_id=X` - Get user orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status (admin only)

### Reviews
- `GET /api/reviews?user_id=X` - Get user reviews
- `GET /api/reviews?product_id=X` - Get product reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

## Frontend Integration

All frontend files have been updated to use the new API endpoints:
- API Base URL: `http://localhost:3001/api`
- All `.php` extensions removed from endpoints
- Authentication flow remains the same

## Testing

1. Start the server:
```bash
npm run server
```

2. Open your browser and navigate to:
- Backend Portal: `http://localhost:3001/backend/login.html`
- Plain HTML Version: `http://localhost:3001/plain-html-version/pages/login.html`

3. Test credentials:
- Customer: `customer@test.com` / `customer123`
- Seller: `seller@test.com` / `seller123`
- Admin: `admin@test.com` / `admin123`

## Database Schema

The PostgreSQL database includes:
- `users` - User accounts with roles (customer, seller, admin)
- `products` - Product catalog
- `orders` - Order records with items
- `reviews` - Product reviews

## Features Implemented

✅ User authentication with bcrypt password hashing
✅ Role-based access control (Customer, Seller, Admin)
✅ Product management
✅ Shopping cart functionality
✅ Order processing with shipping details
✅ Product reviews and ratings
✅ User profile management
✅ Dashboard statistics for all roles
✅ CORS enabled for frontend integration

## Deployment

For production deployment:

1. Set `NODE_ENV=production` in `.env`
2. Update database credentials
3. Set a strong `JWT_SECRET`
4. Use a process manager like PM2:
```bash
npm install -g pm2
pm2 start server/index.js --name fabrice-ecommerce
```

## Troubleshooting

### Server won't start
- Check if port 3001 is available
- Verify PostgreSQL is running
- Check database credentials in `.env`

### Database connection errors
- Ensure PostgreSQL service is running
- Verify database `fabrice-ecommerce` exists
- Check user permissions

### API returns 404
- Verify server is running on port 3001
- Check API endpoint URLs in frontend files
- Review server logs for errors

## Migration from PHP

All PHP backend functionality has been preserved:
- Same database schema
- Same API response formats
- Same authentication flow
- Same business logic

The migration provides:
- Better performance
- Easier deployment
- Modern JavaScript ecosystem
- Better error handling
- Cleaner code structure
