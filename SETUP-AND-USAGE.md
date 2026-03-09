# E-Commerce Platform - Setup and Usage Guide

## Quick Start

### 1. Start the PHP Server
```bash
php -S localhost:8000 -t .
```

### 2. Access the Application
Open your browser and navigate to:
```
http://localhost:8000/backend/login.html
```

### 3. Login with Test Credentials
- **Customer**: customer@test.com / customer123
- **Seller**: seller@test.com / seller123
- **Admin**: admin@test.com / admin123

## System Requirements

- PHP 7.4+ with PostgreSQL extensions (pdo_pgsql, pgsql)
- PostgreSQL 12+
- Modern web browser

## Database Setup

The database `fabrice-ecommerce` should already be configured with:
- All tables created (users, products, orders, order_items, reviews, cart)
- Seed data loaded (test users and products)
- Proper constraints and relationships

If you need to reset the database:
```bash
psql -U postgres -d fabrice-ecommerce -f backend/database/schema.sql
psql -U postgres -d fabrice-ecommerce -f backend/database/seed.sql
psql -U postgres -d fabrice-ecommerce -f backend/database/reviews-schema.sql
```

## Application Structure

```
project-root/
├── backend/                    # Fully integrated version (USE THIS)
│   ├── api/                   # REST API endpoints
│   │   ├── auth/             # Login, Register
│   │   ├── products/         # Product CRUD
│   │   ├── cart/             # Cart management
│   │   ├── orders/           # Order management
│   │   ├── reviews/          # Review CRUD
│   │   └── users/            # User profile
│   ├── config/               # Database configuration
│   ├── models/               # PHP models (User, Product, Order, etc.)
│   ├── database/             # SQL schemas and seeds
│   ├── login.html            # Login page
│   ├── customer-dashboard.html
│   ├── customer-products.html
│   ├── customer-cart.html
│   ├── customer-orders.html
│   ├── customer-profile.html
│   └── customer-reviews.html
│
├── plain-html-version/        # Original version (redirects to backend)
│   ├── pages/                # HTML pages
│   ├── css/                  # Styles
│   └── js/                   # JavaScript (auth, data)
│
└── src/                       # React version (separate)
```

## Features by Role

### Customer Portal
1. **Dashboard**
   - View order statistics
   - See recent orders
   - Quick access to all features

2. **Browse Products**
   - Search products
   - Filter by category
   - Sort by price/rating
   - Add to cart

3. **Shopping Cart**
   - View cart items
   - Update quantities
   - Remove items
   - Proceed to checkout

4. **Checkout**
   - Enter shipping information
   - Select payment method
   - Place order
   - Order saved to database

5. **My Orders**
   - View order history
   - Track order status
   - See order details

6. **My Reviews**
   - View all reviews
   - Add new reviews (5-star rating)
   - Edit existing reviews
   - Delete reviews

7. **Profile**
   - Update personal information
   - Change password
   - Manage account settings

### Seller Portal (Coming Soon)
- Manage products
- View sales analytics
- Process orders

### Admin Portal (Coming Soon)
- Manage all users
- Manage all products
- View all orders
- System settings

## API Endpoints

All API endpoints return JSON in this format:
```json
{
    "success": true/false,
    "data": {...},
    "message": "..."
}
```

### Authentication
- `POST /backend/api/auth/login.php` - Login
- `POST /backend/api/auth/register.php` - Register

### Products
- `GET /backend/api/products/index.php` - Get all products
- `GET /backend/api/products/index.php?id=X` - Get single product
- `POST /backend/api/products/index.php` - Create product
- `PUT /backend/api/products/index.php` - Update product
- `DELETE /backend/api/products/index.php` - Delete product

### Orders
- `GET /backend/api/orders/index.php?user_id=X` - Get user orders
- `POST /backend/api/orders/index.php` - Create order

### Reviews
- `GET /backend/api/reviews/index.php?user_id=X` - Get user reviews
- `POST /backend/api/reviews/index.php` - Create review
- `PUT /backend/api/reviews/index.php` - Update review
- `DELETE /backend/api/reviews/index.php` - Delete review

### Users
- `GET /backend/api/users/index.php?id=X` - Get user profile
- `PUT /backend/api/users/index.php` - Update profile

## Testing

### Manual Testing
1. Login as customer
2. Browse products
3. Add items to cart
4. Checkout with shipping info
5. Verify order appears in "My Orders"
6. Add a review for a product
7. Edit/delete the review
8. Update profile information

### Automated Testing
Run the test suite:
```
http://localhost:8000/backend/test-all-endpoints.php
```

Or test checkout flow:
```
http://localhost:8000/backend/test-checkout-flow.html
```

## Troubleshooting

### Database Connection Issues
Check `backend/config/database.php`:
```php
$host = "localhost";
$db_name = "fabrice-ecommerce";
$username = "postgres";
$password = "postgres";
$port = "5432";
```

### PHP Extensions Not Loaded
Edit `php.ini` and uncomment:
```ini
extension=pdo_pgsql
extension=pgsql
```

### CORS Issues
CORS is configured in `backend/config/cors.php` to allow all origins during development.

### Port Already in Use
If port 8000 is busy, use a different port:
```bash
php -S localhost:8080 -t .
```
Then update API_BASE_URL in JavaScript files.

## Security Notes

### Development vs Production
Current setup is for development. For production:
1. Use environment variables for database credentials
2. Implement proper CORS restrictions
3. Add rate limiting
4. Use HTTPS
5. Implement CSRF protection
6. Add input sanitization
7. Use prepared statements (already implemented)

### Password Security
- Passwords are hashed using bcrypt
- Never stored in plain text
- Minimum 6 characters required

### Role-Based Access
- Each page verifies user role
- API endpoints check permissions
- Unauthorized access redirects to login

## Development

### Adding New Features
1. Create API endpoint in `backend/api/`
2. Create/update model in `backend/models/`
3. Update frontend page to call API
4. Test thoroughly
5. Update documentation

### Database Changes
1. Update schema in `backend/database/schema.sql`
2. Create migration script if needed
3. Update seed data if needed
4. Update models to reflect changes

## Support

For issues or questions:
1. Check `INTEGRATION-STATUS.md` for feature status
2. Review `backend/CHECKOUT-INTEGRATION-STATUS.md` for checkout details
3. See `plain-html-version/BACKEND-INTEGRATION-GUIDE.md` for integration patterns

## License

This project is for educational purposes.
