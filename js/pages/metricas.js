import { layout } from "../render/layout.js";
import { getState } from "../state.js";

export function renderMetricas(){
  const st = getState();
  const totals = storyTotals(st);
  const velocity = velocityByIteration(st);

  layout(`
    <div class="row">
      <div class="col">
        <div class="card pad">
          <h1 class="h1">Métricas (simple)</h1>
          <div class="muted">Suficiente para XP en este workshop: velocidad por iteración y estado de historias.</div>
          <hr class="sep" />
          <div class="grid4">
            ${metricMini("Historias", `${totals.total}`)}
            ${metricMini("Completadas", `${totals.done}`)}
            ${metricMini("En progreso", `${totals.progress}`)}
            ${metricMini("Pendientes", `${totals.pending}`)}
          </div>
        </div>
      </div>
    </div>

    <div style="height:14px"></div>

    <div class="card pad">
      <h2 class="h2">Velocidad por iteración (puntos completados)</h2>
      <div class="muted small">Cuando marques historias como completadas, esto se actualiza.</div>
      <hr class="sep" />
      <table class="table">
        <thead><tr><th>Iteración</th><th>Puntos completados</th><th class="right">Historias completadas</th></tr></thead>
        <tbody>
          ${velocity.map(v=>`
            <tr>
              <td><b>${v.iter}</b></td>
              <td>${v.points}</td>
              <td class="right">${v.done}/${v.total}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `);
}

function metricMini(label, value){
  return `
    <div class="phaseCard">
      <div class="h3">${label}</div>
      <div style="height:8px"></div>
      <div class="h1">${value}</div>
    </div>
  `;
}

function storyTotals(st){
  const total = st.historias.length;
  const done = st.historias.filter(h=>h.estado==="completado").length;
  const progress = st.historias.filter(h=>h.estado==="en-progreso").length;
  const pending = st.historias.filter(h=>h.estado==="pendiente").length;
  return {total,done,progress,pending};
}

function velocityByIteration(st){
  return st.iteraciones.map(it=>{
    const hs = st.historias.filter(h=>h.iteracion===it.id);
    const doneHs = hs.filter(h=>h.estado==="completado");
    const points = doneHs.reduce((a,h)=>a+(h.puntos||0),0);
    return { iter: it.nombre, points, done: doneHs.length, total: hs.length };
  });
}
