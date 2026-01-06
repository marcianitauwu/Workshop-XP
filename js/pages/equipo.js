import { layout } from "../render/layout.js";
import { getState, saveState } from "../state.js";
import { Modal } from "../modal.js";

export function renderEquipo(){
  const st = getState();

  layout(`
    <div class="card pad">
      <div class="row" style="align-items:flex-end">
        <div class="col">
          <h1 class="h1">Equipo y roles XP</h1>
          <div class="muted">El dashboard debe mostrar quién hace qué (rol) y el trabajo en pares.</div>
        </div>
        <div class="col" style="text-align:right">
          <button class="btn good" id="editTeamBtn">Editar nombres / cédulas</button>
        </div>
      </div>
      <hr class="sep" />

      <table class="table">
        <thead><tr><th>Rol</th><th>Nombre</th><th>Cédula</th></tr></thead>
        <tbody>
          ${st.equipo.map(e=>`
            <tr><td><b>${e.rol}</b></td><td>${e.nombre}</td><td class="mono">${e.cedula}</td></tr>
          `).join("")}
        </tbody>
      </table>

      <hr class="sep" />
      <div class="small muted">
        Requisito del PDF: autenticación para todos los integrantes + profesor (patmic/123) con 3 intentos.
      </div>
    </div>
  `);

  document.getElementById("editTeamBtn")?.addEventListener("click", ()=>{
    Modal.open({
      title:"Editar equipo",
      bodyHtml: teamForm(st),
      onSave: ()=>teamSave(st)
    });
  });
}

function teamForm(st){
  return `
    <div class="field">
      <label>Editar rápido (JSON)</label>
      <textarea id="teamJson">${escapeHtml(JSON.stringify(st.equipo, null, 2))}</textarea>
      <div class="small muted">Consejo: cambia Integrante 1..5 por nombres reales y cédulas reales.</div>
    </div>
  `;
}

function teamSave(st){
  const raw = document.getElementById("teamJson").value;
  let arr;
  try{ arr = JSON.parse(raw); }catch{ throw new Error("JSON inválido"); }
  if(!Array.isArray(arr) || arr.length<2) throw new Error("Debe ser un array con el equipo");
  st.equipo = arr;
  saveState(st);
  location.hash = "#/equipo";
  return true;
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}
