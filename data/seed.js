// Datos iniciales basados en el PDF del Workshop XP (AntCiberDron).
// Puedes editar estos datos o hacerlo desde el UI (Nueva Tarea / Editar).
export const seed = {
  equipo: [
    { id:"u1", cedula:"1748127412", nombre:"Sami", rol:"Product Owner" },
    { id:"u2", cedula:"1734932122", nombre:"Paul", rol:"Developer" },
    { id:"u3", cedula:"1704873274", nombre:"Sebas", rol:"Developer" },
    { id:"u4", cedula:"1750712240", nombre:"Salma", rol:"Coach" },
    { id:"u5", cedula:"1750712265", nombre:"Danna", rol:"Tester" },
    { id:"u6", cedula:"0000000000", nombre:"patmic", rol:"Profesor" }
  ],
  usersAuth: [
    { user:"patmic", pass:"123", nombre:"patmic", rol:"Profesor" },
    { user:"u1", pass:"123", nombre:"Sami", rol:"Product Owner" },
    { user:"u2", pass:"123", nombre:"Paul", rol:"Developer" },
    { user:"u3", pass:"123", nombre:"Sebas", rol:"Developer" },
    { user:"u4", pass:"123", nombre:"Salma", rol:"Coach" },
    { user:"u5", pass:"123", nombre:"Danna", rol:"Tester" }
  ],
  fases: [
    {
      id:"planning", nombre:"Planificación", semana:"Semana 1-2",
      practicas:[
        { id:"hu", nombre:"Historias de Usuario", estado:"pendiente", rol:"Product Owner", pair:["u2","u3"], artefacto:"Backlog HU (MD/PDF)", evidencia:"" },
        { id:"plan", nombre:"Plan de Entregas", estado:"pendiente", rol:"Product Owner", pair:["u2","u3"], artefacto:"Plan de entregas", evidencia:"" },
        { id:"vel", nombre:"Velocidad del Proyecto", estado:"pendiente", rol:"Coach", pair:["u4","u2"], artefacto:"Velocidad por iteración", evidencia:"" },
        { id:"iter", nombre:"Iteraciones Cortas", estado:"pendiente", rol:"Coach", pair:["u4","u2"], artefacto:"Plan de 4 iteraciones", evidencia:"" },
        { id:"rot", nombre:"Rotaciones", estado:"pendiente", rol:"Coach", pair:["u4","u3"], artefacto:"Plan de rotación de parejas", evidencia:"" },
        { id:"reun", nombre:"Reuniones (Planning Game)", estado:"pendiente", rol:"Product Owner", pair:["u1","u4"], artefacto:"Actas / acuerdos", evidencia:"" }
      ]
    },
    {
      id:"design", nombre:"Diseño", semana:"Semana 3-4",
      practicas:[
        { id:"simple", nombre:"Diseño Simple", estado:"pendiente", rol:"Developer", pair:["u2","u3"], artefacto:"Diseño mínimo funcional", evidencia:"" },
        { id:"metafora", nombre:"Metáfora del Sistema", estado:"pendiente", rol:"Coach", pair:["u4","u2"], artefacto:"Metáfora (MD)", evidencia:"" },
        { id:"crc", nombre:"Tarjetas CRC", estado:"pendiente", rol:"Developer", pair:["u2","u3"], artefacto:"CRC (imagen/pdf)", evidencia:"" },
        { id:"refactor", nombre:"Refactoring (plan)", estado:"pendiente", rol:"Developer", pair:["u2","u3"], artefacto:"Plan de refactor", evidencia:"" }
      ]
    },
    {
      id:"coding", nombre:"Desarrollo", semana:"Semana 5-6",
      practicas:[
        { id:"pair", nombre:"Programación en Parejas", estado:"pendiente", rol:"Developer", pair:["u2","u3"], artefacto:"Commits / registro pairing", evidencia:"" },
        { id:"tdd", nombre:"Test-Driven Development (TDD)", estado:"pendiente", rol:"Developer", pair:["u2","u3"], artefacto:"Tests primero", evidencia:"" },
        { id:"ci", nombre:"Integración Continua", estado:"pendiente", rol:"Coach", pair:["u4","u2"], artefacto:"Pipeline / rutina integración", evidencia:"" },
        { id:"std", nombre:"Estándares de Código", estado:"pendiente", rol:"Coach", pair:["u4","u3"], artefacto:"Guía de estilo", evidencia:"" }
      ]
    },
    {
      id:"testing", nombre:"Pruebas", semana:"Semana 7-8",
      practicas:[
        { id:"acc", nombre:"Pruebas de Aceptación", estado:"pendiente", rol:"Tester", pair:["u5","u2"], artefacto:"Casos aceptación", evidencia:"" },
        { id:"unit", nombre:"Pruebas Unitarias", estado:"pendiente", rol:"Developer", pair:["u2","u3"], artefacto:"Suite unit tests", evidencia:"" },
        { id:"int", nombre:"Pruebas de Integración", estado:"pendiente", rol:"Tester", pair:["u5","u3"], artefacto:"Suite integración", evidencia:"" },
        { id:"release", nombre:"Releases Pequeños", estado:"pendiente", rol:"Product Owner", pair:["u1","u4"], artefacto:"Versiones por iteración", evidencia:"" }
      ]
    }
  ],
  iteraciones: [
    { id:"it1", nombre:"Iteración 1", rango:"Semana 1-2", objetivo:"Planificación + MVP", historias:["US-001","US-002"] },
    { id:"it2", nombre:"Iteración 2", rango:"Semana 3-4", objetivo:"Diseño tangible + prototipos", historias:["US-003","US-004"] },
    { id:"it3", nombre:"Iteración 3", rango:"Semana 5-6", objetivo:"Coding + autómata + CSV", historias:["US-005","US-006"] },
    { id:"it4", nombre:"Iteración 4", rango:"Semana 7-8", objetivo:"Testing + evidencia + demo", historias:["US-007","US-008"] }
  ],
  historias: [
    { id:"US-001", titulo:"Autenticación con 3 intentos", prioridad:"alta", puntos:5, iteracion:"it1", estado:"pendiente", asignados:["u2","u3"],
      descripcion:"Como profesor/miembro del grupo, quiero iniciar sesión (usuario/clave) con máximo 3 intentos para acceder al dashboard y evidencias." },
    { id:"US-002", titulo:"Leer y mostrar Grupo##.csv con loading", prioridad:"alta", puntos:8, iteracion:"it1", estado:"pendiente", asignados:["u2","u3"],
      descripcion:"Como usuario KGD, quiero cargar el archivo CSV y ver las coordenadas con una animación de loading \\\l/-l y porcentaje para cada línea." },
    { id:"US-003", titulo:"Diseño de autómata (AFD) + grafo + gramática", prioridad:"alta", puntos:8, iteracion:"it2", estado:"pendiente", asignados:["u4","u2"],
      descripcion:"Como equipo, quiero diseñar el AFD según los últimos dígitos de cédulas para validar el lenguaje de tipo arsenal." },
    { id:"US-004", titulo:"Modelo de dominio: Hormiga + TIPO_HORMIGA + Alimentos", prioridad:"media", puntos:5, iteracion:"it2", estado:"pendiente", asignados:["u2","u3"],
      descripcion:"Como equipo, quiero modelar Hormiga, HLarva y sus transformaciones según el alimento para cumplir el PDF." },
    { id:"US-005", titulo:"Evaluar arsenal con autómata y decidir explosión", prioridad:"alta", puntos:8, iteracion:"it3", estado:"pendiente", asignados:["u2","u3"],
      descripcion:"Como AntCiberDron, quiero buscar tipo de arsenal y retornar true/false según AFD, mostrando la coordenada donde explota BBA." },
    { id:"US-006", titulo:"Pantallas de hormiguero virtual para crear hormigas", prioridad:"media", puntos:5, iteracion:"it3", estado:"pendiente", asignados:["u2","u3"],
      descripcion:"Como usuario KGD, quiero crear hormigas en un hormiguero virtual (UI) para administrar tipos y alimentos." },
    { id:"US-007", titulo:"Pruebas unitarias e integración", prioridad:"alta", puntos:5, iteracion:"it4", estado:"pendiente", asignados:["u5","u2"],
      descripcion:"Como tester, quiero preparar pruebas unitarias e integración para autenticación, CSV y autómata." },
    { id:"US-008", titulo:"Evidencias en video por fase (<=3 min c/u)", prioridad:"alta", puntos:3, iteracion:"it4", estado:"pendiente", asignados:["u1","u4"],
      descripcion:"Como profesor, quiero ver videos cortos trabajando por fase, almacenados en evidencias y enlazados desde el dashboard." }
  ],
  settings: {
    tema:"dark",
    grupo:"Grupo01",
    cedulasUltimosDigitos:["5","9"] // puedes editar aquí según tu equipo
  }
};
