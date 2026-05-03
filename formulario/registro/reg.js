document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const email = document.getElementById("logemail").value.trim();
  const password = document.getElementById("logpass").value.trim();

  // Validación básica
  if (!nombre || !apellido || !email || !password) {
    alert("Por favor completá todos los campos.");
    return;
  }

  // Generar código de 4 dígitos aleatorio
  const codigo = Math.floor(1000 + Math.random() * 9000);

  // Guardar usuario Y código en localStorage
  const usuario = { nombre, apellido, email, password, codigo };
  localStorage.setItem("usuarioRegistrado", JSON.stringify(usuario));

  // Mostrar el código al usuario
  alert(`Tu código de verificación es: ${codigo}`);

  // Redirigir a verificación
  window.location.href = "../verificacion/verificacion.html";
});
