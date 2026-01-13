# AntCyberDrone - Sistema de Control de Hormigas Cibernéticas

# Para ejecutar usar el siguiente comando en bash
./ejecutar.bat

## Descripción
Sistema JavaFX completo que implementa un simulador de hormigas cibernéticas con autómata DFA, gestión de hormiguero virtual, y procesamiento de CSV con coordenadas.

## Estructura del Proyecto
```
AntCyberDrone/
├── src/
│   ├── App.java                           # Punto de entrada
│   ├── BusinessLogic/
│   │   ├── AuthService.java               # Autenticación con 3 intentos
│   │   ├── CSVService.java                # Carga y procesamiento CSV
│   │   ├── AutomataDFA.java               # Autómata DFA (patrones)
│   │   ├── IAService.java                 # Servicio IA
│   │   ├── EvaluadorExplosion.java        # Evaluación de explosiones
│   │   ├── BBAService.java                # Servicio BBA
│   │   ├── HormigueroService.java         # Gestión hormiguero
│   │   └── Entities/
│   │       ├── Usuario.java
│   │       ├── CoordenadaUK.java
│   │       ├── Hormiga.java / HLarva.java / HSoldado.java
│   │       ├── AntCiberDron.java
│   │       ├── Alimento.java / Nectar.java / Carnivoro.java
│   │       ├── FuentePoder.java / Metralleta.java / Laser.java / TurboReactor.java
│   ├── DataAccess/
│   │   ├── SQLiteDataHelper.java          # Conexión y setup BD
│   │   ├── UsuarioDAO.java
│   │   ├── CoordenadaUKDAO.java
│   │   └── HormigaDAO.java
│   └── UserInterface/
│       ├── Login.fxml / LoginController.java
│       ├── Principal.fxml / PrincipalController.java
│       ├── CargarCSV.fxml / CargarCSVController.java
│       └── Hormiguero.fxml / HormigueroController.java
├── database/
│   └── antcyberdrone.db                   # BD SQLite
├── data/                                   # Carpeta para CSVs
├── script/
│   ├── DDL.sql                            # Creación de tablas
│   └── DML.sql                            # Datos iniciales
├── pom.xml                                 # Configuración Maven
└── run.sh                                  # Script para ejecutar

```

## Requisitos
- Java 11+
- Maven 3.6+
- SQLite JDBC (manejado por Maven)
- JavaFX 21.0.2 (manejado por Maven)

## Instalación y Ejecución

### Opción 1: Maven (recomendado)
```bash
cd AntCyberDrone
mvn clean compile javafx:run
```

### Opción 2: Script bash
```bash
./run.sh
```

### Opción 3: Build JAR
```bash
mvn clean package
java -jar target/antcyberdrone-1.0-SNAPSHOT-jar-with-dependencies.jar
```

## Credenciales por Defecto
- **Usuario:** patmic
- **Contraseña:** 123
- **Intentos fallidos permitidos:** 3 (bloquea cuenta después)

## Características Implementadas

### 1. **Autenticación (Login)**
- Pantalla de login con 3 intentos máximos
- Bloqueo de cuenta tras fallos consecutivos
- Validación contra BD SQLite
- Interfaz cybernética con tema oscuro

### 2. **Cargar CSV**
- Selector de archivo CSV
- Soporte para patrones DFA: `ab*`, `a+`, `abcdt+`
- Evaluación automática con autómata
- Visualización de resultados (coordenadas que explotan)
- Log en tiempo real

### 3. **Gestionar Hormiguero**
- **Crear Larvas:** Botón para generar nuevas larvas
- **Alimentar:** Menú desplegable con Néctar o Carne
- **Transformación:** Larvas → Soldados (mediante carne)
- **Tabla interactiva:** Visualiza todas las hormigas (ID, Tipo, Energía, Estado)
- **Gestionar Soldados:** Configura armas (Metralleta, Láser, TurboReactor, FuentePoder)

### 4. **Base de Datos SQLite**
Tablas automáticamente creadas:
- `USUARIO` - Credenciales
- `CONTROL_LOGIN` - Control de intentos
- `COORDENADA_UK` - Coordenadas importadas
- `EVALUACION_BBA` - Resultados de evaluaciones
- `HORMIGA` - Registro de hormigas
- `ALIMENTO` - Tipos de alimento
- `ANT_CIBER_DRON` - Soldados con armas

## Arquitectura

### Capas
1. **UserInterface** (Controllers + FXML) → Presentación JavaFX
2. **BusinessLogic** (Services + Entities) → Lógica de negocio
3. **DataAccess** (DAOs + SQLiteDataHelper) → Acceso a BD

### Patrones Usados
- **DAO Pattern** para persistencia
- **Service Pattern** para lógica
- **MVC** con JavaFX controllers
- **Singleton** para conexión BD

## Ejemplo de Uso

1. **Iniciar sesión:** patmic / 123
2. **Cargar CSV:** 
   - Click en "CARGAR CSV"
   - Seleccionar archivo con columnas: geoposicion, lunes, martes, ..., w, tipo_arsenal
   - Ingresar patrón: `ab*`
   - Click "Probar Patrón"
3. **Hormiguero:**
   - Click "Crear Larva"
   - Seleccionar larva, elegir "Nectar" y alimentar
   - Alimentar con "Carne" → Transforma a Soldado
   - Seleccionar soldado → "Gestionar Soldado" → Configurar armas

## Notas
- La BD se crea automáticamente al iniciar
- Los archivos FXML deben estar en `src/UserInterface/`
- Compile antes de ejecutar: `mvn clean compile`
- Para desarrollo, usa IDE con soporte JavaFX (IntelliJ, Eclipse con plugin)

## Autor
Sistema AntCyberDrone v1.0 - 2026
