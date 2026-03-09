// Authentication Management
class AuthManager {
    constructor() {
        // Auto-detect environment: use production URL if not on localhost
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        this.API_BASE_URL = isLocalhost 
            ? 'http://localhost:3001/api'
            : 'https://fabrice-ecommerce-api.onrender.com/api';
        this.currentUser = this.loadUser();
        this.cart = this.loadCart();
    }

    loadUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }

    saveUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser = user;
    }

    loadCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        this.cart = cart;
    }

    async login(email, password, role) {
        try {
            const response = await fetch(`${this.API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, role })
            });

            const data = await response.json();

            if (data.success && data.user) {
                // Verify role matches
                if (role && data.user.role !== role) {
                    return { 
                        success: false, 
                        message: `Invalid credentials. This email is registered as a ${data.user.role}.` 
                    };
                }
                this.saveUser(data.user);
                return { success: true, user: data.user };
            } else {
                return { success: false, message: data.message || 'Invalid email or password' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Connection error. Please try again.' };
        }
    }

    async register(userData) {
        try {
            const response = await fetch(`${this.API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (data.success && data.user) {
                this.saveUser(data.user);
                return { success: true, user: data.user };
            } else {
                return { success: false, message: data.message || 'Registration failed' };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'Connection error. Please try again.' };
        }
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        window.location.href = '../index.html';
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    getUser() {
        return this.currentUser;
    }

    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = '../pages/login.html';
            return false;
        }
        return true;
    }

    requireRole(role) {
        if (!this.requireAuth()) return false;
        
        if (this.currentUser.role !== role) {
            window.location.href = '../index.html';
            return false;
        }
        return true;
    }

    // Cart Management
    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        
        this.saveCart(this.cart);
        return this.cart;
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart(this.cart);
        return this.cart;
    }

    updateCartQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.saveCart(this.cart);
            }
        }
        return this.cart;
    }

    clearCart() {
        this.cart = [];
        this.saveCart(this.cart);
        return this.cart;
    }

    getCart() {
        return this.cart;
    }

    getCartCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
}

// Create global auth instance
const auth = new AuthManager();
