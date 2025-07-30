function openLogin() {
    document.getElementById('loginModal').style.display = 'flex';
}

function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
}

function validateLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Introduza um email válido.');
        return;
    }

    sessionStorage.setItem("loggedUser", email);

    // NOVO: guardar tipo de utilizador
    const userType = email === "admin@admin.com" ? "admin" : "user";
    sessionStorage.setItem("userType", userType);
    
    window.location.href = "dashboard.html";
    
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ========== LANDINGPAGE.JS ==========

// Abre o modal de login
function openLogin() {
    document.getElementById('loginModal').style.display = 'flex';
}

// Fecha o modal de login
function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
}

// Valida o login
function validateLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Introduza um email válido.');
        return;
    }

    sessionStorage.setItem("loggedUser", email);

    const userType = email === "admin@admin.com" ? "admin" : "user";
    sessionStorage.setItem("userType", userType);
    
    window.location.href = "dashboard.html";
}

// Valida formato do email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
