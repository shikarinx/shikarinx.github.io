// app.js - FINAL FUTURISTIC APP-LIKE VERSION
document.addEventListener("DOMContentLoaded", function() {
    const headerHTML = `
        <div class="user-info">
            <img src="profile.png" alt="Profile" class="profile-pic" id="profile-pic">
            <div class="user-details"> <h3 id="user-name">Loading...</h3> <p id="user-email"></p> </div>
        </div>
        <div class="header-actions"> <div class="wallet-icon">💰</div> <span id="user-balance">0</span> </div>
    `;
    const navHTML = `
        <a href="index.html" class="nav-item"> <div class="icon">🏠</div> <span>Home</span> </a>
        <a href="earn-more.html" class="nav-item"> <div class="icon">💸</div> <span>Earn</span> </a>
        <a href="refer.html" class="nav-item"> <div class="icon">👥</div> <span>Refer</span> </a>
        <a href="settings.html" class="nav-item"> <div class="icon">⚙️</div> <span>Settings</span> </a>
    `;
    const headerElement = document.querySelector('.app-header');
    const navElement = document.querySelector('.app-bottom-nav');
    if (headerElement) headerElement.innerHTML = headerHTML;
    if (navElement) navElement.innerHTML = navHTML;
    
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => { if (item.getAttribute('href') === currentPage) item.classList.add('active'); });

    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
        const db = firebase.firestore();
        auth.onAuthStateChanged(user => {
            const isAuthPage = currentPage === 'auth.html';
            if (user) {
                if (isAuthPage) { window.location.replace('index.html'); return; }
                document.getElementById('user-name').textContent = user.displayName || 'User';
                document.getElementById('user-email').textContent = user.email;
                const profilePic = document.getElementById('profile-pic');
                if (user.photoURL) profilePic.src = user.photoURL;
                db.collection('users').doc(user.uid).onSnapshot(doc => {
                    if (doc.exists) document.getElementById('user-balance').textContent = doc.data().walletBalance || 0;
                });
            } else {
                if (!isAuthPage) window.location.replace('auth.html');
            }
        });
    }
});