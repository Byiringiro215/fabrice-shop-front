# Fabrice-E-Shopping - Plain HTML Version

This is a plain HTML, CSS, and JavaScript implementation of the Fabrice-E-Shopping e-commerce platform.

## Features

### Authentication System
- User registration with role selection (Customer, Seller, Admin)
- Login/Logout functionality
- Session management using localStorage
- Role-based access control

### Customer Portal
- Browse and search products
- Add products to cart
- View cart and manage items
- Place orders
- View order history
- Write product reviews
- Profile management

### Seller Portal
- Dashboard with sales analytics
- Manage products (view, add, edit, delete)
- View sales history
- Profile and store management

### Admin Portal
- User management dashboard
- System analytics
- User activity monitoring
- Platform overview

## File Structure

```
plain-html-version/
├── index.html              # Homepage
├── css/
│   └── styles.css         # All styles
├── js/
│   ├── auth.js           # Authentication & cart management
│   ├── data.js           # Sample product data
│   └── main.js           # Utility functions
├── pages/
│   ├── login.html
│   ├── register.html
│   ├── products.html
│   ├── customer-dashboard.html
│   ├── customer-products.html
│   ├── seller-dashboard.html
│   ├── admin-dashboard.html
│   └── ... (other pages)
└── images/               # Product images (placeholder)
```

## How to Run

1. Open `index.html` in a web browser
2. No build process or server required
3. All data is stored in browser's localStorage

## Default Test Accounts

The system comes pre-seeded with test accounts for each role:

| Role | Email | Password |
|------|-------|----------|
| **Customer** | customer@test.com | customer123 |
| **Seller** | seller@test.com | seller123 |
| **Admin** | admin@test.com | admin123 |

You can also register new accounts with any role you choose.

## Key Technologies

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables
- **Vanilla JavaScript**: No frameworks or libraries
- **localStorage**: Client-side data persistence

## Features Implemented

✅ User authentication (register/login/logout)
✅ Role-based dashboards (Customer, Seller, Admin)
✅ Product browsing and search
✅ Shopping cart functionality
✅ Responsive design
✅ Toast notifications
✅ Form validation
✅ Session management

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Notes

- This is a client-side only application
- Data persists in browser localStorage
- No backend server required
- Images use placeholder URLs from Unsplash
- For production, you would need a proper backend API

## Future Enhancements

- Add more pages (orders, reviews, settings, profile)
- Implement product detail pages
- Add checkout flow
- Enhance mobile responsiveness
- Add more interactive features
- Implement proper image handling
