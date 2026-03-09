# Backend Integration Guide for Plain HTML Version

## Overview
This guide explains how to integrate the plain HTML version with the PHP/PostgreSQL backend.

## Current Status

### ✅ Already Integrated (Backend Folder)
The `/backend` folder contains fully integrated pages:
- `backend/login.html` - Login with backend API
- `backend/customer-dashboard.html` - Dashboard with real orders
- `backend/customer-products.html` - Products from database
- `backend/customer-cart.html` - Cart with checkout
- `backend/customer-orders.html` - Orders from database
- `backend/customer-profile.html` - Profile management
- `backend/customer-reviews.html` - Reviews CRUD

### 🔄 Needs Integration (Plain HTML Version)
The `/plain-html-version` folder uses hardcoded data and needs backend integration.

## Integration Steps

### 1. Update API Base URL
All pages need to use the backend API:

```javascript
const API_BASE_URL = 'http://localhost:8000/backend/api';
```

### 2. Update Authentication (auth.js)
The `auth.login()` method now accepts a `role` parameter for role-based verification:

```javascript
const result = await auth.login(email, password, selectedRole);
```

### 3. Fetch Real Data from Backend

#### Dashboard - Fetch Orders
```javascript
const response = await fetch(`${API_BASE_URL}/orders/index.php?user_id=${user.id}`);
const data = await response.json();
const orders = data.success && data.data ? data.data : [];
```

#### Products - Fetch from Database
```javascript
const response = await fetch(`${API_BASE_URL}/products/index.php`);
const data = await response.json();
const products = data.success && data.data ? data.data : [];
```

#### Cart - Create Order
```javascript
const response = await fetch(`${API_BASE_URL}/orders/index.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        user_id: currentUser.id,
        items: items,
        total_amount: total,
        status: 'Pending',
        shipping_name: name,
        shipping_phone: phone,
        shipping_address: address,
        payment_method: method
    })
});
```

#### Profile - Update User
```javascript
const response = await fetch(`${API_BASE_URL}/users/index.php`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        id: user.id,
        name: newName,
        phone: newPhone,
        address: newAddress
    })
});
```

#### Reviews - CRUD Operations
```javascript
// GET reviews
const response = await fetch(`${API_BASE_URL}/reviews/index.php?user_id=${user.id}`);

// POST review
const response = await fetch(`${API_BASE_URL}/reviews/index.php`, {
    method: 'POST',
    body: JSON.stringify({ user_id, product_id, rating, comment })
});

// PUT review
const response = await fetch(`${API_BASE_URL}/reviews/index.php`, {
    method: 'PUT',
    body: JSON.stringify({ id, rating, comment })
});

// DELETE review
const response = await fetch(`${API_BASE_URL}/reviews/index.php`, {
    method: 'DELETE',
    body: JSON.stringify({ id })
});
```

## Quick Migration Path

### Option 1: Use Backend Folder (Recommended)
The easiest approach is to use the already-integrated pages in the `/backend` folder:

1. Start server: `php -S localhost:8000 -t .`
2. Navigate to: `http://localhost:8000/backend/login.html`
3. All pages are fully integrated and working

### Option 2: Copy Integration to Plain HTML Version
Copy the integrated logic from backend pages to plain-html-version pages:

1. Copy `backend/customer-dashboard.html` logic to `plain-html-version/pages/customer-dashboard.html`
2. Copy `backend/customer-products.html` logic to `plain-html-version/pages/customer-products.html`
3. Update all API calls to use correct paths
4. Test each page individually

### Option 3: Redirect Plain HTML to Backend
Update `plain-html-version/pages/login.html` to redirect to backend after login:

```javascript
if (result.success) {
    window.location.href = `/backend/${result.user.role}-dashboard.html`;
}
```

## Key Differences

### Data Structure
- **Hardcoded**: `orders` array with `{id, product, date, status, price}`
- **Backend**: `orders` array with `{id, order_number, user_id, total_amount, status, created_at, items (JSON)}`

### Response Format
All backend APIs return:
```json
{
    "success": true/false,
    "data": [...],  // or "user", "order_id", etc.
    "message": "..."
}
```

### Authentication
- Backend uses PostgreSQL database for user verification
- Passwords are bcrypt hashed
- Role-based access control enforced
- Session data stored in localStorage

## Testing

### Test Credentials
- Customer: customer@test.com / customer123
- Seller: seller@test.com / seller123
- Admin: admin@test.com / admin123

### Test Flow
1. Login → Dashboard (shows real orders)
2. Products → Add to Cart (localStorage)
3. Cart → Checkout (creates order in DB)
4. Orders → View order history (from DB)
5. Profile → Update info (saves to DB)
6. Reviews → Add/Edit/Delete (CRUD in DB)

## Recommendation

**Use the `/backend` folder for production** as it's fully integrated, tested, and production-ready. The plain HTML version can serve as a reference or be gradually migrated using the patterns from the backend folder.

All backend pages include:
- Loading states
- Empty states
- Error handling
- Toast notifications
- Role-based access control
- Real-time data from PostgreSQL
