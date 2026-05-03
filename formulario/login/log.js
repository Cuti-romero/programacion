document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("logemail").value.trim();
  const password = document.getElementById("logpass").value.trim();

  const usuario = JSON.parse(localStorage.getItem("usuarioRegistrado"));

  if (!usuario) {
    alert("No hay usuarios registrados.");
    return;
  }

  if (!usuario.verificado) {
    alert("Tu cuenta no está verificada.");
    return;
  }

  if (usuario.email === email && usuario.password === password) {
    window.location.href = "../principal/index.html";
  } else {
    alert("Email o contraseña incorrectos.");
  }
});