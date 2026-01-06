import { layout } from "../render/layout.js";
import { getState, saveState } from "../state.js";
import { Modal } from "../modal.js";

export function renderFases(){
  const st = getState();

  layout(`
    <div class="card pad">
      <div class="row" style="align-items:flex-end">
        <div class="col">
          <h1 class="h1">Fases XP — Detalle completo</h1>
          <div class="muted">Incluye prácticas, responsable/rol, pairing (2 personas), artefacto y evidencia (video).</div>
        </div>
        <div class="col" style="text-align:right">
          <button class="btn good" id="bulkComplete">Marcar una práctica como completada</button>
        </div>
      </div>
      <hr class="sep" />

      <div class="grid4">
        ${st.fases.map(f=>phaseCard(f, st.equipo)).join("")}
      </div>
    </div>
  `);

  document.getElementById("bulkComplete")?.addEventListener("click", ()=>{
    Modal.open({
      title:"Actualizar estado de práctica",
      bodyHtml: bulkForm(st),
      onSave: ()=>bulkSave(st)
    });
  });
}

function phaseCard(fase, equipo){
  const total = fase.practicas.length;
  const done = fase.practicas.filter(p=>p.estado==="completado").length;
  const pct = total?Math.round(done/total*100):0;
  const status = pct===100 ? "good" : pct>=50 ? "warn" : "bad";

  return `
  <div class="phaseCard">
    <div class="phaseTop">
      <div>
        <div class="h2">${fase.nombre}</div>
        <div class="small muted">${fase.semana}</div>
      </div>
      <span class="badge ${status}">${pct}%</span>
    </div>

    <div class="progressWrap">
      <div class="progressBar"><div class="progressFill" style="width:${pct}%"></div></div>
      <div class="progressMeta"><span>${done} de ${total} prácticas</span><span>${pct}%</span></div>
    </div>

    <div style="height:8px"></div>
    ${fase.practicas.map(p=>practiceCard(p, equipo)).join("")}
  </div>`;
}

function nameById(equipo, id){ return equipo.find(e=>e.id===id)?.nombre ?? id; }

function practiceCard(p, equipo){
  const badge = p.estado==="completado" ? "good" : p.estado==="en-progreso" ? "warn" : "bad";
  const estadoLabel = p.estado==="completado" ? "Completado" : p.estado==="en-progreso" ? "En progreso" : "Pendiente";
  const pair = (p.pair||[]).map(id=>nameById(equipo,id)).join(" + ");
  return `
    <div class="practice">
      <div class="practiceTitle">
        <div><b>${p.nombre}</b></div>
        <span class="badge ${badge}">${estadoLabel}</span>
      </div>
      <div class="kv">
        <b>Rol</b><div>${p.rol}</div>
        <b>Pair</b><div>${pair || "—"}</div>
        <b>Artefacto</b><div>${p.artefacto || "—"}</div>
        <b>Evidencia</b><div>${p.evidencia ? `<a href="${p.evidencia}" target="_blank" rel="noreferrer">Ver video</a>` : "Pendiente"}</div>
      </div>
      <div class="chips">
        ${(p.tags||[]).map(t=>`<span class="chip">${t}</span>`).join("")}
      </div>
    </div>
  `;
}

function bulkForm(st){
  const options = st.fases.flatMap(f => f.practicas.map(p => ({ faseId:f.id, practicaId:p.id, label:`${f.nombre} — ${p.nombre}` })));
  return `
    <div class="formGrid">
      <div class="field">
        <label>Práctica</label>
        <select id="bulkPractice" class="select">
          ${options.map(o=>`<option value="${o.faseId}::${o.practicaId}">${o.label}</option>`).join("")}
        </select>
      </div>
      <div class="field">
        <label>Estado</label>
        <select id="bulkState" class="select">
          <option value="pendiente">Pendiente</option>
          <option value="en-progreso">En progreso</option>
          <option value="completado">Completado</option>
        </select>
      </div>
      <div class="field">
        <label>Evidencia (link video)</label>
        <input id="bulkEvidence" placeholder="https://drive.google.com/..." />
      </div>
      <div class="field">
        <label>Artefacto / resultado</label>
        <input id="bulkArtefacto" placeholder="Ej: Diagrama de clases (PDF)" />
      </div>
    </div>
    <div class="small muted" style="margin-top:10px">
      Tip XP: siempre asigna <b>2 personas</b> (pair programming) en actividades de desarrollo.
    </div>
  `;
}

function bulkSave(st){
  const raw = document.getElementById("bulkPractice").value;
  const [faseId, practicaId] = raw.split("::");
  const estado = document.getElementById("bulkState").value;
  const evidencia = document.getElementById("bulkEvidence").value.trim();
  const artefacto = document.getElementById("bulkArtefacto").value.trim();

  const f = st.fases.find(x=>x.id===faseId);
  const p = f?.practicas.find(x=>x.id===practicaId);
  if(!p) return false;
  p.estado = estado;
  if(evidencia) p.evidencia = evidencia;
  if(artefacto) p.artefacto = artefacto;

  saveState(st);
  location.hash = "#/fases";
  return true;
}
