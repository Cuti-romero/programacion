// ── Cuadritos de código (igual que verificacion.js)
const inputs = document.querySelectorAll(".codigo-input");

inputs.forEach((input, i) => {
  input.addEventListener("input", (e) => {
    const val = e.target.value.replace(/\D/g, "");
    e.target.value = val;
    input.classList.toggle("filled", val !== "");
    input.classList.remove("error-box");
    document.getElementById("verify-error").textContent = "";

    if (val && i < inputs.length - 1) {
      inputs[i + 1].focus();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !input.value && i > 0) {
      inputs[i - 1].focus();
      inputs[i - 1].value = "";
      inputs[i - 1].classList.remove("filled");
    }
  });

  input.addEventListener("paste", (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    pasted.split("").forEach((char, j) => {
      if (inputs[j]) {
        inputs[j].value = char;
        inputs[j].classList.add("filled");
      }
    });
    const nextEmpty = [...inputs].findIndex((inp) => !inp.value);
    if (nextEmpty !== -1) inputs[nextEmpty].focus();
    else inputs[3].focus();
  });
});

// ── Submit
document.getElementById("form-nueva").addEventListener("submit", function (e) {
  e.preventDefault();

  const codigo = [...inputs].map((inp) => inp.value).join("");
  const nuevaPass = document.getElementById("nueva-pass").value;
  const confirmar = document.getElementById("confirmar-pass").value;
  const verifyEl = document.getElementById("verify-error");
  const errorEl = document.getElementById("nueva-error");

  // Limpiar errores previos
  verifyEl.textContent = "";
  errorEl.textContent = "";

  // Código incompleto
  if (codigo.length < 4) {
    verifyEl.textContent = "Ingresá los 4 dígitos del código.";
    inputs.forEach((inp) => inp.classList.add("error-box"));
    return;
  }

  // Campos de contraseña vacíos
  if (!nuevaPass || !confirmar) {
    errorEl.textContent = "Completá los campos de contraseña.";
    return;
  }

  // Longitud mínima
  if (nuevaPass.length < 6) {
    errorEl.textContent = "La contraseña debe tener al menos 6 caracteres.";
    return;
  }

  // Contraseñas coinciden
  if (nuevaPass !== confirmar) {
    errorEl.textContent = "Las contraseñas no coinciden.";
    return;
  }

  // Buscar usuario
  const emailRecuperacion = localStorage.getItem("emailRecuperacion");
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  const index = usuarios.findIndex((u) => u.email === emailRecuperacion);

  if (index === -1) {
    errorEl.textContent =
      "No se encontró el usuario. Volvé a intentar desde el inicio.";
    return;
  }

  // Verificar código
  if (String(usuarios[index].codigoRecuperacion) !== codigo) {
    verifyEl.textContent = "Código incorrecto. Intentá de nuevo.";
    inputs.forEach((inp) => inp.classList.add("error-box"));
    return;
  }

  // Actualizar contraseña y limpiar
  usuarios[index].password = nuevaPass;
  usuarios[index].codigoRecuperacion = null;
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.removeItem("emailRecuperacion");

  alert("¡Contraseña cambiada exitosamente! Ya podés iniciar sesión.");
  window.location.href = "../login/login.html";
});
// SVG del ojo abierto
const eyeOpen = `
  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
  <circle cx="12" cy="12" r="3"/>
`;

// SVG del ojo tachado (oculto)
const eyeClosed = `
  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
  <line x1="1" y1="1" x2="23" y2="23"/>
`;

// Función reutilizable para cada par botón/input
function togglePassword(btnId, inputId, iconId) {
  const btn   = document.getElementById(btnId);
  const input = document.getElementById(inputId);
  const icon  = document.getElementById(iconId);

  if (!btn || !input || !icon) return;

  btn.addEventListener("click", () => {
    const esPassword = input.type === "password";

    // Cambiar tipo del input
    input.type = esPassword ? "text" : "password";

    // Cambiar ícono
    icon.innerHTML = esPassword ? eyeClosed : eyeOpen;

    // Cambiar color del botón para indicar estado
    btn.style.color = esPassword ? "#900D1F" : "#80808A";
  });
}

// Aplicar a cada campo
togglePassword("eye-nueva",     "nueva-pass",    "icon-nueva");
togglePassword("eye-confirmar", "confirmar-pass", "icon-confirmar");