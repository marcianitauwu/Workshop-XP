# Roadmap XP — AntCiberDron (Workshop)

## 🚀 Cómo ejecutarlo

### Opción 1: VS Code Live Server (Recomendado) ⭐
1. Abre VS Code
2. Instala la extensión "Live Server"
3. Abre la carpeta `Workshop-XP`
4. Click derecho en `index.html` → **Open with Live Server**
5. ¡Listo! Se abre en http://localhost:5500

### Opción 2: Python
```bash
cd Workshop-XP
python -m http.server 8000
```
Abre: http://localhost:8000

## 💾 Sistema de Guardado Automático

✅ **Todo se guarda en localStorage automáticamente**  
✅ **No necesitas hacer nada**, solo usar el dashboard  
✅ **Los datos persisten** entre sesiones del navegador  

### 📂 Estructura de Carpetas (Opcional)

Si quieres tener los archivos JSON físicamente:
````markdown
# Roadmap XP — AntCiberDron (Workshop)

Este proyecto es un dashboard **sin framework** (HTML/CSS/JS) para cumplir el workshop de XP:
- Fases XP (Planificación, Diseño, Desarrollo, Pruebas) con prácticas, rol, pair y evidencia.
- Historias de Usuario con iteraciones (4) y story points.
- Equipo con roles XP.
- Métricas básicas.
- Sección AntCiberDron: subir CSV, loading por línea y validación con autómata (true/false).

## Cómo ejecutarlo
Opción A (VS Code Live Server):
1. Abre la carpeta `XP/`
2. Click derecho en `index.html` -> **Open with Live Server**

Opción B (Python):
```bash
cd XP
python -m http.server 8000
```
y abre: http://localhost:8000

## Login
- Profesor: `patmic / 123`
- Integrantes: `u1 / 123`, `u2 / 123`, ... `u5 / 123`

## CSV
Usa `XP/sample/Grupo01.csv` como ejemplo.
El separador recomendado es `;`.

## Evidencias
Carpetas:
- `XP/evidencias/planning`
- `XP/evidencias/design`
- `XP/evidencias/coding`
- `XP/evidencias/testing`

En el dashboard (Fases XP) pega el link del video (Drive/YouTube) en cada práctica.
````
