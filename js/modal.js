import { Storage } from "./storage.js";
import { toast } from "./toast.js";

// Modal simple reutilizable
export const Modal = {
  open({ title, bodyHtml, onSave }){
    const backdrop = document.getElementById("modal");
    const body = document.getElementById("modalBody");
    const t = document.getElementById("modalTitle");

    t.textContent = title || "Nueva Tarea";
    body.innerHTML = bodyHtml || "";

    backdrop.classList.add("show");

    const close = ()=>backdrop.classList.remove("show");

    const closeBtns = ["modalClose","modalCancel"];
    closeBtns.forEach(id=>document.getElementById(id)?.addEventListener("click", close, { once:true }));

    document.getElementById("modalSave")?.addEventListener("click", ()=>{
      try{
        const result = onSave?.();
        if(result === false) return;
        toast("Guardado", "Cambios aplicados");
        close();
      }catch(e){
        toast("Error", e?.message || "No se pudo guardar");
      }
    }, { once:true });
  }
};
