const loginForm = document.getElementById('login-form');
const emailINput = document.getElementById('email-input');
const passwordINput = document.getElementById('password-input');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const loginObj = { email: emailINput.value, password: passwordINput.value };
  loginUser(loginObj);
});

async function loginUser(loginObj) {
  try {
    const res = await fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginObj),
    });
    const response = await res.json();
    localStorage.setItem('token', response.message);
    location.replace('index.html');
  } catch (error) {
    createErrorMessage();
  }
}

function createErrorMessage() {
  errorMessage.textContent = 'Could not login';
  setTimeout(() => {
    errorMessage.textContent = '';
  }, 5000);
}
