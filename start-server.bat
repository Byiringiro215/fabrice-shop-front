@echo off
echo Starting Fabrice E-Commerce Development Server...
echo.
echo Server will be available at: http://localhost:8000
echo.
echo Pages:
echo - Login: http://localhost:8000/backend/login.html
echo - Register: http://localhost:8000/backend/register.html
echo - Test Auth: http://localhost:8000/backend/test-auth.html
echo.
echo Press Ctrl+C to stop the server
echo.
php -S localhost:8000 -t .
