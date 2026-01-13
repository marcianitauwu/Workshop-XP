import { layout } from "../render/layout.js";
import { getState } from "../state.js";

export function renderVelocidad(){
  const st = getState();

  layout(`
    <div class="card-pad">
      <h1 class="h1">Velocidad del proyecto</h1>
      <div class="muted">Velocidad por iteración — puntos completados y promedio.</div>
      <hr class="sep" />
       
      <table class="table">
        <thead>
          <tr><th>Iteración</th><th>Fecha</th><th>Historias Completas</th><th>Puntos por historias</th><th>Velocidad Total</th></tr>
        </thead>
        <tbody>
          ${st.iteraciones.map(it => iterRow(it, st)).join("")}
        </tbody>
      </table>
       <div>Consulta la página de Métricas para un resumen o revisa las iteraciones para ver objetivos y progreso.</div>
      </div>

  `);
}

function iterRow(it, st){
  const stories = st.historias.filter(h => h.iteracion === it.id);
  const completedStories = stories.filter(s => s.estado === "completado");

  const puntosPorHistoria = completedStories.length > 0
    ? completedStories.map(s => `${s.puntos} pts`).join(" + ")
    : "—";

  const velocidadTotal = completedStories.reduce((sum, s) => sum + (s.puntos || 0), 0);

  return `
    <tr>
      <td><b>${it.nombre}</b></td>
      <td>${iterDate(it.id)}</td>
      <td>${completedStories.map(s => s.id).join(" + ") || "—"}</td>
      <td>${puntosPorHistoria}</td>
      <td class="right">${velocidadTotal} puntos</td>
    </tr>
  `;
}
function iterDate(id){
  if(id==="it1") return "09 de enero 2026";
  if(id==="it2") return "10 de enero 2026";
  if(id==="it3") return "11 de enero 2026";
  if(id==="it4") return "12 de enero 2026";
  return "";
}
