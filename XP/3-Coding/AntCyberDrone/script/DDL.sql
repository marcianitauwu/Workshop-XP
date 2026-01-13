-- ==========================================
-- TABLAS: USUARIOS Y CONTROL DE LOGIN
-- ==========================================
CREATE TABLE IF NOT EXISTS USUARIO (
    id_usuario INTEGER PRIMARY KEY GENERATED AS IDENTITY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    rol VARCHAR(50) NOT NULL CHECK(rol IN ('KGD', 'IIA', 'PROFESOR'))
);

CREATE TABLE IF NOT EXISTS CONTROL_LOGIN (
    id_usuario INTEGER PRIMARY KEY,
    intentos_restantes INTEGER DEFAULT 3,
    bloqueado INTEGER DEFAULT 0 CHECK(bloqueado IN (0, 1)),
    ultimo_intento DATETIME,
    FOREIGN KEY(id_usuario) REFERENCES USUARIO(id_usuario)
);

-- ==========================================
-- COORDENADAS (CSV)
-- ==========================================
CREATE TABLE IF NOT EXISTS COORDENADA_UK (
    id_coord INTEGER PRIMARY KEY GENERATED AS IDENTITY,
    geoposicion VARCHAR(100),
    lunes VARCHAR(100),
    martes VARCHAR(100),
    miercoles VARCHAR(100),
    jueves VARCHAR(100),
    viernes VARCHAR(100),
    tipo_arsenal VARCHAR(100),
    w VARCHAR(100),
    fecha_importacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- EVALUACION DFA / BBA
-- ==========================================
CREATE TABLE IF NOT EXISTS EVALUACION_BBA (
    id_eval INTEGER PRIMARY KEY GENERATED AS IDENTITY,
    id_coord INTEGER,
    explota BOOLEAN,
    coord_explota VARCHAR(100),
    fecha_evaluacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_coord) REFERENCES COORDENADA_UK(id_coord)
);

-- ==========================================
-- HORMIGUERO VIRTUAL
-- ==========================================
CREATE TABLE IF NOT EXISTS HORMIGA (
    id_hormiga INTEGER PRIMARY KEY GENERATED AS IDENTITY,
    tipo VARCHAR(50) NOT NULL CHECK(tipo IN ('LARVA', 'SOLDADO')),
    energia REAL DEFAULT 100.0,
    estado VARCHAR(50) DEFAULT 'ACTIVA',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ALIMENTO (
    id_alimento INTEGER PRIMARY KEY GENERATED AS IDENTITY,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK(tipo IN ('NECTAR', 'CARNIVORO')),
    disponibilidad INTEGER DEFAULT 100
);

-- ==========================================
-- ANT CIBER DRON (Soldado con armas)
-- ==========================================
CREATE TABLE IF NOT EXISTS ANT_CIBER_DRON (
    id_ant INTEGER PRIMARY KEY GENERATED AS IDENTITY,
    id_hormiga INTEGER UNIQUE,
    energia_disponible REAL DEFAULT 1000.0,
    metralleta_presente BOOLEAN DEFAULT 0,
    laser_presente BOOLEAN DEFAULT 0,
    laser_potencia REAL DEFAULT 0.0,
    turboreactor_presente BOOLEAN DEFAULT 0,
    fuente_poder_capacidad REAL DEFAULT 500.0,
    fuente_poder_actual REAL DEFAULT 500.0,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_hormiga) REFERENCES HORMIGA(id_hormiga)
);
