import { layout } from "../render/layout.js";
import { getState, saveState } from "../state.js";
import { Modal } from "../modal.js";

export function renderHistorias(){
  const st = getState();
  const it = currentIter(st);
  const q = (new URL(location.href)).searchParams.get("q") || "";

  layout(`
    <div class="card pad">
      <div class="row" style="align-items:flex-end">
        <div class="col">
          <h1 class="h1">Historias de Usuario</h1>
          <div class="muted">Agrupadas por iteración con story points, prioridad y pair (2 personas).</div>
        </div>
        <div class="col" style="text-align:right">
          <button class="btn good" id="editStoryBtn">Editar estado de historia</button>
        </div>
      </div>

      <div style="height:12px"></div>
      <div class="searchRow">
        <select class="select" id="iterSelect">
          <option value="all">Todas</option>
          ${st.iteraciones.map(x=>`<option value="${x.id}">${x.nombre}</option>`).join("")}
        </select>
        <input class="search" id="search" placeholder="Buscar historias..." value="${escapeHtml(q)}" />
        <button class="btn" id="searchBtn">Buscar</button>
      </div>

      <hr class="sep" />
      <div class="cards">
        ${filterStories(st.historias, it, q).map(s=>storyCard(s, st)).join("")}
      </div>
    </div>
  `);

  const iterSelect = document.getElementById("iterSelect");
  iterSelect.value = it;
  iterSelect.addEventListener("change", ()=>{
    const url = new URL(location.href);
    url.searchParams.set("it", iterSelect.value);
    history.replaceState({}, "", url);
    location.hash = "#/historias";
    location.reload();
  });

  document.getElementById("searchBtn")?.addEventListener("click", ()=>{
    const url = new URL(location.href);
    url.searchParams.set("q", document.getElementById("search").value.trim());
    history.replaceState({}, "", url);
    location.hash = "#/historias";
    location.reload();
  });

  document.getElementById("editStoryBtn")?.addEventListener("click", ()=>{
    Modal.open({
      title:"Actualizar historia",
      bodyHtml: storyForm(st),
      onSave: ()=>storySave(st)
    });
  });
}

function currentIter(st){
  const url = new URL(location.href);
  return url.searchParams.get("it") || "all";
}

function filterStories(stories, iter, q){
  const qq = q.trim().toLowerCase();
  return stories
    .filter(s => iter==="all" ? true : s.iteracion===iter)
    .filter(s => !qq ? true : (s.titulo+s.descripcion+s.id).toLowerCase().includes(qq));
}

function storyCard(s, st){
  const prBadge = s.prioridad==="alta" ? "bad" : s.prioridad==="media" ? "warn" : "good";
  const stBadge = s.estado==="completado" ? "good" : s.estado==="en-progreso" ? "warn" : "bad";
  const itName = st.iteraciones.find(i=>i.id===s.iteracion)?.nombre ?? s.iteracion;
  const pair = (s.asignados||[]).map(id=>st.equipo.find(e=>e.id===id)?.nombre ?? id).join(" + ");

  return `
    <div class="story">
      <div class="storyTop">
        <div>
          <div class="storyId">${s.id}</div>
          <div class="storyTitle">${escapeHtml(s.titulo)}</div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end">
          <span class="badge ${prBadge}">${s.prioridad}</span>
          <span class="badge ${stBadge}">${labelEstado(s.estado)}</span>
        </div>
      </div>
      <div class="storyDesc">${escapeHtml(s.descripcion)}</div>
      <div class="storyBottom">
        <span>🔁 ${escapeHtml(itName)}</span>
        <span>⭐ ${s.puntos} pts</span>
        <span>👥 ${escapeHtml(pair || "—")}</span>
      </div>
    </div>
  `;
}

function labelEstado(e){
  if(e==="completado") return "completado";
  if(e==="en-progreso") return "en-progreso";
  return "pendiente";
}

function storyForm(st){
  return `
    <div class="formGrid">
      <div class="field">
        <label>Historia</label>
        <select id="storyId" class="select">
          ${st.historias.map(h=>`<option value="${h.id}">${h.id} — ${escapeHtml(h.titulo)}</option>`).join("")}
        </select>
      </div>
      <div class="field">
        <label>Estado</label>
        <select id="storyEstado" class="select">
          <option value="pendiente">Pendiente</option>
          <option value="en-progreso">En progreso</option>
          <option value="completado">Completado</option>
        </select>
      </div>
      <div class="field">
        <label>Iteración</label>
        <select id="storyIter" class="select">
          ${st.iteraciones.map(i=>`<option value="${i.id}">${i.nombre}</option>`).join("")}
        </select>
      </div>
      <div class="field">
        <label>Pair (2 personas)</label>
        <select id="storyPairA" class="select">${st.equipo.filter(e=>e.id!=="u6").map(e=>`<option value="${e.id}">${e.nombre}</option>`).join("")}</select>
        <div style="height:8px"></div>
        <select id="storyPairB" class="select">${st.equipo.filter(e=>e.id!=="u6").map(e=>`<option value="${e.id}">${e.nombre}</option>`).join("")}</select>
      </div>
    </div>
  `;
}

function storySave(st){
  const id = document.getElementById("storyId").value;
  const estado = document.getElementById("storyEstado").value;
  const iter = document.getElementById("storyIter").value;
  const a = document.getElementById("storyPairA").value;
  const b = document.getElementById("storyPairB").value;
  if(a===b) throw new Error("El pair debe ser de 2 personas distintas");

  const h = st.historias.find(x=>x.id===id);
  if(!h) return false;
  h.estado = estado;
  h.iteracion = iter;
  h.asignados = [a,b];

  saveState(st);
  location.hash = "#/historias";
  return true;
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}
