export function toast(title, detail=""){
  const el = document.getElementById("toast");
  if(!el) return;
  el.innerHTML = `<b>${escapeHtml(title)}</b>${detail?`<span class="muted">${escapeHtml(detail)}</span>`:""}`;
  el.classList.add("show");
  setTimeout(()=>el.classList.remove("show"), 3200);
}
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}
