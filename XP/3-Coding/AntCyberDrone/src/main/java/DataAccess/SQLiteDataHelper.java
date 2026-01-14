package DataAccess;

import java.sql.*;
import java.io.File;

public class SQLiteDataHelper {
    private static final String DB_PATH = "database/antcyberdrone.db";
    private static SQLiteDataHelper instance;
    private Connection connection;

    private SQLiteDataHelper() {
        initializeDatabase();
    }

    public static SQLiteDataHelper getInstance() {
        if (instance == null) {
            instance = new SQLiteDataHelper();
        }
        return instance;
    }

    private void initializeDatabase() {
        try {
            // CREAR DIRECTORIO database/ si no existe
            File dbDir = new File("database");
            if (!dbDir.exists()) {
                boolean created = dbDir.mkdirs();
                System.out.println("[BD] Directorio database/ creado: " + created);
            }
            
            // Cargar driver SQLite
            Class.forName("org.sqlite.JDBC");
            
            // Conectar a BD
            connection = DriverManager.getConnection("jdbc:sqlite:" + DB_PATH);
            connection.setAutoCommit(true);
            
            System.out.println("[BD] Conexión establecida: " + (connection != null));
            System.out.println("[BD] Ruta BD: " + new File(DB_PATH).getAbsolutePath());
            
            // Migrar esquema si es necesario
            migrarEsquema();
            
            // Crear tablas y datos
            executeDDL();
            executeDML();
            
            System.out.println("[BD] Inicialización completa");
        } catch (ClassNotFoundException e) {
            System.err.println("[BD ERROR] Driver SQLite no encontrado");
            e.printStackTrace();
        } catch (SQLException e) {
            System.err.println("[BD ERROR] Error de SQL");
            e.printStackTrace();
        }
    }

    private void migrarEsquema() {
        try (Statement stmt = connection.createStatement()) {
            // Verificar si las columnas nuevas existen
            ResultSet rs = stmt.executeQuery("PRAGMA table_info(HORMIGA)");
            boolean tieneBrazoIzq = false;
            
            while (rs.next()) {
                String columnName = rs.getString("name");
                if ("brazo_izquierdo".equals(columnName)) {
                    tieneBrazoIzq = true;
                    break;
                }
            }
            
            // Si no tiene las columnas, agregarlas
            if (!tieneBrazoIzq) {
                System.out.println("[BD] Migrando esquema HORMIGA...");
                stmt.execute("ALTER TABLE HORMIGA ADD COLUMN brazo_izquierdo VARCHAR(50)");
                stmt.execute("ALTER TABLE HORMIGA ADD COLUMN brazo_derecho VARCHAR(50)");
                stmt.execute("ALTER TABLE HORMIGA ADD COLUMN tiene_turboreactor INTEGER DEFAULT 0");
                stmt.execute("ALTER TABLE HORMIGA ADD COLUMN tiene_fuente_poder INTEGER DEFAULT 0");
                System.out.println("[BD] Migración completada");
            }
        } catch (SQLException e) {
            // Si la tabla no existe, no hay problema
            System.out.println("[BD] No se requiere migración (tabla nueva)");
        }
    }

    private void executeDDL() {
        String[] ddlStatements = {
            "CREATE TABLE IF NOT EXISTS USUARIO (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(100) NOT NULL UNIQUE, password VARCHAR(100) NOT NULL, rol VARCHAR(50) NOT NULL CHECK(rol IN ('KGD', 'IIA', 'PROFESOR')))",
            "CREATE TABLE IF NOT EXISTS CONTROL_LOGIN (id_usuario INTEGER PRIMARY KEY, intentos_restantes INTEGER DEFAULT 3, bloqueado INTEGER DEFAULT 0, ultimo_intento DATETIME, FOREIGN KEY(id_usuario) REFERENCES USUARIO(id_usuario))",
            "CREATE TABLE IF NOT EXISTS COORDENADA_UK (id_coord INTEGER PRIMARY KEY AUTOINCREMENT, geoposicion VARCHAR(100), lunes VARCHAR(100), martes VARCHAR(100), miercoles VARCHAR(100), jueves VARCHAR(100), viernes VARCHAR(100), tipo_arsenal VARCHAR(100), w VARCHAR(100), fecha_importacion DATETIME DEFAULT CURRENT_TIMESTAMP)",
            "CREATE TABLE IF NOT EXISTS EVALUACION_BBA (id_eval INTEGER PRIMARY KEY AUTOINCREMENT, id_coord INTEGER, explota INTEGER, coord_explota VARCHAR(100), fecha_evaluacion DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(id_coord) REFERENCES COORDENADA_UK(id_coord))",
            "CREATE TABLE IF NOT EXISTS HORMIGA (id_hormiga INTEGER PRIMARY KEY AUTOINCREMENT, tipo VARCHAR(50) NOT NULL CHECK(tipo IN ('LARVA', 'SOLDADO')), energia REAL DEFAULT 100.0, estado VARCHAR(50) DEFAULT 'ACTIVA', brazo_izquierdo VARCHAR(50), brazo_derecho VARCHAR(50), tiene_turboreactor INTEGER DEFAULT 0, tiene_fuente_poder INTEGER DEFAULT 0, fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP)",
            "CREATE TABLE IF NOT EXISTS ALIMENTO (id_alimento INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(100) NOT NULL, tipo VARCHAR(50) NOT NULL CHECK(tipo IN ('NECTAR', 'CARNIVORO')), disponibilidad INTEGER DEFAULT 100)",
            "CREATE TABLE IF NOT EXISTS ANT_CIBER_DRON (id_ant INTEGER PRIMARY KEY AUTOINCREMENT, id_hormiga INTEGER UNIQUE, energia_disponible REAL DEFAULT 1000.0, metralleta_presente INTEGER DEFAULT 0, laser_presente INTEGER DEFAULT 0, laser_potencia REAL DEFAULT 0.0, turboreactor_presente INTEGER DEFAULT 0, fuente_poder_capacidad REAL DEFAULT 500.0, fuente_poder_actual REAL DEFAULT 500.0, fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(id_hormiga) REFERENCES HORMIGA(id_hormiga))",
            "CREATE TABLE IF NOT EXISTS ARMAMENTO (id_armamento INTEGER PRIMARY KEY AUTOINCREMENT, id_hormiga INTEGER, tipo VARCHAR(50) NOT NULL CHECK(tipo IN ('METRALLETA', 'LASER', 'TURBOREACTOR', 'FUENTE_PODER')), nombre VARCHAR(100), activo INTEGER DEFAULT 1, fecha_asignacion DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(id_hormiga) REFERENCES HORMIGA(id_hormiga))"
        };

        try (Statement stmt = connection.createStatement()) {
            for (String sql : ddlStatements) {
                stmt.execute(sql);
            }
            System.out.println("[BD] Tablas creadas correctamente");
        } catch (SQLException e) {
            System.err.println("[BD ERROR] Error creando tablas");
            e.printStackTrace();
        }
    }

    private void executeDML() {
        try (Statement stmt = connection.createStatement()) {
            // Usuario patmic con contraseña 123
            stmt.execute("INSERT OR IGNORE INTO USUARIO (username, password, rol) VALUES ('patmic', '123', 'KGD')");
            stmt.execute("INSERT OR IGNORE INTO CONTROL_LOGIN (id_usuario, intentos_restantes, bloqueado) SELECT id_usuario, 3, 0 FROM USUARIO WHERE username = 'patmic'");
            
            // Usuarios adicionales con contraseña admin
            stmt.execute("INSERT OR IGNORE INTO USUARIO (username, password, rol) VALUES ('Paul', 'admin', 'KGD')");
            stmt.execute("INSERT OR IGNORE INTO CONTROL_LOGIN (id_usuario, intentos_restantes, bloqueado) SELECT id_usuario, 3, 0 FROM USUARIO WHERE username = 'Paul'");
            
            stmt.execute("INSERT OR IGNORE INTO USUARIO (username, password, rol) VALUES ('Samira', 'admin', 'KGD')");
            stmt.execute("INSERT OR IGNORE INTO CONTROL_LOGIN (id_usuario, intentos_restantes, bloqueado) SELECT id_usuario, 3, 0 FROM USUARIO WHERE username = 'Samira'");
            
            stmt.execute("INSERT OR IGNORE INTO USUARIO (username, password, rol) VALUES ('Sebas', 'admin', 'KGD')");
            stmt.execute("INSERT OR IGNORE INTO CONTROL_LOGIN (id_usuario, intentos_restantes, bloqueado) SELECT id_usuario, 3, 0 FROM USUARIO WHERE username = 'Sebas'");
            
            stmt.execute("INSERT OR IGNORE INTO USUARIO (username, password, rol) VALUES ('Salma', 'admin', 'KGD')");
            stmt.execute("INSERT OR IGNORE INTO CONTROL_LOGIN (id_usuario, intentos_restantes, bloqueado) SELECT id_usuario, 3, 0 FROM USUARIO WHERE username = 'Salma'");
            
            stmt.execute("INSERT OR IGNORE INTO USUARIO (username, password, rol) VALUES ('Danna', 'admin', 'KGD')");
            stmt.execute("INSERT OR IGNORE INTO CONTROL_LOGIN (id_usuario, intentos_restantes, bloqueado) SELECT id_usuario, 3, 0 FROM USUARIO WHERE username = 'Danna'");
            
            // Alimentos iniciales
            stmt.execute("INSERT OR IGNORE INTO ALIMENTO (nombre, tipo, disponibilidad) VALUES ('Néctar Premium', 'NECTAR', 100)");
            stmt.execute("INSERT OR IGNORE INTO ALIMENTO (nombre, tipo, disponibilidad) VALUES ('Carne Fresca', 'CARNIVORO', 50)");
            System.out.println("[BD] Datos iniciales insertados");
        } catch (SQLException e) {
            System.err.println("[BD ERROR] Error insertando datos");
            e.printStackTrace();
        }
    }

    public Connection getConnection() {
        if (connection == null) {
            System.err.println("[BD ERROR CRÍTICO] La conexión es NULL!");
            initializeDatabase(); // Intentar reconectar
        }
        return connection;
    }

    public void closeConnection() {
        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();
                System.out.println("[BD] Conexión cerrada");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
