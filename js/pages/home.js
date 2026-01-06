import { layout } from "../render/layout.js";
import { getState } from "../state.js";

export function renderHome(){
  const st = getState();
  const done = countDone(st.fases);
  const total = countTotal(st.fases);

  layout(`
    <div class="row">
      <div class="col">
        <div class="card pad">
          <h1 class="h1">Línea de tiempo XP</h1>
          <div class="muted">Un solo escenario de navegación para mostrar cómo avanzan por fases, iteraciones, roles y evidencias.</div>
          <hr class="sep" />
          <div class="grid4">
            ${st.fases.map(f=>phaseMini(f)).join("")}
          </div>
        </div>
      </div>
    </div>

    <div style="height:14px"></div>

    <div class="row">
      <div class="col">
        <div class="card pad">
          <h2 class="h2">Estado del proyecto</h2>
          <div class="muted small">Prácticas completadas: <b>${done}</b> de <b>${total}</b></div>
          <div class="progressWrap">
            <div class="progressBar"><div class="progressFill" style="width:${total?Math.round(done/total*100):0}%"></div></div>
            <div class="progressMeta">
              <span>Avance total</span>
              <span>${total?Math.round(done/total*100):0}%</span>
            </div>
          </div>

          <hr class="sep" />
          <div class="small muted">
            Recomendación: agrega evidencias (links a videos) en cada práctica usando <b>Nueva Tarea</b>.
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card pad">
          <h2 class="h2">Próximos eventos (sugeridos)</h2>
          <table class="table">
            <thead><tr><th>Hora</th><th>Evento</th></tr></thead>
            <tbody>
              <tr><td>09:00</td><td>Daily Standup (10 min)</td></tr>
              <tr><td>Viernes</td><td>Planning Game</td></tr>
              <tr><td>Fin iteración</td><td>Retrospectiva</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `);
}

function phaseMini(f){
  const {done,total,pct} = phaseProgress(f);
  const status = pct===100 ? "good" : pct>=50 ? "warn" : "bad";
  return `
    <div class="phaseCard">
      <div class="phaseTop">
        <div>
          <div class="h3">${f.nombre}</div>
          <div class="small muted">${f.semana}</div>
        </div>
        <span class="badge ${status}">${pct}%</span>
      </div>
      <div class="progressWrap">
        <div class="progressBar"><div class="progressFill" style="width:${pct}%"></div></div>
        <div class="progressMeta"><span>${done} / ${total} prácticas</span><span>${pct}%</span></div>
      </div>
    </div>
  `;
}

function phaseProgress(f){
  const total = f.practicas.length;
  const done = f.practicas.filter(p=>p.estado==="completado").length;
  const pct = total?Math.round(done/total*100):0;
  return {done,total,pct};
}

function countDone(fases){ return fases.reduce((acc,f)=>acc+f.practicas.filter(p=>p.estado==="completado").length,0); }
function countTotal(fases){ return fases.reduce((acc,f)=>acc+f.practicas.length,0); }
