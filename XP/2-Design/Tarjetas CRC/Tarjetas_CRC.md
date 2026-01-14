
# Tarjetas CRC – Sistema AntCiberDron

---

### Tarjeta CRC – Usuario

| **Class: Usuario** |  |
|--------------------|----------------|
| **Responsibility** | **Collaborator** |
| Mantener credenciales del usuario | AuthService |
| Asociar rol al usuario | Rol |

---

### Tarjeta CRC – AuthService
| **Class: AuthService** |  |
|------------------------|----------------|
| **Responsibility** | **Collaborator** |
| Autenticar usuarios | Usuario |
| Controlar intentos de acceso | Usuario |

---

### Tarjeta CRC – CoordenadaUK
| **Class: CoordenadaUK** |  |
|-------------------------|----------------|
| **Responsibility** | **Collaborator** |
| Almacenar datos geográficos | CSVService |
| Mantener información de arsenal y cadena w | EvaluadorExplosion |
| Proveer datos de evaluación | BBAService |

---

### Tarjeta CRC – CSVService
| **Class: CSVService** |  |
|-----------------------|----------------|
| **Responsibility** | **Collaborator** |
| Cargar archivos CSV | CoordenadaUK |
| Procesar coordenadas | CoordinadorAntCiberDron |

---

### Tarjeta CRC – InteligenciaArtificial
| **Class: InteligenciaArtificial** |  |
|----------------------------------|----------------|
| **Responsibility** | **Collaborator** |
| Definir búsqueda de tipo de arsenal | IAService |
| Proveer interfaz de IA | AntCiberDron |

---

### Tarjeta CRC – IAService
| **Class: IAService** |  |
|----------------------|----------------|
| **Responsibility** | **Collaborator** |
| Validar tipo de arsenal | CoordinadorAntCiberDron |
| Implementar lógica de IA | AntCiberDron |

---

### Tarjeta CRC – AutomataDFA
| **Class: AutomataDFA** |  |
|------------------------|----------------|
| **Responsibility** | **Collaborator** |
| Evaluar cadenas w | EvaluadorExplosion |

---

### Tarjeta CRC – EvaluadorExplosion
| **Class: EvaluadorExplosion** |  |
|-------------------------------|----------------|
| **Responsibility** | **Collaborator** |
| Decidir si una coordenada explota | CoordenadaUK |
| Evaluar reglas DFA | AutomataDFA |
| Proveer resultado de explosión | BBAService |

---

### Tarjeta CRC – BBAService
| **Class: BBAService** |  |
|-----------------------|----------------|
| **Responsibility** | **Collaborator** |
| Mostrar coordenadas que explotan | EvaluadorExplosion |
| Comunicar resultados | CoordenadaUK |

---

### Tarjeta CRC – CoordinadorAntCiberDron
| **Class: CoordinadorAntCiberDron** |  |
|-----------------------------------|----------------|
| **Responsibility** | **Collaborator** |
| Coordinar flujo del CSV | CSVService |
| Validar tipo de arsenal | IAService |
| Orquestar resultados | BBAService |

---

### Tarjeta CRC – Hormiga
| **Class: Hormiga (Abstracta)** |  |
|--------------------------------|----------------|
| **Responsibility** | **Collaborator** |
| Mantener estado y energía | HormigueroVirtual |
| Consumir alimento | Alimento |

---

### Tarjeta CRC – HLarva
| **Class: HLarva** |  |
|-------------------|----------------|
| **Responsibility** | **Collaborator** |
| Transformarse según alimento | Alimento |
| Mantener ciclo de vida inicial | HormigueroVirtual |

---

### Tarjeta CRC – HSoldado
| **Class: HSoldado** |  |
|---------------------|----------------|
| **Responsibility** | **Collaborator** |
| Mantener estado de combate | HormigueroVirtual |
| Consumir alimento carnívoro | Carnivoro |

---

### Tarjeta CRC – Alimento
| **Class: Alimento (Abstracta)** |  |
|--------------------------------|----------------|
| **Responsibility** | **Collaborator** |
| Definir tipo de alimento | Hormiga |

---

### Tarjeta CRC – Nectar
| **Class: Nectar** |  |
|-------------------|----------------|
| **Responsibility** | **Collaborator** |
| Alimentar larvas | HLarva |

---

### Tarjeta CRC – Carnivoro
| **Class: Carnivoro** |  |
|----------------------|----------------|
| **Responsibility** | **Collaborator** |
| Alimentar soldados | HSoldado |

---

### Tarjeta CRC – HormigueroVirtual
| **Class: HormigueroVirtual** |  |
|------------------------------|----------------|
| **Responsibility** | **Collaborator** |
| Crear larvas | HLarva |
| Alimentar hormigas | Hormiga |
| Transformar larvas en soldados | HSoldado |

---

### Tarjeta CRC – AntCiberDron
| **Class: AntCiberDron** |  |
|-------------------------|----------------|
| **Responsibility** | **Collaborator** |
| Buscar tipo de arsenal | IAService |
| Evaluar explosiones | EvaluadorExplosion |
| Operar como dron armado | CoordenadaUK |

---

### Tarjeta CRC – Metralleta
| **Class: Metralleta** |  |
|-----------------------|----------------|
| **Responsibility** | **Collaborator** |
| Proveer ataque balístico | AntCiberDron |

---

### Tarjeta CRC – Laser
| **Class: Laser** |  |
|------------------|----------------|
| **Responsibility** | **Collaborator** |
| Proveer ataque energético | AntCiberDron |

---

### Tarjeta CRC – TurboReactor
| **Class: TurboReactor** |  |
|-------------------------|----------------|
| **Responsibility** | **Collaborator** |
| Permitir vuelo | AntCiberDron |

---

### Tarjeta CRC – FuentePoder
| **Class: FuentePoder** |  |
|------------------------|----------------|
| **Responsibility** | **Collaborator** |
| Almacenar energía | AntCiberDron |
| Recargar y reemplazar energía | IIA |
