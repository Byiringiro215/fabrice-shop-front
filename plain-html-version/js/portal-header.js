// Portal Header Component
function renderPortalHeader(portalName, showCart = false) {
    const user = auth.getUser();
    const cartCount = auth.getCartCount();
    
    return `
        <header class="dashboard-header">
            <div class="dashboard-header-content">
                <div class="dashboard-title">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent);">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    <h1>${portalName}</h1>
                </div>
                
                <div class="dashboard-actions">
                    ${showCart ? `
                    <button class="icon-button" onclick="window.location.href='customer-cart.html'">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        ${cartCount > 0 ? `<span class="cart-badge">${cartCount}</span>` : ''}
                    </button>
                    ` : ''}

                    <button class="icon-button">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                        <span class="notification-dot"></span>
                    </button>

                    <div style="position: relative;">
                        <button class="user-menu-button" onclick="toggleUserMenu()">
                            <div class="user-avatar">${user.name.charAt(0).toUpperCase()}</div>
                            <div class="user-info" style="display: none;" class="user-info-desktop">
                                <p>${user.name}</p>
                                <p>${user.role}</p>
                            </div>
                        </button>

                        <div id="userDropdown" class="user-dropdown" style="display: none;">
                            <div class="user-dropdown-header">
                                <p>${user.name}</p>
                                <p>${user.email}</p>
                            </div>
                            <div class="user-dropdown-menu">
                                <a href="/backend/${user.role}-profile.html" class="user-dropdown-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    <span>Profile</span>
                                </a>
                                <a href="${user.role}-settings.html" class="user-dropdown-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="3"></circle>
                                        <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m18.2 5.2l-4.2-4.2m0-6l4.2-4.2"></path>
                                    </svg>
                                    <span>Settings</span>
                                </a>
                            </div>
                            <div class="user-dropdown-footer">
                                <button onclick="auth.logout()" class="user-dropdown-item logout" style="width: 100%; background: none; border: none; cursor: pointer; text-align: left;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                        <polyline points="16 17 21 12 16 7"></polyline>
                                        <line x1="21" y1="12" x2="9" y2="12"></line>
                                    </svg>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    `;
}

function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown && !e.target.closest('.user-menu-button') && !e.target.closest('#userDropdown')) {
        dropdown.style.display = 'none';
    }
});

// Show user info on desktop
window.addEventListener('resize', () => {
    const userInfo = document.querySelectorAll('.user-info-desktop');
    userInfo.forEach(el => {
        el.style.display = window.innerWidth >= 768 ? 'block' : 'none';
    });
});
