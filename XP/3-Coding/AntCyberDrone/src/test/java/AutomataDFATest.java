import BusinessLogic.AutomataDFA;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Pruebas unitarias para la clase AutomataDFA
 * Valida los tres patrones: ab*, a+, abcdt+
 */
@DisplayName("Pruebas del Autómata DFA")
public class AutomataDFATest {

    private AutomataDFA automata;

    @BeforeEach
    public void setUp() {
        automata = new AutomataDFA();
    }

    // ==================== PRUEBAS PATRÓN ab* ====================
    
    @Test
    @DisplayName("Patrón ab*: 'a' solo debe aceptarse (cero b's)")
    public void testPatronAB_SoloA() {
        assertTrue(automata.evaluar("a"));
    }

    @Test
    @DisplayName("Patrón ab*: 'ab' debe aceptarse (una b)")
    public void testPatronAB_AB() {
        assertTrue(automata.evaluar("ab"));
    }

    @Test
    @DisplayName("Patrón ab*: 'abb' debe aceptarse (dos b's)")
    public void testPatronAB_ABB() {
        assertTrue(automata.evaluar("abb"));
    }

    @Test
    @DisplayName("Patrón ab*: 'abbbbb' debe aceptarse (muchas b's)")
    public void testPatronAB_MuchasB() {
        assertTrue(automata.evaluar("abbbbb"));
    }

    // ==================== PRUEBAS PATRÓN a+ ====================
    
    @Test
    @DisplayName("Patrón a+: 'a' debe aceptarse (una a)")
    public void testPatronAPlus_UnaA() {
        assertTrue(automata.evaluar("a"));
    }

    @Test
    @DisplayName("Patrón a+: 'aa' debe aceptarse (dos a's)")
    public void testPatronAPlus_DosA() {
        assertTrue(automata.evaluar("aa"));
    }

    @Test
    @DisplayName("Patrón a+: 'aaaa' debe aceptarse (cuatro a's)")
    public void testPatronAPlus_CuatroA() {
        assertTrue(automata.evaluar("aaaa"));
    }

    // ==================== PRUEBAS PATRÓN abcdt+ ====================
    
    @Test
    @DisplayName("Patrón abcdt+: 'abcdt' debe aceptarse (una t)")
    public void testPatronABCDT_UnaT() {
        assertTrue(automata.evaluar("abcdt"));
    }

    @Test
    @DisplayName("Patrón abcdt+: 'abcdtt' debe aceptarse (dos t's)")
    public void testPatronABCDT_DosT() {
        assertTrue(automata.evaluar("abcdtt"));
    }

    @Test
    @DisplayName("Patrón abcdt+: 'abcdtttt' debe aceptarse (cuatro t's)")
    public void testPatronABCDT_CuatroT() {
        assertTrue(automata.evaluar("abcdtttt"));
    }

    // ==================== PRUEBAS NEGATIVAS ====================
    
    @Test
    @DisplayName("Cadena vacía debe rechazarse")
    public void testCadenaVacia() {
        assertFalse(automata.evaluar(""));
    }

    @Test
    @DisplayName("Cadena null debe rechazarse")
    public void testCadenaNula() {
        assertFalse(automata.evaluar(null));
    }

    @Test
    @DisplayName("'b' solo debe rechazarse")
    public void testSoloB() {
        assertFalse(automata.evaluar("b"));
    }

    @Test
    @DisplayName("'abc' debe rechazarse (falta t)")
    public void testABCSinT() {
        assertFalse(automata.evaluar("abc"));
    }

    @Test
    @DisplayName("'abcd' debe rechazarse (falta al menos una t)")
    public void testABCDSinT() {
        assertFalse(automata.evaluar("abcd"));
    }

    @Test
    @DisplayName("'aba' debe rechazarse (contiene 'a' después de 'b' en patrón ab*)")
    public void testABA() {
        assertFalse(automata.evaluar("aba"));
    }

    @Test
    @DisplayName("'aab' debe rechazarse (no cumple ningún patrón)")
    public void testAAB() {
        assertFalse(automata.evaluar("aab"));
    }

    @Test
    @DisplayName("'xyz' debe rechazarse")
    public void testXYZ() {
        assertFalse(automata.evaluar("xyz"));
    }

    @Test
    @DisplayName("'abcda' debe rechazarse (después de abcd solo puede haber t)")
    public void testABCDA() {
        assertFalse(automata.evaluar("abcda"));
    }

    // ==================== PRUEBAS DE CASOS LÍMITE ====================
    
    @Test
    @DisplayName("Muchas 'a's consecutivas deben aceptarse")
    public void testMuchasA() {
        assertTrue(automata.evaluar("aaaaaaaaaa"));
    }

    @Test
    @DisplayName("'a' seguido de muchas 'b's debe aceptarse")
    public void testAConMuchasB() {
        assertTrue(automata.evaluar("abbbbbbbbbb"));
    }

    @Test
    @DisplayName("'abcd' seguido de muchas 't's debe aceptarse")
    public void testABCDConMuchasT() {
        assertTrue(automata.evaluar("abcdtttttttttt"));
    }
}
