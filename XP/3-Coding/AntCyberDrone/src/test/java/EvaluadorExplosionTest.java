import BusinessLogic.AutomataDFA;
import BusinessLogic.EvaluadorExplosion;
import BusinessLogic.Entities.CoordenadaUK;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Pruebas unitarias para la clase EvaluadorExplosion
 * Valida la lógica de decisión de explosión basada en el tipo de arsenal
 */
@DisplayName("Pruebas del Evaluador de Explosión")
public class EvaluadorExplosionTest {

    private EvaluadorExplosion evaluador;
    private AutomataDFA automata;

    @BeforeEach
    public void setUp() {
        automata = new AutomataDFA();
        evaluador = new EvaluadorExplosion(automata);
    }

    // ==================== PRUEBAS DE ARSENALES QUE EXPLOTAN ====================
    
    @Test
    @DisplayName("Arsenal tipo 'a' debe explotar")
    public void testArsenalA_Explota() {
        CoordenadaUK coord = new CoordenadaUK("UK-001", "10", "20", "30", "40", "50", "a");
        assertTrue(evaluador.decidirExplosion(coord));
    }

    @Test
    @DisplayName("Arsenal tipo 'ab' debe explotar")
    public void testArsenalAB_Explota() {
        CoordenadaUK coord = new CoordenadaUK("UK-002", "15", "25", "35", "45", "55", "ab");
        assertTrue(evaluador.decidirExplosion(coord));
    }

    @Test
    @DisplayName("Arsenal tipo 'abb' debe explotar")
    public void testArsenalABB_Explota() {
        CoordenadaUK coord = new CoordenadaUK("UK-003", "12", "22", "32", "42", "52", "abb");
        assertTrue(evaluador.decidirExplosion(coord));
    }

    @Test
    @DisplayName("Arsenal tipo 'aa' debe explotar")
    public void testArsenalAA_Explota() {
        CoordenadaUK coord = new CoordenadaUK("UK-004", "11", "21", "31", "41", "51", "aa");
        assertTrue(evaluador.decidirExplosion(coord));
    }

    @Test
    @DisplayName("Arsenal tipo 'abcdt' debe explotar")
    public void testArsenalABCDT_Explota() {
        CoordenadaUK coord = new CoordenadaUK("UK-005", "13", "23", "33", "43", "53", "abcdt");
        assertTrue(evaluador.decidirExplosion(coord));
    }

    @Test
    @DisplayName("Arsenal tipo 'abcdtt' debe explotar")
    public void testArsenalABCDTT_Explota() {
        CoordenadaUK coord = new CoordenadaUK("UK-006", "14", "24", "34", "44", "54", "abcdtt");
        assertTrue(evaluador.decidirExplosion(coord));
    }

    // ==================== PRUEBAS DE ARSENALES QUE NO EXPLOTAN ====================
    
    @Test
    @DisplayName("Arsenal tipo 'xyz' no debe explotar")
    public void testArsenalXYZ_NoExplota() {
        CoordenadaUK coord = new CoordenadaUK("UK-007", "16", "26", "36", "46", "56", "xyz");
        assertFalse(evaluador.decidirExplosion(coord));
    }

    @Test
    @DisplayName("Arsenal tipo 'abc' no debe explotar")
    public void testArsenalABC_NoExplota() {
        CoordenadaUK coord = new CoordenadaUK("UK-008", "17", "27", "37", "47", "57", "abc");
        assertFalse(evaluador.decidirExplosion(coord));
    }

    @Test
    @DisplayName("Arsenal tipo 'abcd' no debe explotar (falta t)")
    public void testArsenalABCD_NoExplota() {
        CoordenadaUK coord = new CoordenadaUK("UK-009", "18", "28", "38", "48", "58", "abcd");
        assertFalse(evaluador.decidirExplosion(coord));
    }

    @Test
    @DisplayName("Arsenal tipo 'b' no debe explotar")
    public void testArsenalB_NoExplota() {
        CoordenadaUK coord = new CoordenadaUK("UK-010", "19", "29", "39", "49", "59", "b");
        assertFalse(evaluador.decidirExplosion(coord));
    }

    // ==================== PRUEBAS DE CASOS ESPECIALES ====================
    
    @Test
    @DisplayName("Coordenada null no debe explotar")
    public void testCoordenadaNull_NoExplota() {
        assertFalse(evaluador.decidirExplosion(null));
    }

    @Test
    @DisplayName("Arsenal null no debe explotar")
    public void testArsenalNull_NoExplota() {
        CoordenadaUK coord = new CoordenadaUK("UK-011", "10", "20", "30", "40", "50", null);
        assertFalse(evaluador.decidirExplosion(coord));
    }

    @Test
    @DisplayName("Arsenal vacío no debe explotar")
    public void testArsenalVacio_NoExplota() {
        CoordenadaUK coord = new CoordenadaUK("UK-012", "10", "20", "30", "40", "50", "");
        assertFalse(evaluador.decidirExplosion(coord));
    }

    // ==================== PRUEBAS DE INTEGRACIÓN ====================
    
    @Test
    @DisplayName("Arsenal complejo 'abbbbb' debe explotar")
    public void testArsenalComplejoAB_Explota() {
        CoordenadaUK coord = new CoordenadaUK("UK-013", "10", "20", "30", "40", "50", "abbbbb");
        assertTrue(evaluador.decidirExplosion(coord));
    }

    @Test
    @DisplayName("Arsenal complejo 'aaaaaa' debe explotar")
    public void testArsenalComplejoA_Explota() {
        CoordenadaUK coord = new CoordenadaUK("UK-014", "10", "20", "30", "40", "50", "aaaaaa");
        assertTrue(evaluador.decidirExplosion(coord));
    }

    @Test
    @DisplayName("Arsenal complejo 'abcdttttt' debe explotar")
    public void testArsenalComplejoABCDT_Explota() {
        CoordenadaUK coord = new CoordenadaUK("UK-015", "10", "20", "30", "40", "50", "abcdttttt");
        assertTrue(evaluador.decidirExplosion(coord));
    }
}
