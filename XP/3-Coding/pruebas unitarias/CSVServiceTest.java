import BusinessLogic.CSVService;
import BusinessLogic.Entities.CoordenadaUK;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.io.TempDir;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Pruebas unitarias para la clase CSVService
 * Valida la carga y procesamiento de archivos CSV
 */
@DisplayName("Pruebas del Servicio CSV")
public class CSVServiceTest {

    private CSVService csvService;

    @BeforeEach
    public void setUp() {
        csvService = new CSVService();
    }

    // ==================== PRUEBAS DE CARGA DE CSV ====================
    
    @Test
    @DisplayName("Cargar CSV válido debe retornar lista de coordenadas")
    public void testCargarCSVValido(@TempDir Path tempDir) throws IOException {
        // Crear archivo CSV temporal
        File csvFile = tempDir.resolve("test.csv").toFile();
        try (FileWriter writer = new FileWriter(csvFile)) {
            writer.write("Geoposicion;Lunes;Martes;Miercoles;Jueves;Viernes;TipoArsenal\n");
            writer.write("UK-001;10;20;30;40;50;a\n");
            writer.write("UK-002;15;25;35;45;55;ab\n");
            writer.write("UK-003;12;22;32;42;52;xyz\n");
        }

        List<CoordenadaUK> coordenadas = csvService.cargarYProcesarCSV(csvFile.getAbsolutePath());

        assertNotNull(coordenadas);
        assertEquals(3, coordenadas.size());
    }

    @Test
    @DisplayName("CSV con arsenal 'a' debe marcar como explosión")
    public void testCSVConArsenalA_Explota(@TempDir Path tempDir) throws IOException {
        File csvFile = tempDir.resolve("test_a.csv").toFile();
        try (FileWriter writer = new FileWriter(csvFile)) {
            writer.write("Geoposicion;Lunes;Martes;Miercoles;Jueves;Viernes;TipoArsenal\n");
            writer.write("UK-001;10;20;30;40;50;a\n");
        }

        List<CoordenadaUK> coordenadas = csvService.cargarYProcesarCSV(csvFile.getAbsolutePath());

        assertEquals(1, coordenadas.size());
        assertTrue(coordenadas.get(0).isExplota());
    }

    @Test
    @DisplayName("CSV con arsenal 'ab' debe marcar como explosión")
    public void testCSVConArsenalAB_Explota(@TempDir Path tempDir) throws IOException {
        File csvFile = tempDir.resolve("test_ab.csv").toFile();
        try (FileWriter writer = new FileWriter(csvFile)) {
            writer.write("Geoposicion;Lunes;Martes;Miercoles;Jueves;Viernes;TipoArsenal\n");
            writer.write("UK-002;15;25;35;45;55;ab\n");
        }

        List<CoordenadaUK> coordenadas = csvService.cargarYProcesarCSV(csvFile.getAbsolutePath());

        assertEquals(1, coordenadas.size());
        assertTrue(coordenadas.get(0).isExplota());
    }

    @Test
    @DisplayName("CSV con arsenal 'abcdt' debe marcar como explosión")
    public void testCSVConArsenalABCDT_Explota(@TempDir Path tempDir) throws IOException {
        File csvFile = tempDir.resolve("test_abcdt.csv").toFile();
        try (FileWriter writer = new FileWriter(csvFile)) {
            writer.write("Geoposicion;Lunes;Martes;Miercoles;Jueves;Viernes;TipoArsenal\n");
            writer.write("UK-003;12;22;32;42;52;abcdt\n");
        }

        List<CoordenadaUK> coordenadas = csvService.cargarYProcesarCSV(csvFile.getAbsolutePath());

        assertEquals(1, coordenadas.size());
        assertTrue(coordenadas.get(0).isExplota());
    }

    @Test
    @DisplayName("CSV con arsenal 'xyz' no debe marcar como explosión")
    public void testCSVConArsenalXYZ_NoExplota(@TempDir Path tempDir) throws IOException {
        File csvFile = tempDir.resolve("test_xyz.csv").toFile();
        try (FileWriter writer = new FileWriter(csvFile)) {
            writer.write("Geoposicion;Lunes;Martes;Miercoles;Jueves;Viernes;TipoArsenal\n");
            writer.write("UK-004;16;26;36;46;56;xyz\n");
        }

        List<CoordenadaUK> coordenadas = csvService.cargarYProcesarCSV(csvFile.getAbsolutePath());

        assertEquals(1, coordenadas.size());
        assertFalse(coordenadas.get(0).isExplota());
    }

    // ==================== PRUEBAS DE ESTADÍSTICAS ====================
    
    @Test
    @DisplayName("Obtener estadísticas de coordenadas procesadas")
    public void testObtenerEstadisticas(@TempDir Path tempDir) throws IOException {
        File csvFile = tempDir.resolve("test_stats.csv").toFile();
        try (FileWriter writer = new FileWriter(csvFile)) {
            writer.write("Geoposicion;Lunes;Martes;Miercoles;Jueves;Viernes;TipoArsenal\n");
            writer.write("UK-001;10;20;30;40;50;a\n");
            writer.write("UK-002;15;25;35;45;55;ab\n");
            writer.write("UK-003;12;22;32;42;52;xyz\n");
            writer.write("UK-004;13;23;33;43;53;abcdt\n");
        }

        List<CoordenadaUK> coordenadas = csvService.cargarYProcesarCSV(csvFile.getAbsolutePath());
        Map<String, Integer> stats = csvService.obtenerEstadisticas(coordenadas);

        assertEquals(4, stats.get("total"));
        assertEquals(3, stats.get("explotan")); // a, ab, abcdt
        assertEquals(1, stats.get("no_explotan")); // xyz
    }

    @Test
    @DisplayName("Estadísticas de lista vacía")
    public void testEstadisticasListaVacia(@TempDir Path tempDir) throws IOException {
        File csvFile = tempDir.resolve("test_empty.csv").toFile();
        try (FileWriter writer = new FileWriter(csvFile)) {
            writer.write("Geoposicion;Lunes;Martes;Miercoles;Jueves;Viernes;TipoArsenal\n");
        }

        List<CoordenadaUK> coordenadas = csvService.cargarYProcesarCSV(csvFile.getAbsolutePath());
        Map<String, Integer> stats = csvService.obtenerEstadisticas(coordenadas);

        assertEquals(0, stats.get("total"));
        assertEquals(0, stats.get("explotan"));
        assertEquals(0, stats.get("no_explotan"));
    }

    // ==================== PRUEBAS DE CASOS LÍMITE ====================
    
    @Test
    @DisplayName("CSV con líneas mal formadas debe manejar errores")
    public void testCSVConLineasMalFormadas(@TempDir Path tempDir) throws IOException {
        File csvFile = tempDir.resolve("test_malformado.csv").toFile();
        try (FileWriter writer = new FileWriter(csvFile)) {
            writer.write("Geoposicion;Lunes;Martes;Miercoles;Jueves;Viernes;TipoArsenal\n");
            writer.write("UK-001;10;20;30;40;50;a\n");
            writer.write("UK-002;15;25\n"); // Línea incompleta
            writer.write("UK-003;12;22;32;42;52;xyz\n");
        }

        List<CoordenadaUK> coordenadas = csvService.cargarYProcesarCSV(csvFile.getAbsolutePath());

        // Solo debe cargar las líneas válidas
        assertEquals(2, coordenadas.size());
    }

    @Test
    @DisplayName("CSV con espacios en blanco debe procesarse correctamente")
    public void testCSVConEspacios(@TempDir Path tempDir) throws IOException {
        File csvFile = tempDir.resolve("test_espacios.csv").toFile();
        try (FileWriter writer = new FileWriter(csvFile)) {
            writer.write("Geoposicion;Lunes;Martes;Miercoles;Jueves;Viernes;TipoArsenal\n");
            writer.write(" UK-001 ; 10 ; 20 ; 30 ; 40 ; 50 ; a \n");
        }

        List<CoordenadaUK> coordenadas = csvService.cargarYProcesarCSV(csvFile.getAbsolutePath());

        assertEquals(1, coordenadas.size());
        assertEquals("UK-001", coordenadas.get(0).getGeoposicion());
        assertEquals("a", coordenadas.get(0).getTipoArsenal());
    }

    @Test
    @DisplayName("Archivo no existente debe retornar lista vacía")
    public void testArchivoNoExistente() {
        List<CoordenadaUK> coordenadas = csvService.cargarYProcesarCSV("archivo_no_existe.csv");
        assertNotNull(coordenadas);
        assertTrue(coordenadas.isEmpty());
    }
}
