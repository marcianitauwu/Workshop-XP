package Testing;

import BusinessLogic.Entities.Carnivoro;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CarnivoroTesting {

    @Test
    public void testInstanciaCarnivoro() {
        // Act
        Carnivoro carne = new Carnivoro();

        // Assert
        assertNotNull(carne, "La instancia de Carnivoro no debería ser nula");
    }

    @Test
    public void testEsAlimento() {
        Carnivoro carne = new Carnivoro();
        assertTrue(carne instanceof BusinessLogic.Entities.Alimento);
    }
}