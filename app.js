// app.js - THE DEFINITIVE, BULLETPROOF VERSION

// This function runs when the page content has loaded
document.addEventListener("DOMContentLoaded", function() {
    
    // Check if Firebase is available to prevent errors
    if (typeof firebase === 'undefined') {
        console.error("Firebase library not found. Check your script tags.");
        return;
    }
    
    // Initialize Firebase only once
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const auth = firebase.auth();
    const db = firebase.firestore();

    // --- TEMPLATES FOR DYNAMIC CONTENT ---
    const headerHTML = `
        <div class="user-info">
            <img src="profile.png" alt="Profile" class="profile-pic" id="profile-pic-header">
            <div class="user-details">
                <h3 id="user-name-header">Loading...</h3>
                <p id="user-email-header">Loading...</p>
            </div>
        </div>
        <div class="header-actions">
            <div class="wallet-icon"><img src="coin.png" alt="Wallet"></div>
            <span id="user-balance-header">0</span>
        </div>
    `;

    const navHTML = `
        <a href="index.html" class="nav-item"> <img src="home-icon.png" class="nav-icon"> <span>Home</span> </a>
        <a href="earn-more.html" class="nav-item"> <img src="earn-icon.png" class="nav-icon"> <span>Earn</span> </a>
        <a href="refer.html" class="nav-item"> <img src="refer-icon.png" class="nav-icon"> <span>Refer</span> </a>
        <a href="settings.html" class="nav-item"> <img src="settings-icon.png" class="nav-icon"> <span>Settings</span> </a>
    `;

    // --- INJECT HTML INTO THE PAGE ---
    const headerElement = document.querySelector('.app-header');
    const navElement = document.querySelector('.app-bottom-nav');
    if (headerElement) headerElement.innerHTML = headerHTML;
    if (navElement) navElement.innerHTML = navHTML;
    
    // --- AUTHENTICATION & DATA LOADING LOGIC ---
    auth.onAuthStateChanged(async (user) => {
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        const isAuthPage = currentPage === 'auth.html';
        
        if (user) {
            // User is logged in
            if (isAuthPage) {
                window.location.replace('index.html');
                return;
            }

            try {
                // **THE FIX:** We now *wait* for the data to be fetched from Firestore
                const userDoc = await db.collection('users').doc(user.uid).get();
                
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    // Now that we have the data, we can safely update the header
                    const userNameDisplay = document.getElementById('user-name-header');
                    const userEmailDisplay = document.getElementById('user-email-header');
                    const profilePic = document.getElementById('profile-pic-header');
                    const balanceDisplay = document.getElementById('user-balance-header');

                    if(userNameDisplay) userNameDisplay.textContent = userData.name || user.displayName || 'User';
                    if(userEmailDisplay) userEmailDisplay.textContent = userData.email || user.email;
                    if(balanceDisplay) balanceDisplay.textContent = userData.walletBalance || 0;
                    if(profilePic) profilePic.src = user.photoURL || 'profile.png';
                }

            } catch (error) {
                console.error("Error fetching user document:", error);
            }

        } else {
            // User is not logged in
            if (!isAuthPage) {
                window.location.replace('auth.html');
            }
        }
    });

    // --- NAVIGATION HIGHLIGHTING ---
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
});