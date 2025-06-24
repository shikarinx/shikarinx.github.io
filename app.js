// app.js - THE DEFINITIVE FINAL VERSION

document.addEventListener('DOMContentLoaded', () => {
    // This is the guaranteed way to run after the page is ready
    
    // Check if Firebase is available
    if (typeof firebase === 'undefined') {
        console.error("Firebase is not loaded. Check script tags.");
        return;
    }

    // Initialize Firebase only once
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const auth = firebase.auth();
    const db = firebase.firestore();

    // Define a function to update the UI
    const updateUserUI = async (user) => {
        const header = document.querySelector('.app-header');
        if (!header) return; // Exit if no header on this page (like auth.html)

        const userNameDisplay = document.getElementById('user-name-header');
        const userEmailDisplay = document.getElementById('user-email-header');
        const profilePic = document.getElementById('profile-pic-header');
        const balanceDisplay = document.getElementById('user-balance-header');

        if (!user) {
            // If user is logged out, redirect
            if (window.location.pathname.includes('auth.html') === false) {
                window.location.replace('auth.html');
            }
            return;
        }

        // If user is logged in, try to go home from auth page
        if (window.location.pathname.includes('auth.html')) {
            window.location.replace('index.html');
            return;
        }

        // ** THE FIX IS HERE: Fetch user data from Firestore **
        try {
            const userDoc = await db.collection('users').doc(user.uid).get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                if (userNameDisplay) userNameDisplay.textContent = userData.name || user.displayName || 'User';
                if (userEmailDisplay) userEmailDisplay.textContent = userData.email || user.email;
                if (balanceDisplay) balanceDisplay.textContent = userData.walletBalance || 0;
            } else {
                 if (userNameDisplay) userNameDisplay.textContent = user.displayName || 'User';
                 if (userEmailDisplay) userEmailDisplay.textContent = user.email;
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            if (userNameDisplay) userNameDisplay.textContent = 'Error';
        }
        
        if (profilePic) {
            profilePic.src = user.photoURL || 'profile.png';
        }
    };

    // Listen for auth state changes and update the UI
    auth.onAuthStateChanged(updateUserUI);

    // Highlight the active navigation item
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
});