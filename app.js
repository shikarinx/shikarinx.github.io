// app.js - FINAL PROFESSIONAL VERSION

document.addEventListener("DOMContentLoaded", function() {

    // --- 1. DEFINE NEW HTML COMPONENTS ---
    const headerHTML = `
        <a href="index.html" class="header-logo">MONETRA</a>
        <div class="header-actions">
            <div id="user-info-header" class="header-balance">
                <span id="user-email-display">user@example.com</span>
                <span>Balance: <span id="user-balance-display">$0.00</span></span>
            </div>
            <div class="action-icon rainbow-icon">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </div>
            <button id="header-logout-btn" class="header-logout-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Logout
            </button>
        </div>
    `;

    const navHTML = `
        <a href="index.html" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span>Home</span>
        </a>
        <a href="offers.html" class="nav-item">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>Offers</span>
        </a>
        <a href="refer.html" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
            <span>Refer</span>
        </a>
        <a href="settings.html" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            <span>Settings</span>
        </a>
    `;

    const headerElement = document.querySelector('.main-header');
    const navElement = document.querySelector('.bottom-nav');
    if (headerElement) { headerElement.innerHTML = headerHTML; }
    if (navElement) { navElement.innerHTML = navHTML; }

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
    
    // --- LEAF ANIMATION ---
    function createLeaves() {
        const leafContainer = document.createElement('div');
        leafContainer.className = 'leaf-container';
        document.body.prepend(leafContainer);
        for (let i = 0; i < 15; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'leaf';
            leaf.innerHTML = '🍀';
            leaf.style.left = Math.random() * 100 + 'vw';
            leaf.style.animationDuration = (Math.random() * 5 + 5) + 's';
            leaf.style.animationDelay = (Math.random() * 5) + 's';
            leaf.style.fontSize = (Math.random() * 10 + 10) + 'px';
            leaf.style.opacity = Math.random() * 0.7 + 0.3;
            leafContainer.appendChild(leaf);
        }
    }

    // --- AUTHENTICATION & DYNAMIC CONTENT ---
    if (typeof firebase !== 'undefined') {
        const auth = firebase.auth();
        const isAuthPage = currentPage === 'auth.html';
        if (!isAuthPage) { createLeaves(); }

        auth.onAuthStateChanged(user => {
            if (user) {
                if (isAuthPage) {
                    window.location.replace('index.html');
                    return;
                }
                const emailDisplay = document.getElementById('user-email-display');
                if (emailDisplay) emailDisplay.textContent = user.email;
                const logoutBtn = document.getElementById('header-logout-btn');
                if (logoutBtn) logoutBtn.addEventListener('click', () => auth.signOut());
            } else {
                if (!isAuthPage) { window.location.replace('auth.html'); }
            }
        });
    }
});