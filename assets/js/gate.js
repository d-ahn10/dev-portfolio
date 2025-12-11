const CORRECT_PASSWORD = 'changeme'; // Replace with your password

function checkPassword() {
  const input = document.getElementById('password');
  const message = document.getElementById('error-message');

  if (!input) return;

  if (input.value.trim() === CORRECT_PASSWORD) {
    window.location.href = 'main.html';
  } else {
    message.textContent = 'Incorrect password. Please try again.';
    message.classList.add('visible');
    input.focus();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('gate-form');
  const button = document.getElementById('enter-button');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      checkPassword();
    });
  }

  if (button) {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      checkPassword();
    });
  }
});