document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-message');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validateForm()) {
      successMessage.style.display = 'block';
      setTimeout(() => {
        successMessage.style.display = 'none';
        form.reset();
      }, 2000);
    }
  });

  function validateForm() {
    let valid = true;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const inquiryInputs = document.querySelectorAll('input[name="inquiry"]');
    const messageInput = document.getElementById('message');
    const termsInput = document.getElementById('terms');

    clearErrors();

    if (!nameInput.value.trim()) {
      setError(nameInput, 'El nombre es obligatorio');
      valid = false;
    }

    if (!validateEmail(emailInput.value.trim())) {
      setError(emailInput, 'El correo electrónico no es válido');
      valid = false;
    }

    if (![...inquiryInputs].some(input => input.checked)) {
      setError(inquiryInputs[0], 'Seleccione un tipo de consulta');
      valid = false;
    }

    if (!messageInput.value.trim()) {
      setError(messageInput, 'El mensaje es obligatorio');
      valid = false;
    }

    if (!termsInput.checked) {
      setError(termsInput, 'Debe aceptar los términos y condiciones');
      valid = false;
    }

    return valid;
  }

  function setError(input, message) {
    const errorMessage = document.getElementById(`${input.id}-error`);
    errorMessage.textContent = message;
    errorMessage.style.visibility = 'visible';
  }

  function clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => {
      error.textContent = '';
      error.style.visibility = 'hidden';
    });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
