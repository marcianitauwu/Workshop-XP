import { layout } from "../render/layout.js";

export function renderReuniones(){
  layout(`
    <div class="card pad">
      <h1 class="h1">Reuniones</h1>
      <div class="muted">Actas, acuerdos y calendario de reuniones (Planning Game, daily, review).</div>
      <hr class="sep" />
      <div class="small muted">Registra notas y acuerdos en la sección de evidencias o tareas.</div>
    </div>
  `);
}
