const temaOscuro = {
  "--bg-main": "#1F242B",
  "--bg-header": "#2B3137",
  "--bg-footer": "#d3dade",
  "--color-h1": "#e5dfd8",
  "--color-link": "#2B3137",
};

const temaClaro = {
    "--bg-main": "#F4F7F9",
    "--bg-header": "#DDE4E8",
    "--bg-footer": "#2B3137",
    "--color-h1": "#1F242B",
    "--color-link": "#434952",
    "--color-text": "#333942"
};

let oscuro = true;

function invertirColores() {
  const tema = oscuro ? temaClaro : temaOscuro;
  const root = document.documentElement;

  Object.entries(tema).forEach(([variable, valor]) => {
    root.style.setProperty(variable, valor);
  });

  oscuro = !oscuro;
  document.getElementById("btnInvertir").textContent = oscuro
    ? "claro"
    : "oscuro";
};