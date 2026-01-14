# 🚨 IMPORTANTE: Usar Live Server

## ⚠️ Problema Común

Si ves el error **"No se encontraron archivos en data/"**, es porque el navegador NO puede leer archivos locales directamente desde `file:///`

## ✅ Solución: Live Server

### Opción 1: VS Code Live Server (Recomendado)

1. **Instalar extensión Live Server:**
   - Abre VS Code
   - Ve a Extensions (Ctrl+Shift+X)
   - Busca "Live Server" (por Ritwick Dey)
   - Clic en "Install"

2. **Ejecutar:**
   - Abre la carpeta `Workshop-XP` en VS Code
   - Click derecho en `index.html`
   - Selecciona **"Open with Live Server"**
   - Se abre automáticamente en `http://localhost:5500`

3. **Verificar:**
   - La URL debe ser `http://localhost:5500` (NO `file:///`)
   - Presiona F12 → Consola
   - Deberías ver: `✅ data/1-Planning/stories.json (X items)`

### Opción 2: Python HTTP Server

```bash
cd "C:\Users\ASUS\Desktop\Nueva carpeta\Workshop-XP"
python -m http.server 8000
```

Abre: http://localhost:8000

### Opción 3: Node.js HTTP Server

```bash
cd "C:\Users\ASUS\Desktop\Nueva carpeta\Workshop-XP"
npx http-server -p 8000
```

Abre: http://localhost:8000

## 🔍 Verificar que Funciona

### ✅ Correcto (con servidor)
