import { layout } from "../render/layout.js";
import { getState } from "../state.js";

export function renderIteraciones(){
  const st = getState();

  layout(`
    <div class="card pad">
      <h1 class="h1">Iteraciones (4)</h1>
      <div class="muted">Cada iteración recorre planificación, diseño, coding y testing.</div>
      <hr class="sep" />

      <table class="table">
        <thead>
          <tr><th>Iteración</th><th>Fecha</th><th>Objetivo</th><th>Historias</th><th class="right">Avance</th></tr>
        </thead>
        <tbody>
          ${st.iteraciones.map(it => iterRow(it, st)).join("")}
        </tbody>
      </table>

      <div class="small muted">Tip: el profe quiere ver evidencias por fase dentro de cada iteración.</div>
    </div>
  `);
}

function iterRow(it, st){
  const stories = st.historias.filter(h=>h.iteracion===it.id);
  const done = stories.filter(s=>s.estado==="completado").length;
  const total = stories.length || 1;
  const pct = Math.round(done/total*100);

  return `
    <tr>
      <td><b>${it.nombre}</b></td>
      <td>${iterDate(it.id)}</td>
      <td>${it.objetivo}</td>
      <td>${stories.map(s=>s.id).join(", ") || "—"}</td>
      <td class="right">${pct}%</td>
    </tr>
  `;
}

function iterDate(id){
  if(id==="it1") return "27 de diciembre 2025";
  if(id==="it2") return "28 de diciembre 2025";
  if(id==="it3") return "3 de enero 2026";
  if(id==="it4") return "4 de enero 2026";
  return "";
}
