const registerForm = document.getElementById('register-form');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const errorMessage = document.getElementById('error-message');
const allMainElements = document.querySelectorAll('main');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const objToSend = { email: emailInput.value, password: passwordInput.value };
  registerUser(objToSend);
});

async function registerUser(newUserObj) {
  try {
    const res = await fetch('http://localhost:3000/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUserObj),
    });
    const response = await res.json();
    if (!response.success) {
      errorMessage.textContent = 'Could not create user';
      setTimeout(() => {
        errorMessage.textContent = '';
      }, 5000);
      return;
    }
    allMainElements.forEach((main) => {
      main.classList.toggle('hidden');
    });
  } catch (error) {}
}
