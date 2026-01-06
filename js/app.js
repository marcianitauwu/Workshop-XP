import { ensureSeed, getState, saveState } from "./state.js";
import { render, navigate } from "./router.js";
import { isAuthed, seedUsersIfEmpty } from "./auth.js";
import { seed } from "../data/seed.js";
import { renderLogin } from "./pages/login.js";
import { Modal } from "./modal.js";

ensureSeed();
seedUsersIfEmpty(seed.usersAuth);

// Tema (modo claro rápido)
const theme = localStorage.getItem("xp_settings_theme") || "dark";
document.body.style.filter = theme==="light" ? "invert(1) hue-rotate(180deg)" : "none";

// Event delegation global para "Nueva Tarea"
document.addEventListener("click", (e)=>{
  const btn = e.target.closest("#newBtn");
  if(btn) openNewTask();
});

if(!isAuthed()){
  renderLogin();
}else{
  // Asegura ruta inicial
  if(!location.hash) location.hash = "#/home";
  render();
}

function openNewTask(){
  const st = getState();
  Modal.open({
    title:"Nueva Tarea / Evidencia",
    bodyHtml: `
      <div class="formGrid">
        <div class="field">
          <label>Tipo</label>
          <select id="ntType" class="select">
            <option value="practica">Práctica (fase)</option>
            <option value="historia">Historia de usuario</option>
          </select>
        </div>
        <div class="field">
          <label>Destino</label>
          <select id="ntDest" class="select">
            ${st.fases.map(f=>`<option value="fase:${f.id}">${f.nombre}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label>Nombre</label>
          <input id="ntName" placeholder="Ej: Prototipo UI / Diagrama ER / Video de Planning..." />
        </div>
        <div class="field">
          <label>Estado</label>
          <select id="ntState" class="select">
            <option value="pendiente">Pendiente</option>
            <option value="en-progreso">En progreso</option>
            <option value="completado">Completado</option>
          </select>
        </div>
        <div class="field">
          <label>Rol responsable</label>
          <select id="ntRol" class="select">
            <option>Product Owner</option>
            <option>Developer</option>
            <option>Coach</option>
            <option>Tester</option>
          </select>
        </div>
        <div class="field">
          <label>Pair (2 personas)</label>
          <select id="ntA" class="select">${st.equipo.filter(e=>e.rol!=="Profesor").map(e=>`<option value="${e.id}">${e.nombre}</option>`).join("")}</select>
          <div style="height:8px"></div>
          <select id="ntB" class="select">${st.equipo.filter(e=>e.rol!=="Profesor").map(e=>`<option value="${e.id}">${e.nombre}</option>`).join("")}</select>
        </div>
        <div class="field">
          <label>Artefacto / Resultado</label>
          <input id="ntArte" placeholder="Ej: Diagrama de clases (PDF)" />
        </div>
        <div class="field">
          <label>Evidencia (link video)</label>
          <input id="ntEvi" placeholder="https://drive.google.com/..." />
        </div>
      </div>
      <div class="small muted" style="margin-top:10px">
        Se guarda en <b>localStorage</b> del navegador.
      </div>
    `,
    onSave: ()=>{
      const type = document.getElementById("ntType").value;
      const dest = document.getElementById("ntDest").value;
      const name = document.getElementById("ntName").value.trim();
      const state = document.getElementById("ntState").value;
      const rol = document.getElementById("ntRol").value;
      const a = document.getElementById("ntA").value;
      const b = document.getElementById("ntB").value;
      const arte = document.getElementById("ntArte").value.trim();
      const evi = document.getElementById("ntEvi").value.trim();
      if(!name) throw new Error("Nombre requerido");
      if(a===b) throw new Error("El pair debe ser de 2 personas distintas");

      const id = "t" + Math.random().toString(16).slice(2,8);

      if(type==="practica"){
        const faseId = dest.split(":")[1];
        const f = st.fases.find(x=>x.id===faseId);
        if(!f) throw new Error("Fase inválida");
        f.practicas.push({ id, nombre:name, estado:state, rol, pair:[a,b], artefacto:arte, evidencia:evi });
      }else{
        st.historias.push({
          id: "US-" + String(st.historias.length+1).padStart(3,"0"),
          titulo: name,
          prioridad: "media",
          puntos: 3,
          iteracion: "it1",
          estado: state,
          asignados:[a,b],
          descripcion: "Historia creada desde el dashboard."
        });
      }

      saveState(st);
      render();
      return true;
    }
  });
}
