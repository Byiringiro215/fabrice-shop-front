#!/usr/bin/env node

/**
 * API Endpoint Testing Script
 * Tests all endpoints of the Fabrice E-Commerce API
 */

// Check Node.js version and import fetch if needed
const nodeVersion = parseInt(process.version.slice(1).split('.')[0]);
if (nodeVersion < 18) {
  console.error('This script requires Node.js 18 or higher for native fetch support.');
  console.error('Please upgrade Node.js or install node-fetch package.');
  process.exit(1);
}

const API_BASE_URL = 'http://localhost:3001/api';

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

// Test results tracking
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

// Store test data
const testData = {
  users: {},
  products: [],
  orders: [],
  reviews: []
};

/**
 * Helper function to make HTTP requests
 */
async function makeRequest(endpoint, method = 'GET', body = null) {
  const url = `${API_BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    return { status: 0, error: error.message };
  }
}

/**
 * Test assertion helper
 */
function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`${colors.green}✓${colors.reset} ${testName}`);
    if (details) console.log(`  ${colors.cyan}${details}${colors.reset}`);
  } else {
    failedTests++;
    console.log(`${colors.red}✗${colors.reset} ${testName}`);
    if (details) console.log(`  ${colors.red}${details}${colors.reset}`);
  }
}

/**
 * Print section header
 */
function printSection(title) {
  console.log(`\n${colors.bold}${colors.blue}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}${title}${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}${'='.repeat(60)}${colors.reset}\n`);
}

/**
 * Test Health Check
 */
async function testHealthCheck() {
  printSection('1. HEALTH CHECK');
  
  const result = await makeRequest('/health');
  assert(
    result.status === 200 && result.data.success,
    'Server health check',
    `Status: ${result.status}, Message: ${result.data.message}`
  );
}

/**
 * Test Authentication Endpoints
 */
async function testAuthentication() {
  printSection('2. AUTHENTICATION ENDPOINTS');

  // Test user registration
  const newUser = {
    name: 'Test Customer',
    email: `test${Date.now()}@example.com`,
    password: 'testpass123',
    role: 'customer'
  };

  const registerResult = await makeRequest('/auth/register', 'POST', newUser);
  assert(
    registerResult.status === 201 && registerResult.data.success,
    'Register new user',
    `User ID: ${registerResult.data.user?.id}, Email: ${newUser.email}`
  );

  if (registerResult.data.user) {
    testData.users.newUser = registerResult.data.user;
  }

  // Test duplicate registration
  const duplicateResult = await makeRequest('/auth/register', 'POST', newUser);
  assert(
    duplicateResult.status === 400 && !duplicateResult.data.success,
    'Prevent duplicate registration',
    `Message: ${duplicateResult.data.message}`
  );

  // Test login with correct credentials
  const loginResult = await makeRequest('/auth/login', 'POST', {
    email: 'customer@test.com',
    password: 'customer123'
  });
  assert(
    loginResult.status === 200 && loginResult.data.success,
    'Login with correct credentials',
    `User: ${loginResult.data.user?.name}, Role: ${loginResult.data.user?.role}`
  );

  if (loginResult.data.user) {
    testData.users.customer = loginResult.data.user;
  }

  // Test login with wrong password
  const wrongPasswordResult = await makeRequest('/auth/login', 'POST', {
    email: 'customer@test.com',
    password: 'wrongpassword'
  });
  assert(
    wrongPasswordResult.status === 401 && !wrongPasswordResult.data.success,
    'Reject wrong password',
    `Message: ${wrongPasswordResult.data.message}`
  );

  // Test login with role verification
  const roleCheckResult = await makeRequest('/auth/login', 'POST', {
    email: 'customer@test.com',
    password: 'customer123',
    role: 'seller'
  });
  assert(
    roleCheckResult.status === 401 && !roleCheckResult.data.success,
    'Reject wrong role',
    `Message: ${roleCheckResult.data.message}`
  );

  // Login as seller
  const sellerLogin = await makeRequest('/auth/login', 'POST', {
    email: 'seller@test.com',
    password: 'seller123'
  });
  if (sellerLogin.data.user) {
    testData.users.seller = sellerLogin.data.user;
  }

  // Login as admin
  const adminLogin = await makeRequest('/auth/login', 'POST', {
    email: 'admin@test.com',
    password: 'admin123'
  });
  if (adminLogin.data.user) {
    testData.users.admin = adminLogin.data.user;
  }
}

/**
 * Test Product Endpoints
 */
async function testProducts() {
  printSection('3. PRODUCT ENDPOINTS');

  // Get all products
  const allProductsResult = await makeRequest('/products');
  assert(
    allProductsResult.status === 200 && allProductsResult.data.success,
    'Get all products',
    `Found ${allProductsResult.data.data?.length || 0} products`
  );

  if (allProductsResult.data.data && allProductsResult.data.data.length > 0) {
    testData.products = allProductsResult.data.data;
    const firstProduct = testData.products[0];

    // Get single product
    const singleProductResult = await makeRequest(`/products/${firstProduct.id}`);
    assert(
      singleProductResult.status === 200 && singleProductResult.data.success,
      'Get single product by ID',
      `Product: ${singleProductResult.data.data?.name}`
    );

    // Get non-existent product
    const notFoundResult = await makeRequest('/products/99999');
    assert(
      notFoundResult.status === 404 && !notFoundResult.data.success,
      'Handle non-existent product',
      `Message: ${notFoundResult.data.message}`
    );
  }

  // Create new product
  const newProduct = {
    name: 'Test Product',
    description: 'This is a test product',
    price: 29.99,
    category: 'Electronics',
    stock: 100,
    image_url: 'https://via.placeholder.com/400',
    seller_id: testData.users.seller?.id || 2
  };

  const createProductResult = await makeRequest('/products', 'POST', newProduct);
  assert(
    createProductResult.status === 201 && createProductResult.data.success,
    'Create new product',
    `Product ID: ${createProductResult.data.data?.id}, Name: ${newProduct.name}`
  );

  if (createProductResult.data.data) {
    const createdProduct = createProductResult.data.data;

    // Update product
    const updateData = {
      name: 'Updated Test Product',
      price: 39.99
    };
    const updateResult = await makeRequest(`/products/${createdProduct.id}`, 'PUT', updateData);
    assert(
      updateResult.status === 200 && updateResult.data.success,
      'Update product',
      `New name: ${updateResult.data.data?.name}, New price: $${updateResult.data.data?.price}`
    );

    // Delete product
    const deleteResult = await makeRequest(`/products/${createdProduct.id}`, 'DELETE');
    assert(
      deleteResult.status === 200 && deleteResult.data.success,
      'Delete product',
      `Message: ${deleteResult.data.message}`
    );
  }
}

/**
 * Test Order Endpoints
 */
async function testOrders() {
  printSection('4. ORDER ENDPOINTS');

  const customerId = testData.users.customer?.id || 1;

  // Create new order
  const newOrder = {
    user_id: customerId,
    items: [
      {
        product_id: testData.products[0]?.id || 1,
        product_name: testData.products[0]?.name || 'Test Product',
        product_price: parseFloat(testData.products[0]?.price || 29.99),
        quantity: 2,
        subtotal: parseFloat(testData.products[0]?.price || 29.99) * 2
      }
    ],
    total_amount: (parseFloat(testData.products[0]?.price || 29.99) * 2) + 5.00,
    status: 'Pending',
    shipping_address: '123 Test Street, Test City',
    shipping_name: 'Test Customer',
    shipping_phone: '+250788123456',
    payment_method: 'cash'
  };

  const createOrderResult = await makeRequest('/orders', 'POST', newOrder);
  assert(
    createOrderResult.status === 201 && createOrderResult.data.success,
    'Create new order',
    `Order ID: ${createOrderResult.data.order_id}, Total: $${newOrder.total_amount.toFixed(2)}`
  );

  // Get user orders
  const ordersResult = await makeRequest(`/orders?user_id=${customerId}`);
  assert(
    ordersResult.status === 200 && ordersResult.data.success,
    'Get user orders',
    `Found ${ordersResult.data.data?.length || 0} orders`
  );

  if (ordersResult.data.data && ordersResult.data.data.length > 0) {
    testData.orders = ordersResult.data.data;
    const firstOrder = testData.orders[0];

    // Get single order
    const singleOrderResult = await makeRequest(`/orders/${firstOrder.id}`);
    assert(
      singleOrderResult.status === 200 && singleOrderResult.data.success,
      'Get single order by ID',
      `Order #${firstOrder.id}, Status: ${singleOrderResult.data.data?.status}`
    );

    // Update order status
    const updateStatusResult = await makeRequest(`/orders/${firstOrder.id}/status`, 'PUT', {
      status: 'Processing'
    });
    assert(
      updateStatusResult.status === 200 && updateStatusResult.data.success,
      'Update order status',
      `New status: ${updateStatusResult.data.data?.status}`
    );
  }

  // Test missing user_id
  const missingUserResult = await makeRequest('/orders');
  assert(
    missingUserResult.status === 400 && !missingUserResult.data.success,
    'Reject orders request without user_id',
    `Message: ${missingUserResult.data.message}`
  );
}

/**
 * Test Review Endpoints
 */
async function testReviews() {
  printSection('5. REVIEW ENDPOINTS');

  const customerId = testData.users.customer?.id || 1;
  const productId = testData.products[0]?.id || 1;

  // Create new review
  const newReview = {
    user_id: customerId,
    product_id: productId,
    rating: 5,
    comment: 'Excellent product! Highly recommended.'
  };

  const createReviewResult = await makeRequest('/reviews', 'POST', newReview);
  assert(
    createReviewResult.status === 201 && createReviewResult.data.success,
    'Create new review',
    `Review ID: ${createReviewResult.data.data?.id}, Rating: ${newReview.rating}/5`
  );

  // Get user reviews
  const userReviewsResult = await makeRequest(`/reviews?user_id=${customerId}`);
  assert(
    userReviewsResult.status === 200 && userReviewsResult.data.success,
    'Get user reviews',
    `Found ${userReviewsResult.data.data?.length || 0} reviews`
  );

  if (userReviewsResult.data.data && userReviewsResult.data.data.length > 0) {
    testData.reviews = userReviewsResult.data.data;
  }

  // Get product reviews
  const productReviewsResult = await makeRequest(`/reviews?product_id=${productId}`);
  assert(
    productReviewsResult.status === 200 && productReviewsResult.data.success,
    'Get product reviews',
    `Found ${productReviewsResult.data.data?.length || 0} reviews for product`
  );

  if (testData.reviews.length > 0) {
    const reviewId = testData.reviews[0].id;

    // Update review
    const updateReviewResult = await makeRequest(`/reviews/${reviewId}`, 'PUT', {
      rating: 4,
      comment: 'Updated review: Very good product!'
    });
    assert(
      updateReviewResult.status === 200 && updateReviewResult.data.success,
      'Update review',
      `New rating: ${updateReviewResult.data.data?.rating}/5`
    );

    // Delete review
    const deleteReviewResult = await makeRequest(`/reviews/${reviewId}`, 'DELETE');
    assert(
      deleteReviewResult.status === 200 && deleteReviewResult.data.success,
      'Delete review',
      `Message: ${deleteReviewResult.data.message}`
    );
  }

  // Test missing parameters
  const missingParamsResult = await makeRequest('/reviews');
  assert(
    missingParamsResult.status === 400 && !missingParamsResult.data.success,
    'Reject reviews request without parameters',
    `Message: ${missingParamsResult.data.message}`
  );
}

/**
 * Test User Endpoints
 */
async function testUsers() {
  printSection('6. USER ENDPOINTS');

  const customerId = testData.users.customer?.id || 1;

  // Get user by ID
  const getUserResult = await makeRequest(`/users/${customerId}`);
  assert(
    getUserResult.status === 200 && getUserResult.data.success,
    'Get user by ID',
    `User: ${getUserResult.data.data?.name}, Email: ${getUserResult.data.data?.email}`
  );

  // Update user profile
  const updateData = {
    name: 'Updated Customer Name',
    phone: '+250788999888',
    address: '456 New Address, Test City'
  };

  const updateUserResult = await makeRequest(`/users/${customerId}`, 'PUT', updateData);
  assert(
    updateUserResult.status === 200 && updateUserResult.data.success,
    'Update user profile',
    `New name: ${updateUserResult.data.data?.name}`
  );

  // Update user password
  const updatePasswordResult = await makeRequest(`/users/${customerId}`, 'PUT', {
    password: 'newpassword123'
  });
  assert(
    updatePasswordResult.status === 200 && updatePasswordResult.data.success,
    'Update user password',
    `Message: ${updatePasswordResult.data.message}`
  );

  // Get non-existent user
  const notFoundResult = await makeRequest('/users/99999');
  assert(
    notFoundResult.status === 404 && !notFoundResult.data.success,
    'Handle non-existent user',
    `Message: ${notFoundResult.data.message}`
  );

  // Get all users (admin endpoint)
  const allUsersResult = await makeRequest('/users');
  assert(
    allUsersResult.status === 200 && allUsersResult.data.success,
    'Get all users (admin)',
    `Found ${allUsersResult.data.data?.length || 0} users`
  );
}

/**
 * Print test summary
 */
function printSummary() {
  console.log(`\n${colors.bold}${colors.blue}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}TEST SUMMARY${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}${'='.repeat(60)}${colors.reset}\n`);

  console.log(`Total Tests: ${colors.bold}${totalTests}${colors.reset}`);
  console.log(`${colors.green}Passed: ${passedTests}${colors.reset}`);
  console.log(`${colors.red}Failed: ${failedTests}${colors.reset}`);
  
  const successRate = ((passedTests / totalTests) * 100).toFixed(2);
  console.log(`\nSuccess Rate: ${colors.bold}${successRate}%${colors.reset}`);

  if (failedTests === 0) {
    console.log(`\n${colors.green}${colors.bold}✓ All tests passed! 🎉${colors.reset}\n`);
  } else {
    console.log(`\n${colors.yellow}⚠ Some tests failed. Please review the output above.${colors.reset}\n`);
  }
}

/**
 * Main test runner
 */
async function runTests() {
  console.log(`${colors.bold}${colors.cyan}`);
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                                                            ║');
  console.log('║        Fabrice E-Commerce API Endpoint Tests              ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(colors.reset);
  console.log(`Testing API at: ${colors.cyan}${API_BASE_URL}${colors.reset}\n`);

  // Check if server is running
  try {
    const healthCheck = await makeRequest('/health');
    if (!healthCheck.data || healthCheck.status === 0) {
      console.error(`${colors.red}${colors.bold}Error: Cannot connect to server at ${API_BASE_URL}${colors.reset}`);
      console.error(`${colors.yellow}Please ensure the server is running with: npm run server${colors.reset}\n`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`${colors.red}${colors.bold}Error: Cannot connect to server${colors.reset}`);
    console.error(`${colors.yellow}Please ensure the server is running with: npm run server${colors.reset}\n`);
    process.exit(1);
  }

  try {
    await testHealthCheck();
    await testAuthentication();
    await testProducts();
    await testOrders();
    await testReviews();
    await testUsers();
  } catch (error) {
    console.error(`\n${colors.red}Fatal error during testing:${colors.reset}`, error.message);
    console.error(error.stack);
    process.exit(1);
  }

  printSummary();
  process.exit(failedTests > 0 ? 1 : 0);
}

// Run tests
runTests();
