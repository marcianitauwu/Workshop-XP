import { layout } from "../render/layout.js";
import { getState, saveState } from "../state.js";
import { parseCsv, rowsToObjects } from "../csv.js";
import { dfaExplain, evalArsenal } from "../dfa.js";
import { toast } from "../toast.js";

export function renderWorkshop(){
  const st = getState();

  layout(`
    <div class="card pad">
      <h1 class="h1">Workshop — AntCiberDron</h1>
      <div class="muted">
        Esta sección implementa la parte funcional pedida en el PDF: autenticación (ya), lectura CSV, loading por línea y validación por autómata (true/false).
      </div>
      <hr class="sep" />

      <div class="row">
        <div class="col">
          <div class="phaseCard">
            <div class="h2">1) CSV (Grupo##.csv)</div>
            <div class="small muted">Sube tu archivo CSV o usa el ejemplo. Separador ; recomendado.</div>
            <div style="height:10px"></div>
            <input type="file" id="csvFile" accept=".csv,text/csv" />
            <div style="height:10px"></div>
            <button class="btn" id="loadSample">Cargar ejemplo</button>
            <button class="btn primary" id="processCsv">Procesar CSV</button>
            <div id="csvInfo" class="small muted" style="margin-top:10px"></div>
            <div id="loadingArea"></div>
          </div>
        </div>

        <div class="col">
          <div class="phaseCard">
            <div class="h2">2) Autómata (AFD)</div>
            <div class="small muted">Ejemplo implementado: L = { abcdt+ , ab* }. Puedes editar el lenguaje/explicación más adelante.</div>
            <div style="height:10px"></div>

            <div class="field">
              <label>Probar palabra (tipo arsenal)</label>
              <input id="word" placeholder="Ej: abcdttt o abbb" />
            </div>
            <div style="height:10px"></div>
            <button class="btn good" id="checkWord">Validar (true/false)</button>

            <div class="loadingBox" style="margin-top:12px">
              <div class="small muted">Traza (simulada):</div>
              <div id="trace" class="mono small" style="white-space:pre-wrap"></div>
            </div>

            <hr class="sep" />
            <div class="small muted">Últimos dígitos (equipo): <b class="mono">${st.settings.cedulasUltimosDigitos.join(", ")}</b></div>
          </div>
        </div>
      </div>

      <hr class="sep" />
      <div class="phaseCard">
        <div class="h2">3) Resultado: Coordenadas ucranianas a destruir</div>
        <div class="small muted">Cuando procesas el CSV, se muestran las coordenadas donde el autómata acepta el tipo de arsenal (explota BBA).</div>
        <div id="resultArea" style="margin-top:10px"></div>
      </div>
    </div>
  `);

  let csvText = "";

  document.getElementById("loadSample")?.addEventListener("click", async ()=>{
    const sample = await fetch("./sample/Grupo01.csv").then(r=>r.text());
    csvText = sample;
    toast("Ejemplo cargado", "Grupo01.csv");
    document.getElementById("csvInfo").textContent = `Ejemplo listo: ${sample.split(/\r?\n/).filter(Boolean).length-1} filas`;
  });

  document.getElementById("csvFile")?.addEventListener("change", async (e)=>{
    const f = e.target.files?.[0];
    if(!f) return;
    csvText = await f.text();
    document.getElementById("csvInfo").textContent = `Archivo: ${f.name} (${Math.max(0, csvText.split(/\r?\n/).filter(Boolean).length-1)} filas)`;
  });

  document.getElementById("checkWord")?.addEventListener("click", ()=>{
    const w = document.getElementById("word").value.trim();
    const ex = dfaExplain(w);
    document.getElementById("trace").textContent = ex.trace.join("\n");
    toast(ex.ok ? "ACEPTA (true)" : "RECHAZA (false)", w || "(vacío)");
  });

  document.getElementById("processCsv")?.addEventListener("click", async ()=>{
    if(!csvText){
      toast("Primero carga un CSV", "Usa 'Cargar ejemplo' o sube tu archivo");
      return;
    }
    const rows = parseCsv(csvText);
    const objs = rowsToObjects(rows);

    const loadingArea = document.getElementById("loadingArea");
    loadingArea.innerHTML = "";
    const resultArea = document.getElementById("resultArea");
    resultArea.innerHTML = "";

    // Mostrar tabla con loading por línea (\l/-l)
    const accepted = [];
    for(let i=0;i<objs.length;i++){
      const obj = objs[i];
      const coord = obj["Geoposición"] || obj["Geoposicion"] || obj["Geoposición "] || obj["Geoposicion "] || obj["Coord"] || obj["Geoposition"] || "";
      const arsenal = obj["Tipo Arsenal"] || obj["TipoArsenal"] || obj["Tipo"] || obj["Tipo_Arsenal"] || "";
      const ok = evalArsenal(arsenal);
      await fakeLoadingLine(loadingArea, coord, arsenal, ok, i+1, objs.length);
      if(ok) accepted.push({ coord, arsenal, ok });
    }

    if(accepted.length===0){
      resultArea.innerHTML = `<div class="small muted">Ninguna coordenada fue aceptada por el autómata (no explota).</div>`;
    }else{
      resultArea.innerHTML = `
        <table class="table">
          <thead><tr><th>Geoposición</th><th>Tipo Arsenal</th><th>Acción</th></tr></thead>
          <tbody>
            ${accepted.map(a=>`<tr><td><b>${escapeHtml(a.coord)}</b></td><td class="mono">${escapeHtml(a.arsenal)}</td><td><span class="badge good">true</span></td></tr>`).join("")}
          </tbody>
        </table>
      `;
    }
    toast("Procesamiento listo", `${accepted.length} coordenadas aceptadas`);
  });
}

async function fakeLoadingLine(container, coord, arsenal, ok, idx, total){
  const line = document.createElement("div");
  line.className = "loadingBox";
  line.innerHTML = `
    <div class="small muted">Loading <span class="mono" id="spin">|</span> <span class="mono" id="pct">0%</span></div>
    <div class="small" style="margin-top:6px">
      <b>${escapeHtml(coord||"Coord-??")}</b> — <span class="mono">${escapeHtml(arsenal||"(sin arsenal)")}</span>
      ${ok ? `<span class="badge good" style="margin-left:8px">ACEPTA</span>` : `<span class="badge bad" style="margin-left:8px">RECHAZA</span>`}
    </div>
  `;
  container.appendChild(line);

  const spin = line.querySelector("#spin");
  const pct = line.querySelector("#pct");
  const frames = ["\\", "|", "/", "-", "l"];
  for(let p=0;p<=100;p+=10){
    spin.textContent = frames[(p/10)%frames.length];
    pct.textContent = `${p}%`;
    await sleep(60);
  }
}

function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}
