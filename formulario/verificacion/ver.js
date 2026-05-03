const usuario = JSON.parse(localStorage.getItem("usuarioRegistrado"));

if (!usuario) {
  alert("No hay ningún registro pendiente.");
  window.location.href = "../login/log.html";
}

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const codigoIngresado = parseInt(
    document.getElementById("verificacion").value.trim(),
  );

  if (codigoIngresado === usuario.codigo) {
    usuario.verificado = true;
    localStorage.setItem("usuarioRegistrado", JSON.stringify(usuario));
    window.location.href = "../login/login.html";
  } else {
    alert("Código inválido. Intentá de nuevo.");
  }
});