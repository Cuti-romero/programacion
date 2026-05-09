const inputs = document.querySelectorAll(".codigo-input");
const errorEl = document.getElementById("verify-error");

// Auto-avance, retroceso y pegado
inputs.forEach((input, i) => {
  input.addEventListener("input", (e) => {
    const val = e.target.value.replace(/\D/g, "");
    e.target.value = val;

    e.target.classList.toggle("filled", val !== "");
    e.target.classList.remove("error-box");
    errorEl.textContent = "";

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

  // Soporte para pegar el código completo de 4 dígitos
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

// Submit
document.getElementById("form-verificacion").addEventListener("submit", (e) => {
  e.preventDefault();

  const codigoIngresado = [...inputs].map((inp) => inp.value).join("");

  if (codigoIngresado.length < 4) {
    errorEl.textContent = "Ingresá los 4 dígitos del código.";
    inputs.forEach((inp) => inp.classList.add("error-box"));
    return;
  }

  const emailPendiente = localStorage.getItem("emailPendiente");
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  const index = usuarios.findIndex((u) => u.email === emailPendiente);

  if (index === -1) {
    errorEl.textContent = "No se encontró el usuario.";
    return;
  }

  if (String(usuarios[index].codigo) !== codigoIngresado) {
    errorEl.textContent = "Código incorrecto. Intentá de nuevo.";
    inputs.forEach((inp) => inp.classList.add("error-box"));
    return;
  }

  usuarios[index].verificado = true;
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.removeItem("emailPendiente");

  alert("¡Verificación exitosa! Ya podés iniciar sesión.");
  window.location.href = "../login/login.html";
});

// Reenviar (simulado)
document.getElementById("btn-reenviar").addEventListener("click", (e) => {
  e.preventDefault();
  const emailPendiente = localStorage.getItem("emailPendiente");
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  const usuario = usuarios.find((u) => u.email === emailPendiente);

  if (usuario) {
    alert(`Tu código es: ${usuario.codigo}`);
  } else {
    errorEl.textContent = "No hay ningún registro pendiente.";
  }
});
