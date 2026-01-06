// AFD simple para los lenguajes del ejemplo del PDF:
// L = { abcdt+ , ab* }  (ejemplo si últimos dígitos son 5 y 9)
// Nota: tu lenguaje REAL puede variar según lo que definan ustedes, pero esto te deja la base operativa.

export function evalArsenal(word){
  // Normalizamos
  const w = String(word ?? "").trim();
  if(!w) return false;
  // ab* : empieza con 'a' y luego cero o más 'b' y nada más
  if(w[0]==="a"){
    const rest = w.slice(1);
    if(/^[b]*$/.test(rest)) return true;
  }
  // abcdt+ : exactamente 'abcd' seguido de 1 o más 't'
  if(/^abcdt+$/.test(w)) return true;
  return false;
}

// Construye una "explicación" tipo autómata (para mostrar en UI)
export function dfaExplain(word){
  const ok = evalArsenal(word);
  const w = String(word ?? "").trim();
  if(!w) return { ok:false, trace:["(vacío) -> RECHAZA"] };
  // Traza simple
  const trace = [];
  trace.push(`q0 --${w[0] ?? "ε"}--> ...`);
  if(/^[ab]+$/.test(w)) trace.push("Ruta ab*");
  if(/^abcdt+$/i.test(w)) trace.push("Ruta abcdt+");
  trace.push(ok ? "ACEPTA (true)" : "RECHAZA (false)");
  return { ok, trace };
}
