// login.js - Versão corrigida

function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert('Por favor, preencha ambos os campos.');
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
      alert(`Bem-vindo, ${data.email}!`);
      window.location.href = '/profissionais.html';
    })
    .catch(error => {
      alert(error.message);
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
      alert(`Bem-vindo, ${data.email}!`);
      window.location.href = '/profissionais.html';
    })
    .catch(error => {
      alert(error.message);
    });
}

window.onload = initializeGoogleLogin;


