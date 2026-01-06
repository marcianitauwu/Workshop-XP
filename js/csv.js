// CSV parser sencillo para ; o ,  (el PDF usa ;)
export function parseCsv(text){
  const lines = String(text).split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
  if(lines.length===0) return [];
  const sep = lines[0].includes(";") ? ";" : ",";
  const rows = lines.map(line => line.split(sep).map(c => c.trim()));
  // Si trae header, lo dejamos como primera fila; render lo manejará
  return rows;
}

export function rowsToObjects(rows){
  if(!rows || rows.length<2) return [];
  const header = rows[0].map(h=>h.replace(/^"|"$/g,""));
  return rows.slice(1).map(r=>{
    const obj = {};
    header.forEach((h,i)=> obj[h] = (r[i] ?? "").replace(/^"|"$/g,""));
    return obj;
  });
}
