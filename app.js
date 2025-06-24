// app.js

// This function runs after the entire HTML page has loaded
document.addEventListener("DOMContentLoaded", function() {

    // --- 1. DEFINE SHARED HTML COMPONENTS ---

    const headerHTML = `
        <div class="profile-section">
            <a href="profile.html" class="profile-icon" id="user-initials"></a>
            <div class="profile-name" id="user-name">Loading...</div>
        </div>
        <div class="actions-section">
            <div class="action-icon" id="daily-reward-btn">
                <img src="https://i.imgur.com/8x8iO7a.png" alt="Daily Reward">
            </div>
            <a href="wallet.html" class="wallet-balance">
                <img src="https://i.imgur.com/mU4p4pA.png" alt="Coin">
                <span id="wallet-balance-display">0</span>
            </a>
        </div>
    `;

    const navHTML = `
        <a href="index.html" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span>Home</span>
        </a>
        <a href="offers.html" class="nav-item">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span>Offers</span>
        </a>
        <a href="refer.html" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
            <span>Refer</span>
        </a>
        <a href="settings.html" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            <span>Settings</span>
        </a>
    `;

    // --- 2. INSERT COMPONENTS INTO THE PAGE ---
    
    // Find the header and nav elements in the current HTML page
    const headerElement = document.querySelector('.main-header');
    const navElement = document.querySelector('.bottom-nav');

    if (headerElement) {
        headerElement.innerHTML = headerHTML;
    }
    if (navElement) {
        navElement.innerHTML = navHTML;
    }

    // --- 3. HANDLE NAVIGATION HIGHLIGHTING ---

    const currentPage = window.location.pathname.split("/").pop(); // Gets "index.html" etc.
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        const itemPage = item.getAttribute('href');
        if (currentPage === itemPage) {
            item.classList.add('active');
        }
    });

    // --- 4. HANDLE USER AUTHENTICATION & DATA DISPLAY ---

    // This code requires that firebase-config.js and the firebase SDKs are loaded before app.js
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
        // const db = firebase.firestore(); // We will use this when we need the database

        auth.onAuthStateChanged(user => {
            if (user) {
                // This code runs on EVERY page where app.js is included
                const userNameDisplay = document.getElementById('user-name');
                const userInitialsDisplay = document.getElementById('user-initials');

                if (userNameDisplay && userInitialsDisplay) {
                    const name = user.displayName || user.email;
                    userNameDisplay.textContent = name;
                    userInitialsDisplay.textContent = name.charAt(0).toUpperCase();
                }

                // We will add logic to fetch the wallet balance here later.
                // For now, it will just show the default '0'.

            } else {
                // If the user is on any page other than the login/register pages and is not logged in, redirect them.
                const authPages = ['login.html', 'register.html', 'otp-verify.html', 'register-profile.html'];
                if (!authPages.includes(currentPage)) {
                    window.location.href = 'login.html';
                }
            }
        });
    } else {
        console.error("Firebase is not defined. Make sure the SDKs are loaded before app.js.");
    }
});