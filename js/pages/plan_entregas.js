import { layout } from "../render/layout.js";

export function renderPlanEntregas(){
  layout(`
    <div class="card pad">
      <h1 class="h1">Plan de entregas</h1>
      <div class="muted">Fechas y entregables acordados para las entregas.</div>
      <hr class="sep" />
      <ul class="list">
        <li><b>09 de enero 2026:</b> Planificación + MVP</li>
        <li><b>10 de enero 2026:</b> Diseño tangible + prototipos</li>
        <li><b>11 de enero 2026:</b> Coding + autómata + CSV</li>
        <li><b>12 de enero 2026:</b> Testing + evidencia + demo</li>
      </ul>
    </div>
  `);
}
