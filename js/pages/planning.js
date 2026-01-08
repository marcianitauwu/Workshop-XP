import { layout } from "../render/layout.js";

export function renderPlanning(){
  console.log('[renderPlanning] called');
  layout(`
    <div class="card-pad">
      <h1 class="h1">Planning</h1>
      <div class="muted">Accede a las secciones relacionadas con la planificación del proyecto.</div>
      <hr class="sep" />
      <div class="cards">
        <div class="card-small">
          <h3>Historias de usuario</h3>
          <div class="muted">Listado y gestión de historias (contenido previo).</div>
          <div style="height:8px"></div>
          <button class="btn good" onclick="location.hash='#/historias'">Ir a Historias de usuario</button>
        </div>
        <div class="card-small">
          <h3>Plan de entregas</h3>
          <div class="muted">Fechas y entregables del proyecto.</div>
          <div style="height:8px"></div>
          <button class="btn good" onclick="location.hash='#/plan-entregas'">Ver Plan de entregas</button>
        </div>
        <div class="card-small">
          <h3>Velocidad de proyecto</h3>
          <div class="muted">Velocidad y métricas por iteración.</div>
          <div style="height:8px"></div>
          <button class="btn good" onclick="location.hash='#/velocidad'">Ver Velocidad</button>
        </div>
        <div class="card-small">
          <h3>Iteraciones</h3>
          <div class="muted">Iteraciones con objetivos y fechas.</div>
          <div style="height:8px"></div>
          <button class="btn good" onclick="location.hash='#/iteraciones'">Ir a Iteraciones</button>
        </div>
        <div class="card-small">
          <h3>Reuniones</h3>
          <div class="muted">Actas, acuerdos y planificación de reuniones.</div>
          <div style="height:8px"></div>
          <button class="btn good" onclick="location.hash='#/reuniones'">Ir a Reuniones</button>
        </div>
      </div>
    </div>
  `);
}
