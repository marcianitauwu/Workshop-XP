# 📁 Sincronización de Artefactos XP

## 🎯 Cómo Funciona

### 1. **Auto-Exportación**
Cada vez que creas un artefacto, se descarga automáticamente un archivo JSON en tu carpeta de descargas.

**Estructura de archivos:**
```
1-Planning/
  stories_2025-01-15T10-30-00.json
  releases_2025-01-15T11-00-00.json

2-Design/
  crc_2025-01-15T14-00-00.json
  
3-Coding/
  unitTests_2025-01-16T09-00-00.json

4-Testing/
  acceptanceTests_2025-01-16T15-00-00.json

5-Team/
  teamMember_2025-01-15T08-00-00.json
```

### 2. **Organizar Archivos**

Crea esta estructura en tu proyecto:

```
Workshop-XP/
├── data/
│   ├── 1-Planning/
│   ├── 2-Design/
│   ├── 3-Coding/
│   ├── 4-Testing/
│   └── 5-Team/
├── index.html
├── script.js
└── styles.css
```

**Pasos:**
1. Crea la carpeta `data/` en la raíz de Workshop-XP
2. Crea las subcarpetas (1-Planning, 2-Design, etc.)
3. Mueve los archivos JSON descargados a sus carpetas correspondientes

### 3. **Importar en Otra Computadora**

**Opción A: Importar Archivos Individuales**
1. Abre el dashboard
2. Clic en **"Importar"** en el navbar
3. Selecciona todos los archivos JSON
4. ¡Listo! Se cargarán automáticamente

**Opción B: Usar Backup Completo**
1. Exporta todo: Clic en **"Exportar"**
2. Copia el archivo `XP_Backup_FECHA.json`
3. En la otra PC, importa ese archivo
4. Todos los artefactos se restauran

### 4. **Sincronizar con Git**

```bash
# Agregar carpeta data al repositorio
git add data/
git commit -m "Agregar artefactos XP"
git push

# En otra PC
git pull
# Luego importar desde el dashboard
```

### 5. **Compartir con el Equipo**

**Google Drive / OneDrive:**
1. Sube la carpeta `data/` completa
2. Comparte el link con el equipo
3. Cada miembro descarga y usa "Importar"

**USB:**
1. Copia la carpeta `data/`
2. Pégala en otra PC
3. Importa desde el dashboard

## ⚡ Comandos Rápidos

### Exportar Todo
```javascript
// En la consola del navegador
exportAllData()
```

### Importar Múltiples Archivos
```javascript
// Clic en el botón "Importar"
importArtifacts()
```

## 📋 Ejemplo de Archivo JSON

```json
{
  "id": "HU-001",
  "title": "Login de Usuario",
  "description": "Como usuario quiero iniciar sesión...",
  "priority": "Alta",
  "points": 5,
  "completed": false,
  "date": "2025-01-15T10:30:00.000Z"
}
```

## 🔄 Flujo Recomendado

1. **Crear artefacto** → Se descarga automáticamente
2. **Organizar** → Mover a carpeta `data/`
3. **Sincronizar** → Git / Drive / USB
4. **Importar** → Usar botón "Importar" en otra PC

## ⚠️ Notas Importantes

- Los archivos se descargan a tu carpeta de **Descargas**
- **Organízalos manualmente** en `data/` para mejor control
- Los nombres de archivo incluyen timestamp para evitar duplicados
- Al importar, se detecta automáticamente la fase y tipo

## 🆘 Solución de Problemas

**No se descarga automáticamente:**
- Revisa permisos de descargas en tu navegador
- Algunos navegadores bloquean descargas automáticas

**No se importan los archivos:**
- Verifica que los archivos sean `.json` válidos
- Comprueba que el nombre incluya el tipo (ej: `stories_`, `crc_`)

**Duplicados:**
- El sistema detecta duplicados por `date` y `title`
- No se importarán artefactos ya existentes

---

✅ **Sistema listo para sincronización multi-computadora**
