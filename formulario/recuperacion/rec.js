document.getElementById("form-olvide").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("recovery-email").value.trim();
  const errorEl = document.getElementById("recovery-error");

  // Validar que no esté vacío
  if (!email) {
    errorEl.textContent = "Ingresá tu Gmail.";
    return;
  }

  // Buscar el usuario en localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  const index = usuarios.findIndex((u) => u.email === email);

  // Si no existe
  if (index === -1) {
    errorEl.textContent = "No existe una cuenta con ese Gmail.";
    return;
  }

  // Si no está verificado
  if (!usuarios[index].verificado) {
    errorEl.textContent = "Esta cuenta todavía no fue verificada.";
    return;
  }

  // Generar nuevo código de 4 dígitos y guardarlo
  const nuevoCodigo = Math.floor(1000 + Math.random() * 9000);
  usuarios[index].codigoRecuperacion = nuevoCodigo;
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("emailRecuperacion", email);

  // Mostrar el código (simulando un envío por email)
  alert(`Tu código de recuperación es: ${nuevoCodigo}`);

  // Redirigir a la página de nueva contraseña
  window.location.href = "../recuperacion/nuevaC.html";
});
