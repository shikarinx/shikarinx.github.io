// app.js - FINAL VERSION WITH REAL ICONS

document.addEventListener("DOMContentLoaded", function() {

    // --- 1. DEFINE HTML COMPONENTS WITH REAL ICONS ---
    const headerHTML = `
        <div class="user-info">
            <img src="profile.png" alt="Profile" class="profile-pic" id="profile-pic">
            <div class="user-details">
                <h3 id="user-name">Loading...</h3>
                <p id="user-email"></p>
            </div>
        </div>
        <div class="header-actions">
            <div class="wallet-icon">
                <img src="coin.png" alt="Wallet">
            </div>
            <span id="user-balance">0</span>
        </div>
    `;

    const navHTML = `
        <a href="index.html" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span>Home</span>
        </a>
        <a href="earn-more.html" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            <span>Earn</span>
        </a>
        <a href="refer.html" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
            <span>Refer</span>
        </a>
        <a href="settings.html" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            <span>Settings</span>
        </a>
    `;

    const headerElement = document.querySelector('.app-header');
    const navElement = document.querySelector('.app-bottom-nav');
    if (headerElement) { headerElement.innerHTML = headerHTML; }
    if (navElement) { navElement.innerHTML = navHTML; }

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => { if (item.getAttribute('href') === currentPage) { item.classList.add('active'); } });

    if (typeof firebase !== 'undefined') {
        if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
        const auth = firebase.auth();
        const db = firebase.firestore();

        auth.onAuthStateChanged(user => {
            const isAuthPage = currentPage === 'auth.html';
            if (user) {
                if (isAuthPage) { window.location.replace('index.html'); return; }
                const userNameDisplay = document.getElementById('user-name');
                const userEmailDisplay = document.getElementById('user-email');
                const profilePic = document.getElementById('profile-pic');
                const balanceDisplay = document.getElementById('user-balance');

                db.collection('users').doc(user.uid).onSnapshot(doc => {
                    if (doc.exists) {
                        const userData = doc.data();
                        if (userNameDisplay) userNameDisplay.textContent = userData.name || 'User';
                        if (userEmailDisplay) userEmailDisplay.textContent = userData.email || user.email;
                        if (balanceDisplay) balanceDisplay.textContent = userData.walletBalance || 0;
                    }
                });

                if (profilePic) {
                    profilePic.src = user.photoURL || 'profile.png';
                }

            } else {
                if (!isAuthPage) { window.location.replace('auth.html'); }
            }
        });
    }
});