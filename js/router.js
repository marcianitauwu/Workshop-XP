import { renderHome } from "./pages/home.js";
import { renderFases } from "./pages/fases.js";
import { renderHistorias } from "./pages/historias.js";
import { renderIteraciones } from "./pages/iteraciones.js";
import { renderEquipo } from "./pages/equipo.js";
import { renderMetricas } from "./pages/metricas.js";
import { renderWorkshop } from "./pages/workshop.js";

const routes = {
  home: renderHome,
  fases: renderFases,
  historias: renderHistorias,
  iteraciones: renderIteraciones,
  equipo: renderEquipo,
  metricas: renderMetricas,
  workshop: renderWorkshop
};

export function navigate(to){
  const url = new URL(location.href);
  url.hash = `#/${to}`;
  history.replaceState({}, "", url);
  render();
}

export function currentRoute(){
  const h = location.hash || "#/home";
  const m = h.match(/^#\/([^?]+)/);
  return (m && m[1]) ? m[1] : "home";
}

export function render(){
  const route = currentRoute();
  const fn = routes[route] || routes.home;
  fn();
}

window.addEventListener("hashchange", render);
