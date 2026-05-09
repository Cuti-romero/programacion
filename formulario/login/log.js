document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email-input").value.trim();
  const password = document.getElementById("password-input").value.trim();

  // Campos vacíos
  if (!email || !password) {
    alert("Por favor completá todos los campos.");
    return;
  }

  // Buscar usuario en localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  const usuario = usuarios.find((u) => u.email === email);

  // Email no existe
  if (!usuario) {
    alert("No existe una cuenta con ese Gmail.");
    return;
  }

  // Cuenta no verificada
  if (!usuario.verificado) {
    alert(
      "Tu cuenta todavía no fue verificada. Revisá tu código de verificación.",
    );
    return;
  }

  // Contraseña incorrecta
  if (usuario.password !== password) {
    alert("Contraseña incorrecta. Intentá de nuevo.");
    return;
  }

  // Login exitoso: guardar sesión y redirigir
  localStorage.setItem(
    "sesionActiva",
    JSON.stringify({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
    }),
  );

  window.location.href = "../principal/index.html";
});
