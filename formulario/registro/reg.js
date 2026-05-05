document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre-input").value.trim();
  const apellido = document.getElementById("apellido-input").value.trim();
  const email = document.getElementById("email-input").value.trim();
  const password = document.getElementById("password-input").value;
  const password2 = document.getElementById("confirm-password-input").value;
  const errorEl = document.getElementById("form-error");

  // Validaciones
  if (!nombre || !apellido || !email || !password || !password2) {
    errorEl.textContent = "Completá todos los campos.";
    return;
  }

  if (!email.endsWith("@gmail.com")) {
    errorEl.textContent = "Ingresá un Gmail válido.";
    return;
  }

  if (password.length < 6) {
    errorEl.textContent = "La contraseña debe tener al menos 6 caracteres.";
    return;
  }

  if (password !== password2) {
    errorEl.textContent = "Las contraseñas no coinciden.";
    return;
  }

  // Verificar si el email ya está registrado
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  const yaExiste = usuarios.some((u) => u.email === email);

  if (yaExiste) {
    errorEl.textContent = "Este Gmail ya está registrado.";
    return;
  }

  errorEl.textContent = "";

  // Generar código de verificación de 4 dígitos
  const codigo = Math.floor(1000 + Math.random() * 9000);

  // Guardar el nuevo usuario en el array de usuarios
  const nuevoUsuario = {
    nombre,
    apellido,
    email,
    password,
    codigo,
    verificado: false,
  };
  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // Guardar también el email del usuario que está verificando en este momento
  localStorage.setItem("emailPendiente", email);

  // Mostrar el código
  alert(`Tu código de verificación es: ${codigo}`);

  // Redirigir a verificación
  window.location.href = "../verificacion/verificacion.html";
});
