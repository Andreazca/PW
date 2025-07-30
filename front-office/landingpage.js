function openLogin() {
    document.getElementById('loginModal').style.display = 'flex';
}

function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
}
document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll("nav a").forEach((el) => el.classList.remove("active"));
      link.classList.add("active");
    });
  });

// Lista de clientes válidos
const validUsers = [
    { email: "C005@eyeseverywhere.com", password: "AuditoriasEyesE25" },
    { email: "C015@eyeseverywhere.com", password: "AuditoriasEyesE25" },
    { email: "C020@eyeseverywhere.com", password: "AuditoriasEyesE25" },
    { email: "C023@eyeseverywhere.com", password: "AuditoriasEyesE25" },
    { email: "C030@eyeseverywhere.com", password: "AuditoriasEyesE25" }
];

function showLoginError(msg) {
    const errorDiv = document.getElementById('loginError');
    errorDiv.textContent = msg;
    errorDiv.style.display = 'block';
}

function hideLoginError() {
    const errorDiv = document.getElementById('loginError');
    errorDiv.style.display = 'none';
}

// Valida login
function validateLogin() {
    hideLoginError();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
        showLoginError('Por favor, preencha todos os campos.');
        return;
    }

    if (!validateEmail(email)) {
        showLoginError('Introduza um email válido.');
        return;
    }

    // Verifica se existe um utilizador com estas credenciais
    const user = validUsers.find(u => u.email === email && u.password === password);

    if (!user) {
        showLoginError('Credenciais inválidas.');
        return;
    }

    sessionStorage.setItem("loggedUser", email);
    sessionStorage.setItem("userType", "cliente");

    window.location.href = "dashboard.html";
}

// Valida formato do email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

