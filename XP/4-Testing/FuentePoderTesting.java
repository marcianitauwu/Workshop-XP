package Testing;

import BusinessLogic.Entities.FuentePoder;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class FuentePoderTesting {

    @Test
    public void testInstanciaFuentePoder() {
        // Act
        FuentePoder fp = new FuentePoder();

        // Assert
        assertNotNull(fp, "La instancia de FuentePoder no debería ser nula");
    }

    @Test
    public void testIntegridadObjeto() {
        FuentePoder fp = new FuentePoder();
        // Validar que no lance excepciones al instanciar
        assertDoesNotThrow(() -> new FuentePoder());
    }
}