import { layout } from "../render/layout.js";
import { getState } from "../state.js";

export function renderVelocidad(){
  const st = getState();
  layout(`
    <div class="card-pad">
      <h1 class="h1">Velocidad del proyecto</h1>
      <div class="muted">Velocidad por iteración — puntos completados y promedio.</div>
      <hr class="sep" />
      <div>Consulta la página de Métricas para un resumen o revisa las iteraciones para ver objetivos y progreso.</div>
    </div>
  `);
}
