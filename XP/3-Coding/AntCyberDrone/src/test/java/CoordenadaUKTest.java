import BusinessLogic.Entities.CoordenadaUK;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Pruebas unitarias para la clase CoordenadaUK
 * Valida la correcta creación y manejo de coordenadas
 */
@DisplayName("Pruebas de CoordenadaUK")
public class CoordenadaUKTest {

    // ==================== PRUEBAS DE CONSTRUCCIÓN ====================
    
    @Test
    @DisplayName("Constructor sin parámetros debe crear objeto válido")
    public void testConstructorVacio() {
        CoordenadaUK coord = new CoordenadaUK();
        assertNotNull(coord);
        assertFalse(coord.isExplota()); // Por defecto false
    }

    @Test
    @DisplayName("Constructor con parámetros debe inicializar correctamente")
    public void testConstructorConParametros() {
        CoordenadaUK coord = new CoordenadaUK(
            "UK-001", "10", "20", "30", "40", "50", "a"
        );

        assertEquals("UK-001", coord.getGeoposicion());
        assertEquals("10", coord.getLunes());
        assertEquals("20", coord.getMartes());
        assertEquals("30", coord.getMiercoles());
        assertEquals("40", coord.getJueves());
        assertEquals("50", coord.getViernes());
        assertEquals("a", coord.getTipoArsenal());
        assertFalse(coord.isExplota()); // Por defecto false
    }

    // ==================== PRUEBAS DE GETTERS Y SETTERS ====================
    
    @Test
    @DisplayName("Setters deben actualizar valores correctamente")
    public void testSetters() {
        CoordenadaUK coord = new CoordenadaUK();
        
        coord.setGeoposicion("UK-999");
        coord.setLunes("100");
        coord.setMartes("200");
        coord.setMiercoles("300");
        coord.setJueves("400");
        coord.setViernes("500");
        coord.setTipoArsenal("abcdt");
        coord.setExplota(true);

        assertEquals("UK-999", coord.getGeoposicion());
        assertEquals("100", coord.getLunes());
        assertEquals("200", coord.getMartes());
        assertEquals("300", coord.getMiercoles());
        assertEquals("400", coord.getJueves());
        assertEquals("500", coord.getViernes());
        assertEquals("abcdt", coord.getTipoArsenal());
        assertTrue(coord.isExplota());
    }

    // ==================== PRUEBAS DE ESTADO DE EXPLOSIÓN ====================
    
    @Test
    @DisplayName("Estado de explosión debe ser modificable")
    public void testEstadoExplosion() {
        CoordenadaUK coord = new CoordenadaUK();
        
        assertFalse(coord.isExplota()); // Inicial
        
        coord.setExplota(true);
        assertTrue(coord.isExplota());
        
        coord.setExplota(false);
        assertFalse(coord.isExplota());
    }

    // ==================== PRUEBAS CON VALORES NULL ====================
    
    @Test
    @DisplayName("Coordenada debe aceptar valores null")
    public void testValoresNull() {
        CoordenadaUK coord = new CoordenadaUK();
        
        coord.setGeoposicion(null);
        coord.setLunes(null);
        coord.setMartes(null);
        coord.setMiercoles(null);
        coord.setJueves(null);
        coord.setViernes(null);
        coord.setTipoArsenal(null);

        assertNull(coord.getGeoposicion());
        assertNull(coord.getLunes());
        assertNull(coord.getMartes());
        assertNull(coord.getMiercoles());
        assertNull(coord.getJueves());
        assertNull(coord.getViernes());
        assertNull(coord.getTipoArsenal());
    }

    // ==================== PRUEBAS CON VALORES VACÍOS ====================
    
    @Test
    @DisplayName("Coordenada debe aceptar cadenas vacías")
    public void testValoresVacios() {
        CoordenadaUK coord = new CoordenadaUK(
            "", "", "", "", "", "", ""
        );

        assertEquals("", coord.getGeoposicion());
        assertEquals("", coord.getLunes());
        assertEquals("", coord.getMartes());
        assertEquals("", coord.getMiercoles());
        assertEquals("", coord.getJueves());
        assertEquals("", coord.getViernes());
        assertEquals("", coord.getTipoArsenal());
    }

    // ==================== PRUEBAS DE CASOS REALES ====================
    
    @Test
    @DisplayName("Coordenada con datos reales del sistema")
    public void testCoordenadaReal() {
        CoordenadaUK coord = new CoordenadaUK(
            "51.5074N-0.1278W",
            "Londres-Día1",
            "Londres-Día2",
            "Londres-Día3",
            "Londres-Día4",
            "Londres-Día5",
            "ab"
        );

        assertEquals("51.5074N-0.1278W", coord.getGeoposicion());
        assertEquals("Londres-Día1", coord.getLunes());
        assertEquals("ab", coord.getTipoArsenal());
    }
}
