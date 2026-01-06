import { layout } from "../render/layout.js";
import { login, seedUsersIfEmpty, isAuthed } from "../auth.js";
import { seed } from "../../data/seed.js";
import { toast } from "../toast.js";

let attempts = 0;

export function renderLogin(){
  seedUsersIfEmpty(seed.usersAuth);

  const html = `
    <div class="row">
      <div class="col">
        <div class="card pad">
          <h1 class="h1">Acceso — Roadmap XP</h1>
          <p class="muted">Requisito del workshop: autenticación para integrantes y profesor (máx. 3 intentos).</p>
          <div class="formGrid" style="margin-top:12px">
            <div class="field">
              <label>Usuario</label>
              <input id="user" placeholder="patmic / u1 / u2 ..." />
            </div>
            <div class="field">
              <label>Contraseña</label>
              <input id="pass" type="password" placeholder="123" />
            </div>
          </div>
          <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:12px">
            <button class="btn primary" id="loginBtn">Ingresar</button>
          </div>
          <div class="small muted" style="margin-top:10px">
            Tip: por defecto todas las cuentas (u1..u5) usan clave <b>123</b>. Profesor: <b>patmic / 123</b>.
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card pad">
          <h2 class="h2">¿Qué muestra este dashboard?</h2>
          <ul class="muted small" style="line-height:1.6">
            <li>Fases XP con prácticas, rol responsable, pair programming y evidencia.</li>
            <li>Historias de usuario agrupadas por iteración.</li>
            <li>Iteraciones (4) y avance.</li>
            <li>Equipo y roles XP.</li>
            <li>Workshop AntCiberDron: CSV + autómata + explosión BBA.</li>
          </ul>
          <hr class="sep" />
          <div class="small muted">Basado en el PDF del workshop (AntCiberDron).</div>
        </div>
      </div>
    </div>
  `;

  // Layout without nav
  const app = document.getElementById("app");
  app.innerHTML = `<div class="container" style="padding-top:26px">${html}</div>`;

  document.getElementById("loginBtn")?.addEventListener("click", ()=>{
    if(attempts>=3){
      toast("Bloqueado", "Ya usaste los 3 intentos");
      return;
    }
    const u = document.getElementById("user").value.trim();
    const p = document.getElementById("pass").value.trim();
    const ok = login(u,p);
    if(ok){
      location.hash = "#/home";
      location.reload();
    }else{
      attempts++;
      toast("Credenciales inválidas", `Intento ${attempts}/3`);
      if(attempts>=3) toast("Bloqueado", "Recarga la página para reiniciar");
    }
  });
}
