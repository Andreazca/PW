// login.js - Versão corrigida

function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    mostrarToast('Por favor, preencha ambos os campos.');
    return;
  }

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(response => {
      if (!response.ok) throw new Error('Email ou password inválidos.');
      return response.json();
    })
    .then(data => {
       window.location.href = '/profissionais.html';
    })
    .catch(error => {
      mostrarToast(error.message);
    });
}

function initializeGoogleLogin() {
  google.accounts.id.initialize({
    client_id: '450604138943-tahpmsrsrlhgqrtlam4d32utfcp7eq2o.apps.googleusercontent.com',
    callback: handleGoogleCredentialResponse
  });
  google.accounts.id.renderButton(
    document.getElementById('google-login-button'),
    { theme: 'outline', size: 'large' }
  );
}

function handleGoogleCredentialResponse(response) {
  const token = response.credential;
  fetch('/google-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  })
    .then(response => {
      if (!response.ok) throw new Error('Falha no login Google ou conta não registada.');
      return response.json();
    })
    .then(data => {
       window.location.href = '/profissionais.html';
    })
    .catch(error => {
      mostrarToast(error.message);
    });
}

 function mostrarToast(mensagem) {
    // Remove toast antigo se existir
    const antigo = document.getElementById("toast-alert");
    if (antigo) antigo.remove();

    const toast = document.createElement("div");
    toast.id = "toast-alert";
    toast.textContent = mensagem;
    toast.style.position = "fixed";
    toast.style.top = "32px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "#f9f6ef";
    toast.style.color = "#1a3d63";
    toast.style.padding = "16px 32px";
    toast.style.borderRadius = "10px";
    toast.style.fontSize = "17px";
    toast.style.boxShadow = "0 2px 12px rgba(0,0,0,0.13)";
    toast.style.zIndex = "9999";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s";

    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = "1"; }, 50);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 400);
    }, 2200);
  }

window.onload = initializeGoogleLogin;


