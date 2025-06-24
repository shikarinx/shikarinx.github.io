// app.js - FINAL & MOST RELIABLE VERSION

document.addEventListener("DOMContentLoaded", function() {
    // Check if Firebase is available
    if (typeof firebase === 'undefined') {
        console.error("Firebase library not found. Check your script tags.");
        return;
    }
    
    // Initialize Firebase only if it hasn't been already
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const auth = firebase.auth();
    const db = firebase.firestore();

    // --- 1. DEFINE & INJECT HTML COMPONENTS ---
    const headerHTML = `
        <div class="user-info">
            <img src="profile.png" alt="Profile" class="profile-pic" id="profile-pic">
            <div class="user-details">
                <h3 id="user-name">Loading...</h3>
                <p id="user-email">Loading...</p>
            </div>
        </div>
        <div class="header-actions">
            <div class="wallet-icon"> <img src="coin.png" alt="Wallet"> </div>
            <span id="user-balance">0</span>
        </div>
    `;

    const navHTML = `
        <a href="index.html" class="nav-item"> <img src="home-icon.png" class="nav-icon"> <span>Home</span> </a>
        <a href="earn-more.html" class="nav-item"> <img src="earn-icon.png" class="nav-icon"> <span>Earn</span> </a>
        <a href="refer.html" class="nav-item"> <img src="refer-icon.png" class="nav-icon"> <span>Refer</span> </a>
        <a href="settings.html" class="nav-item"> <img src="settings-icon.png" class="nav-icon"> <span>Settings</span> </a>
    `;

    const headerElement = document.querySelector('.app-header');
    const navElement = document.querySelector('.app-bottom-nav');
    if (headerElement) headerElement.innerHTML = headerHTML;
    if (navElement) navElement.innerHTML = navHTML;

    // --- 2. AUTHENTICATION & DYNAMIC CONTENT ---
    auth.onAuthStateChanged(user => {
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        const isAuthPage = currentPage === 'auth.html';
        
        if (user) {
            // User is logged in
            if (isAuthPage) {
                window.location.replace('index.html');
                return;
            }
            
            // Get all display elements
            const userNameDisplay = document.getElementById('user-name');
            const userEmailDisplay = document.getElementById('user-email');
            const profilePic = document.getElementById('profile-pic');
            const balanceDisplay = document.getElementById('user-balance');

            // Set profile picture immediately
            if (profilePic) {
                profilePic.src = user.photoURL || 'profile.png';
            }

            // Fetch user data from Firestore for name, email, and balance
            const userDocRef = db.collection('users').doc(user.uid);
            userDocRef.onSnapshot(doc => {
                if (doc.exists) {
                    const userData = doc.data();
                    if (userNameDisplay) userNameDisplay.textContent = userData.name || 'User';
                    if (userEmailDisplay) userEmailDisplay.textContent = userData.email || user.email;
                    if (balanceDisplay) balanceDisplay.textContent = userData.walletBalance || 0;
                } else {
                    console.log("User document not found in Firestore.");
                    if (userNameDisplay) userNameDisplay.textContent = user.displayName || 'User';
                    if (userEmailDisplay) userEmailDisplay.textContent = user.email;
                }
            }, err => {
                console.error("Error fetching user data:", err);
            });

        } else {
            // User is not logged in
            if (!isAuthPage) {
                window.location.replace('auth.html');
            }
        }
    });

    // --- 3. NAVIGATION HIGHLIGHTING ---
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
});