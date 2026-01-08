import { icons } from "../icons.js";
import { navigate, currentRoute } from "../router.js";
import { logout, getSession } from "../auth.js";
import { Storage } from "../storage.js";

export function setTheme(theme){
  Storage.save("xp_settings_theme", theme);
  document.documentElement.dataset.theme = theme;
}

export function getTheme(){
  return Storage.load("xp_settings_theme", "dark");
}

export function layout(contentHtml){
  const route = currentRoute();
  const theme = getTheme();
  const session = getSession();

  const navItems = [
    { id:"home", label:"Línea de tiempo" },
    { id:"fases", label:"Fases XP" },
    { id:"iteraciones", label:"Iteraciones" },
    { id:"equipo", label:"Equipo" },
    { id:"metricas", label:"Métricas" },
    { id:"workshop", label:"AntCiberDron" }
  ];

  // Sidebar incluido de forma global en el layout principal (siempre visible)
  const sidebarHtml = `
    <aside class="sidebar-left">
      <div class="card-pad card">
        <div class="h2">Fases</div>
        <div class="muted">Visualiza el flujo del proyecto</div>
        <hr class="sep" />
        <div class="sideList">
          <div class="sideItem ${route==="planning"?"active":""}" data-phase="planning">Planning</div>
          <div class="sideItem ${route==="fases"?"active":""}" data-phase="design">Design</div>
          <div class="sideItem ${route==="home"?"active":""}" data-phase="coding">Coding</div>
          <div class="sideItem" data-phase="testing">Testing</div>
        </div>
      </div>
    </aside>`;

  const bodyHtml = `
    <div class="twoCol">
      ${sidebarHtml}
      <main class="main-content">
        ${contentHtml}
      </main>
    </div>`;

  const nav = `
  <div class="nav">
    <div class="container navInner">
      <div class="brand">
        <div class="brandLogo">🐜</div>
        <div>
          <div class="brandTitle">Roadmap XP</div>
          <div class="small muted">AntCiberDron — Workshop</div>
        </div>
      </div>

      <div class="pills" role="navigation" aria-label="Secciones">
        ${navItems.map(i => `
          <div class="pill ${route===i.id?"active":""}" data-nav="${i.id}">
            ${labelIcon(i.id)} <span>${i.label}</span>
          </div>
        `).join("")}
      </div>

      <div class="actions">
        <button class="btn" id="themeBtn" title="Tema">
          ${theme==="dark"?icons.moon:icons.sun}
        </button>
        <button class="btn primary" id="newBtn">${icons.plus} Nueva Tarea</button>
        <button class="btn" id="logoutBtn">${icons.logout}</button>
      </div>
    </div>
  </div>

  <div class="container">
    ${session?`<div class="small muted" style="margin:10px 0 0 0">Sesión: <b>${escapeHtml(session.nombre)}</b> — ${escapeHtml(session.rol)}</div>`:""}
    <div style="height:10px"></div>
    ${bodyHtml}
  </div>
  ${modalHtml()}
  `;

  // Mount + bind events
  const app = document.getElementById("app");
  app.innerHTML = nav;

  // Bind nav
  document.querySelectorAll("[data-nav]").forEach(el=>{
    el.addEventListener("click", ()=>navigate(el.dataset.nav));
  });

  document.getElementById("logoutBtn")?.addEventListener("click", ()=>{
    logout(); location.reload();
  });

  document.getElementById("themeBtn")?.addEventListener("click", ()=>{
    const next = getTheme()==="dark" ? "light" : "dark";
    setTheme(next);
    document.body.style.filter = next==="light" ? "invert(1) hue-rotate(180deg)" : "none";
  });

  // Sidebar (fases) click handling — existe siempre en el layout principal
  document.querySelectorAll('.sideItem').forEach(el=>{
    el.addEventListener('click', ()=>{
      document.querySelectorAll('.sideItem').forEach(s=>s.classList.remove('active'));
      el.classList.add('active');
      const phase = el.dataset.phase;
      // Si se pulsa 'planning', navegamos a la página de Planning
      if(phase === 'planning'){
        navigate('planning');
        return;
      }
      // Por ahora solo destacamos la fase; en futuro podemos filtrar o mapear fases a rutas adicionales.
    });
  });

  // Modal handlers are registered in modal.js
}

function labelIcon(id){
  if(id==="fases") return "⛳";
  if(id==="planning") return "📋";
  if(id==="iteraciones") return "🔁";
  if(id==="equipo") return "👥";
  if(id==="metricas") return "📈";
  if(id==="workshop") return "🚀";
  return "🗺️";
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}

function modalHtml(){
  return `
  <div class="modalBackdrop" id="modal">
    <div class="modal">
      <div class="modalHeader">
        <div>
          <div class="h2" id="modalTitle">Nueva Tarea</div>
          <div class="small muted">Agrega prácticas, tareas o evidencias (se guarda en tu navegador)</div>
        </div>
        <button class="btn" id="modalClose">Cerrar</button>
      </div>
      <div class="modalBody" id="modalBody"></div>
      <div class="modalFooter">
        <button class="btn" id="modalCancel">Cancelar</button>
        <button class="btn primary" id="modalSave">Guardar</button>
      </div>
    </div>
  </div>`;
}
