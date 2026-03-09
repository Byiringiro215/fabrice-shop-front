# Fabrice E-Commerce Platform

A full-stack e-commerce platform with role-based access control, built with React (frontend) and Node.js/Express (backend).

## 🚀 Features

- **Multi-Role System**: Customer, Seller, and Admin portals
- **Product Management**: Browse, search, and manage products
- **Shopping Cart**: Add to cart and checkout functionality
- **Order Processing**: Complete order management with status tracking
- **Review System**: Product reviews and ratings
- **User Profiles**: Manage user information and preferences
- **Dashboard Analytics**: Real-time statistics for all user roles

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Shadcn/ui components
- React Router for navigation

### Backend
- Node.js with Express
- PostgreSQL database
- bcrypt for password hashing
- ES6 modules

### Plain HTML Version
- Vanilla JavaScript
- CSS3 with custom styling
- localStorage for cart management
- Fetch API for backend communication

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd fabrice-shop-front
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fabrice-ecommerce
DB_USER=postgres
DB_PASSWORD=postgres
PORT=3001
NODE_ENV=development
JWT_SECRET=your-secret-key-here
```

4. **Setup the database**

Create the database and run migrations:
```bash
# Create database
createdb fabrice-ecommerce

# Run schema
psql -U postgres -d fabrice-ecommerce -f backend/database/schema.sql

# Seed data
psql -U postgres -d fabrice-ecommerce -f backend/database/seed.sql
```

## 🚀 Running the Application

### Start the Backend Server
```bash
# Production mode
npm run server

# Development mode (with auto-reload)
npm run server:dev
```

The server will start on `http://localhost:3001`

### Start the React Frontend
```bash
# Development mode
npm run dev

# Build for production
npm run build
```

### Access the Application

- **React App**: http://localhost:5173
- **Backend Portal**: http://localhost:3001/backend/login.html
- **Plain HTML Version**: http://localhost:3001/plain-html-version/pages/login.html
- **API Health Check**: http://localhost:3001/api/health

## 👥 Test Accounts

Use these credentials to test different user roles:

| Role | Email | Password |
|------|-------|----------|
| Customer | customer@test.com | customer123 |
| Seller | seller@test.com | seller123 |
| Admin | admin@test.com | admin123 |

## 🧪 Testing

### Run API Tests

We provide comprehensive API testing tools:

**Command Line Tests** (Recommended):
```bash
npm run test:api
```

**Browser-Based Tests**:
Open `http://localhost:3001/test-api.html` in your browser

For detailed testing instructions, see [TESTING-GUIDE.md](TESTING-GUIDE.md)

## 📁 Project Structure

```
fabrice-shop-front/
├── backend/                    # Backend HTML pages
│   ├── api/                   # PHP API (legacy)
│   ├── config/                # Database configs
│   ├── database/              # SQL schemas and seeds
│   └── models/                # PHP models (legacy)
├── server/                    # Node.js/Express backend
│   ├── config/               # Database connection
│   ├── models/               # Data models
│   └── routes/               # API routes
├── src/                      # React frontend
│   ├── components/          # React components
│   ├── pages/              # Page components
│   └── contexts/           # React contexts
├── plain-html-version/      # Vanilla JS version
│   ├── css/                # Stylesheets
│   ├── js/                 # JavaScript files
│   └── pages/              # HTML pages
├── test-api-endpoints.js   # API test script
├── test-api.html          # Browser test interface
└── .env                   # Environment variables
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders?user_id=X` - Get user orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status

### Reviews
- `GET /api/reviews?user_id=X` - Get user reviews
- `GET /api/reviews?product_id=X` - Get product reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

For complete API documentation, see [NODE-BACKEND-GUIDE.md](NODE-BACKEND-GUIDE.md)

## 📖 Additional Documentation

- [NODE-BACKEND-GUIDE.md](NODE-BACKEND-GUIDE.md) - Backend setup and API details
- [MIGRATION-COMPLETE.md](MIGRATION-COMPLETE.md) - PHP to Node.js migration notes
- [TESTING-GUIDE.md](TESTING-GUIDE.md) - Comprehensive testing guide
- [QUICK-START.md](QUICK-START.md) - Quick start guide

## 🔒 Security Features

- Password hashing with bcrypt
- Role-based access control
- SQL injection prevention with parameterized queries
- CORS enabled for frontend integration
- Environment variable configuration

## 🚢 Deployment

### Recommended Platforms

- **Vercel** - For React frontend
- **Railway** - For Node.js backend + PostgreSQL
- **Render** - Full-stack deployment
- **Heroku** - Traditional deployment

### Deployment Steps

1. Set environment variables on your platform
2. Update database credentials
3. Build the frontend: `npm run build`
4. Deploy backend and frontend separately or together
5. Run database migrations on production database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 Scripts

```bash
# Frontend
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Backend
npm run server       # Start Express server
npm run server:dev   # Start with auto-reload

# Testing
npm run test:api     # Run API endpoint tests
npm run lint         # Run ESLint
```

## 🐛 Troubleshooting

### Server won't start
- Check if port 3001 is available
- Verify PostgreSQL is running
- Check `.env` configuration

### Database connection errors
- Ensure PostgreSQL service is running
- Verify database `fabrice-ecommerce` exists
- Check user permissions

### Frontend can't connect to backend
- Verify backend is running on port 3001
- Check CORS configuration
- Review browser console for errors

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Fabrice Byiringiro

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI components from [Shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)

---

**Happy Coding! 🎉**
