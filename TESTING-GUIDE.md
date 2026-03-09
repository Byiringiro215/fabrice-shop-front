# API Testing Guide

This guide explains how to test all API endpoints of the Fabrice E-Commerce backend.

## Testing Tools

We provide two ways to test the API:

### 1. Command Line Test Script (Recommended)
A comprehensive Node.js script that tests all endpoints automatically.

### 2. Browser-Based Test Interface
An interactive HTML page for manual testing with visual feedback.

---

## Method 1: Command Line Testing

### Prerequisites
- Node.js installed
- Server running on `http://localhost:3001`

### Running the Tests

1. **Start the server** (in one terminal):
```bash
npm run server
```

2. **Run the test script** (in another terminal):
```bash
npm run test:api
```

### What It Tests

The script automatically tests:

✅ **Health Check**
- Server availability

✅ **Authentication**
- User registration
- User login
- Password verification
- Role verification
- Duplicate registration prevention

✅ **Products**
- Get all products
- Get single product
- Create product
- Update product
- Delete product
- Handle non-existent products

✅ **Orders**
- Create order
- Get user orders
- Get single order
- Update order status
- Validate required fields

✅ **Reviews**
- Create review
- Get user reviews
- Get product reviews
- Update review
- Delete review
- Validate parameters

✅ **Users**
- Get user profile
- Update user profile
- Update password
- Get all users (admin)
- Handle non-existent users

### Test Output

The script provides colored output:
- ✅ **Green** = Test passed
- ❌ **Red** = Test failed
- 📊 **Summary** = Total, passed, failed counts

Example output:
```
╔════════════════════════════════════════════════════════════╗
║        Fabrice E-Commerce API Endpoint Tests              ║
╚════════════════════════════════════════════════════════════╝

============================================================
1. HEALTH CHECK
============================================================

✓ Server health check
  Status: 200, Message: Server is running

============================================================
2. AUTHENTICATION ENDPOINTS
============================================================

✓ Register new user
  User ID: 5, Email: test1234567890@example.com
✓ Prevent duplicate registration
  Message: Email already registered
✓ Login with correct credentials
  User: Test Customer, Role: customer
...

============================================================
TEST SUMMARY
============================================================

Total Tests: 28
Passed: 28
Failed: 0

Success Rate: 100.00%

✓ All tests passed! 🎉
```

---

## Method 2: Browser-Based Testing

### Access the Test Interface

1. **Start the server**:
```bash
npm run server
```

2. **Open the test page** in your browser:
```
http://localhost:3001/test-api.html
```

### Using the Interface

The interface provides:

1. **Statistics Dashboard**
   - Total tests run
   - Passed tests (green)
   - Failed tests (red)

2. **Test Cards**
   - Each API category has its own card
   - Shows available endpoints
   - Click button to test that category

3. **Test Buttons**
   - Individual test buttons for each category
   - "Run All Tests" button to test everything
   - "Clear Results" button to reset

4. **Results Panel**
   - Real-time test results
   - ✓ Green = Success
   - ✗ Red = Failure
   - Detailed information for each test

### Test Categories

**Health Check**
- Tests server availability

**Authentication**
- Login test
- Wrong password rejection

**Products**
- Get all products
- Get single product

**Orders**
- Get user orders
- Create new order

**Reviews**
- Get user reviews

**Users**
- Get user profile

---

## Test Data

### Pre-seeded Test Users

The database includes these test accounts:

```javascript
// Customer Account
{
  email: 'customer@test.com',
  password: 'customer123',
  role: 'customer'
}

// Seller Account
{
  email: 'seller@test.com',
  password: 'seller123',
  role: 'seller'
}

// Admin Account
{
  email: 'admin@test.com',
  password: 'admin123',
  role: 'admin'
}
```

### Test Products

The database includes sample products in various categories:
- Electronics
- Clothing
- Books
- Home & Garden

---

## Troubleshooting

### Server Not Running
**Error**: Connection refused or fetch failed

**Solution**:
```bash
# Check if server is running
npm run server

# Verify server is on port 3001
curl http://localhost:3001/api/health
```

### Database Connection Error
**Error**: Database connection failed

**Solution**:
1. Check PostgreSQL is running
2. Verify database exists: `fabrice-ecommerce`
3. Check `.env` file has correct credentials
4. Test connection:
```bash
psql -U postgres -d fabrice-ecommerce -c "SELECT 1;"
```

### Tests Failing
**Error**: Some tests fail

**Solution**:
1. Check server logs for errors
2. Verify database has seed data
3. Ensure no port conflicts
4. Clear test data and re-seed database

### CORS Errors (Browser Tests)
**Error**: CORS policy blocked

**Solution**:
- Server already has CORS enabled
- If still blocked, check browser console
- Try different browser
- Verify server is running on correct port

---

## Advanced Testing

### Custom Test Scenarios

You can modify `test-api-endpoints.js` to add custom tests:

```javascript
// Add after existing tests
async function testCustomScenario() {
  printSection('CUSTOM TEST');
  
  // Your test code here
  const result = await makeRequest('/your-endpoint');
  assert(
    result.status === 200,
    'Your test name',
    'Test details'
  );
}

// Add to runTests()
await testCustomScenario();
```

### Testing with Different Data

Modify the test data in the script:

```javascript
const newUser = {
  name: 'Your Test User',
  email: 'your-email@test.com',
  password: 'your-password',
  role: 'customer'
};
```

### Performance Testing

Add timing to tests:

```javascript
const startTime = Date.now();
const result = await makeRequest('/products');
const duration = Date.now() - startTime;
console.log(`Request took ${duration}ms`);
```

---

## Continuous Integration

### GitHub Actions Example

```yaml
name: API Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: fabrice-ecommerce
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Setup database
        run: psql -U postgres -d fabrice-ecommerce -f backend/database/schema.sql
      
      - name: Start server
        run: npm run server &
        
      - name: Wait for server
        run: sleep 5
      
      - name: Run API tests
        run: npm run test:api
```

---

## Best Practices

1. **Always test after changes**
   - Run tests after modifying API endpoints
   - Verify all tests pass before committing

2. **Test in isolation**
   - Each test should be independent
   - Don't rely on test execution order

3. **Use meaningful test data**
   - Use realistic data in tests
   - Test edge cases and error conditions

4. **Monitor test performance**
   - Track test execution time
   - Optimize slow tests

5. **Keep tests updated**
   - Update tests when API changes
   - Add tests for new features

---

## Support

If you encounter issues with testing:

1. Check server logs: `npm run server`
2. Verify database connection
3. Review test output for specific errors
4. Check `NODE-BACKEND-GUIDE.md` for setup help

---

**Happy Testing! 🧪**
