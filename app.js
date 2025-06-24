// App.js - Shared Components and Authentication Management
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Define HTML Components using multi-line backticks
    const headerHTML = `
        <div class="header-logo">
            <a href="index.html" class="logo-link">CashApp</a>
        </div>
        
        <div class="header-content">
            <div class="profile-section">
                <div class="user-avatar" id="user-avatar">
                    <span id="user-initials">UA</span>
                </div>
                <div class="user-info">
                    <span class="user-name" id="user-name">User Account</span>
                    <span class="user-email" id="user-email">user@example.com</span>
                </div>
            </div>
            
            <div class="actions-section">
                <div class="wallet-info">
                    <span class="wallet-label">Balance</span>
                    <span class="wallet-balance" id="wallet-balance">$0.00</span>
                </div>
                <div class="header-actions">
                    <button class="btn btn-outline" id="notifications-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                        </svg>
                    </button>
                    <button class="btn btn-primary" id="logout-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    `;
    
    const navHTML = `
        <a href="index.html" class="nav-item">
            <div class="nav-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
            </div>
            <span class="nav-text">Home</span>
        </a>
        
        <a href="offers.html" class="nav-item">
            <div class="nav-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
            </div>
            <span class="nav-text">Offers</span>
        </a>
        
        <a href="refer.html" class="nav-item">
            <div class="nav-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.996 1.996 0 0 0 18.06 7c-.8 0-1.54.5-1.85 1.26l-1.92 5.63c-.1.28-.28.53-.51.7-.55.4-1.31.36-1.78-.1L9 11.5c-.45-.35-.49-.99-.09-1.39L12 7v5.5l3.5-4.5 1.85 5.13A2 2 0 0 0 19.22 15H20v7h-4z"/>
                </svg>
            </div>
            <span class="nav-text">Refer</span>
        </a>
        
        <a href="settings.html" class="nav-item">
            <div class="nav-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                </svg>
            </div>
            <span class="nav-text">Settings</span>
        </a>
    `;
    
    // Inject Components into the DOM
    function injectComponents() {
        // Inject header HTML
        const headerElement = document.querySelector('.main-header');
        if (headerElement) {
            headerElement.innerHTML = headerHTML;
            console.log('Header component injected successfully');
        }
        
        // Inject navigation HTML
        const navElement = document.querySelector('.bottom-nav');
        if (navElement) {
            navElement.innerHTML = navHTML;
            console.log('Navigation component injected successfully');
        }
    }
    
    // Handle Active Navigation State
    function handleActiveNavigation() {
        // Get current page filename
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        console.log('Current page:', currentPage);
        
        // Find all navigation items
        const navItems = document.querySelectorAll('.nav-item');
        
        // Loop through navigation items and set active state
        navItems.forEach(navItem => {
            const href = navItem.getAttribute('href');
            
            // Remove any existing active class
            navItem.classList.remove('active');
            
            // Add active class if href matches current page
            if (href === currentPage) {
                navItem.classList.add('active');
                console.log('Active navigation set for:', href);
            }
        });
    }
    
    // Utility function to get user initials
    function getUserInitials(name, email) {
        if (name && name.trim() !== '') {
            const nameParts = name.trim().split(' ');
            if (nameParts.length >= 2) {
                return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
            } else {
                return nameParts[0].substring(0, 2).toUpperCase();
            }
        } else if (email) {
            return email.substring(0, 2).toUpperCase();
        }
        return 'UA';
    }
    
    // Update user interface elements
    function updateUserInterface(user) {
        const userNameElement = document.getElementById('user-name');
        const userEmailElement = document.getElementById('user-email');
        const userInitialsElement = document.getElementById('user-initials');
        
        if (user) {
            const displayName = user.displayName || 'User Account';
            const email = user.email || 'user@example.com';
            const initials = getUserInitials(user.displayName, user.email);
            
            if (userNameElement) {
                userNameElement.textContent = displayName;
            }
            if (userEmailElement) {
                userEmailElement.textContent = email;
            }
            if (userInitialsElement) {
                userInitialsElement.textContent = initials;
            }
            
            console.log('User interface updated for:', displayName);
        }
    }
    
    // Setup logout functionality
    function setupLogoutHandler() {
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn && typeof firebase !== 'undefined' && firebase.auth) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                firebase.auth().signOut().then(() => {
                    console.log('User signed out successfully');
                    window.location.href = 'auth.html';
                }).catch((error) => {
                    console.error('Error signing out:', error);
                });
            });
        }
    }
    
    // Create Authentication Guard
    function createAuthenticationGuard() {
        // Check if Firebase is available
        if (typeof firebase === 'undefined') {
            console.warn('Firebase is not available. Authentication guard disabled.');
            return;
        }
        
        // Check if Firebase Auth is available
        if (!firebase.auth) {
            console.warn('Firebase Auth is not available. Authentication guard disabled.');
            return;
        }
        
        // Initialize Firebase Auth and create auth state listener
        const auth = firebase.auth();
        
        // Get current page filename
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const isAuthPage = currentPage === 'auth.html';
        
        console.log('Setting up authentication guard for page:', currentPage);
        
        // Create authentication state observer
        auth.onAuthStateChanged(function(user) {
            console.log('Auth state changed. User:', user ? user.email : 'Not logged in');
            
            if (user) {
                // User is logged in
                console.log('User is authenticated:', user.email);
                
                // If user is on auth page, redirect to home
                if (isAuthPage) {
                    console.log('Authenticated user on auth page, redirecting to home...');
                    window.location.href = 'index.html';
                    return;
                }
                
                // Update user interface on other pages
                updateUserInterface(user);
                
                // Setup logout handler
                setupLogoutHandler();
                
            } else {
                // User is not logged in
                console.log('User is not authenticated');
                
                // If user is not on auth page, redirect to auth
                if (!isAuthPage) {
                    console.log('Unauthenticated user on protected page, redirecting to auth...');
                    window.location.href = 'auth.html';
                    return;
                }
            }
        });
    }
    
    // Initialize wallet balance (placeholder functionality)
    function initializeWalletBalance() {
        const walletBalanceElement = document.getElementById('wallet-balance');
        if (walletBalanceElement) {
            // This would typically come from a backend API
            const savedBalance = localStorage.getItem('walletBalance') || '$0.00';
            walletBalanceElement.textContent = savedBalance;
        }
    }
    
    // Setup notification handler
    function setupNotificationHandler() {
        const notificationBtn = document.getElementById('notifications-btn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', function(e) {
                e.preventDefault();
                // Placeholder for notification functionality
                alert('Notifications feature coming soon!');
            });
        }
    }
    
    // Add smooth page transitions
    function addPageTransitions() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(navItem => {
            navItem.addEventListener('click', function(e) {
                // Add loading state
                this.style.opacity = '0.7';
                this.style.transform = 'scale(0.95)';
                
                // Reset after a short delay
                setTimeout(() => {
                    this.style.opacity = '';
                    this.style.transform = '';
                }, 200);
            });
        });
    }
    
    // Main initialization function
    function initializeApp() {
        console.log('Initializing CashApp...');
        
        // Inject HTML components
        injectComponents();
        
        // Set up active navigation
        handleActiveNavigation();
        
        // Initialize authentication guard
        createAuthenticationGuard();
        
        // Initialize wallet balance
        initializeWalletBalance();
        
        // Setup additional handlers
        setupNotificationHandler();
        
        // Add page transitions
        addPageTransitions();
        
        // Add fade-in animation to main content
        const mainContent = document.querySelector('.container') || document.querySelector('main');
        if (mainContent) {
            mainContent.classList.add('fade-in');
        }
        
        console.log('CashApp initialization complete!');
    }
    
    // Handle page visibility changes
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            // Page became visible, refresh wallet balance
            initializeWalletBalance();
        }
    });
    
    // Add error handling for navigation
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
    });
    
    // Initialize the application
    initializeApp();
    
    // Expose some functions globally for debugging (optional)
    window.CashApp = {
        updateUserInterface,
        initializeWalletBalance,
        handleActiveNavigation
    };
});

// Additional utility functions for app-wide use
(function() {
    'use strict';
    
    // Format currency helper
    window.formatCurrency = function(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };
    
    // Show toast notification helper
    window.showToast = function(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Style the toast
        Object.assign(toast.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            opacity: '0',
            transform: 'translateY(-20px)',
            transition: 'all 0.3s ease'
        });
        
        // Set background color based on type
        switch (type) {
            case 'success':
                toast.style.backgroundColor = '#2ecc71';
                break;
            case 'error':
                toast.style.backgroundColor = '#e74c3c';
                break;
            case 'warning':
                toast.style.backgroundColor = '#f39c12';
                break;
            default:
                toast.style.backgroundColor = '#3498db';
        }
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    };
    
    // Loading state helper
    window.setLoading = function(element, isLoading) {
        if (!element) return;
        
        if (isLoading) {
            element.disabled = true;
            element.style.opacity = '0.7';
            element.style.cursor = 'not-allowed';
            const originalText = element.textContent;
            element.dataset.originalText = originalText;
            element.textContent = 'Loading...';
        } else {
            element.disabled = false;
            element.style.opacity = '';
            element.style.cursor = '';
            if (element.dataset.originalText) {
                element.textContent = element.dataset.originalText;
                delete element.dataset.originalText;
            }
        }
    };
})();