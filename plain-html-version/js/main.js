// Main JavaScript Functions

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Update Navbar based on auth state
function updateNavbar() {
    const navActions = document.getElementById('navActions');
    if (!navActions) return;

    if (auth.isAuthenticated()) {
        const user = auth.getUser();
        const cartCount = auth.getCartCount();
        
        navActions.innerHTML = `
            <button class="btn btn-outline" onclick="viewCart()" style="position: relative;">
                🛒 Cart
                ${cartCount > 0 ? `<span style="position: absolute; top: -8px; right: -8px; background: var(--accent); color: white; border-radius: 50%; width: 20px; height: 20px; font-size: 0.75rem; display: flex; align-items: center; justify-content: center;">${cartCount}</span>` : ''}
            </button>
            <div style="position: relative;">
                <button class="btn btn-primary" onclick="toggleUserMenu()">
                    ${user.name.charAt(0).toUpperCase()}
                </button>
                <div id="userMenu" class="hidden" style="position: absolute; right: 0; top: 100%; margin-top: 0.5rem; background: white; border: 1px solid var(--border); border-radius: 0.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); min-width: 200px; z-index: 1000;">
                    <div style="padding: 1rem; border-bottom: 1px solid var(--border);">
                        <div style="font-weight: 600;">${user.name}</div>
                        <div style="font-size: 0.875rem; color: var(--text-muted);">${user.email}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: capitalize;">${user.role}</div>
                    </div>
                    <div style="padding: 0.5rem;">
                        <a href="pages/${user.role}-dashboard.html" style="display: block; padding: 0.5rem 1rem; text-decoration: none; color: var(--text); border-radius: 0.25rem;" onmouseover="this.style.background='var(--muted)'" onmouseout="this.style.background='transparent'">Dashboard</a>
                        <a href="pages/${user.role}-profile.html" style="display: block; padding: 0.5rem 1rem; text-decoration: none; color: var(--text); border-radius: 0.25rem;" onmouseover="this.style.background='var(--muted)'" onmouseout="this.style.background='transparent'">Profile</a>
                        <a href="pages/${user.role}-settings.html" style="display: block; padding: 0.5rem 1rem; text-decoration: none; color: var(--text); border-radius: 0.25rem;" onmouseover="this.style.background='var(--muted)'" onmouseout="this.style.background='transparent'">Settings</a>
                    </div>
                    <div style="padding: 0.5rem; border-top: 1px solid var(--border);">
                        <button onclick="auth.logout()" style="width: 100%; padding: 0.5rem 1rem; background: none; border: none; color: var(--error); text-align: left; cursor: pointer; border-radius: 0.25rem;" onmouseover="this.style.background='#fee2e2'" onmouseout="this.style.background='transparent'">Logout</button>
                    </div>
                </div>
            </div>
        `;
    }
}

function toggleUserMenu() {
    const menu = document.getElementById('userMenu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

function viewCart() {
    const user = auth.getUser();
    if (user && user.role === 'customer') {
        window.location.href = 'pages/customer-cart.html';
    } else {
        window.location.href = 'pages/cart.html';
    }
}

// Close user menu when clicking outside
document.addEventListener('click', (e) => {
    const menu = document.getElementById('userMenu');
    if (menu && !menu.classList.contains('hidden')) {
        if (!e.target.closest('#userMenu') && !e.target.closest('button')) {
            menu.classList.add('hidden');
        }
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.getElementById('mobileToggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            const navLinks = document.getElementById('navLinks');
            const navActions = document.getElementById('navActions');
            navLinks?.classList.toggle('hidden');
            navActions?.classList.toggle('hidden');
        });
    }

    // Update navbar on page load
    updateNavbar();
});

// Format currency
function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Render stars
function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= rating ? '⭐' : '☆';
    }
    return stars;
}
