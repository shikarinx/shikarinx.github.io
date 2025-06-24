// app.js - FINAL CORRECTED VERSION

document.addEventListener("DOMContentLoaded", function() {

    // This code requires that firebase-config.js is loaded first.
    if (typeof firebase !== 'undefined') {
        // Initialize Firebase on every page where this script runs
        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
        const db = firebase.firestore();

        // --- 1. DEFINE & INJECT HTML COMPONENTS ---
        const headerHTML = `
            <a href="profile.html" class="profile-section">
                <div class="profile-icon" id="user-profile-icon-container">
                    <!-- Profile picture will be inserted here by JS -->
                </div>
                <div class="profile-name" id="user-name">Loading...</div>
            </a>
            <div class="actions-section">
                <div class="action-icon"> <img src="gift.png" alt="Daily Reward"> </div>
                <a href="wallet.html" class="wallet-balance">
                    <img src="coin.png" alt="Coin">
                    <span id="wallet-balance-display">0</span>
                </a>
            </div>
        `;

        const navHTML = `
            <a href="index.html" class="nav-item"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> <span>Home</span> </a>
            <a href="offers.html" class="nav-item"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> <span>Offers</span> </a>
            <a href="refer.html" class="nav-item"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg> <span>Refer</span> </a>
            <a href="settings.html" class="nav-item"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg> <span>Settings</span> </a>
        `;

        const headerElement = document.querySelector('.main-header');
        const navElement = document.querySelector('.bottom-nav');
        if (headerElement) { headerElement.innerHTML = headerHTML; }
        if (navElement) { navElement.innerHTML = navHTML; }

        // --- 2. AUTHENTICATION & DYNAMIC CONTENT ---
        auth.onAuthStateChanged(user => {
            const currentPage = window.location.pathname.split("/").pop() || "index.html";
            const isAuthPage = currentPage === 'auth.html';
            
            if (user) {
                if (isAuthPage) { window.location.replace('index.html'); return; }

                const userNameDisplay = document.getElementById('user-name');
                const profileIconContainer = document.getElementById('user-profile-icon-container');
                const balanceDisplay = document.getElementById('wallet-balance-display');

                // Display User Name
                if (userNameDisplay) {
                    userNameDisplay.textContent = user.displayName || user.email;
                }

                // Display Profile Picture or Initial
                if (profileIconContainer) {
                    if (user.photoURL) {
                        profileIconContainer.innerHTML = `<img src="${user.photoURL}" alt="Profile" class="profile-img">`;
                    } else {
                        // Use the default PNG if no Google photo is available
                        profileIconContainer.innerHTML = `<img src="profile.png" alt="Profile" class="profile-img">`;
                    }
                }

                // Fetch and display wallet balance in real-time
                db.collection('users').doc(user.uid).onSnapshot(doc => {
                    if (doc.exists && balanceDisplay) {
                        balanceDisplay.textContent = doc.data().walletBalance || 0;
                    }
                });

            } else {
                if (!isAuthPage) { window.location.replace('auth.html'); }
            }
        });

        // --- 3. NAVIGATION HIGHLIGHTING ---
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            if (item.getAttribute('href') === currentPage) { item.classList.add('active'); }
        });

    } else {
        console.error("Firebase library not found. Check script tags.");
    }
});