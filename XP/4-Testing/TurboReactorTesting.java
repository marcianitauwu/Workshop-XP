package Testing;

import BusinessLogic.Entities.TurboReactor;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class TurboReactorTesting {

    @Test
    public void testInstanciaTurboReactor() {
        // Act
        TurboReactor tr = new TurboReactor();

        // Assert
        assertNotNull(tr, "La instancia de TurboReactor no debería ser nula");
    }

    @Test
    public void testReactorEstado() {
        TurboReactor tr = new TurboReactor();
        // Validar estado inicial si tuviera propiedades
        assertNotNull(tr);
    }
}