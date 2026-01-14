package Testing;

import BusinessLogic.Entities.Alimento;
import BusinessLogic.Entities.Nectar;
import BusinessLogic.Entities.Carnivoro;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class AlimentoTesting {

    @Test
    public void testPolimorfismoAlimento() {
        // Arrange: Usamos Nectar como implementación concreta
        Alimento alimento = new Nectar();

        // Assert
        assertNotNull(alimento);
        assertTrue(alimento instanceof Nectar, "El alimento debería ser instancia de Nectar");
    }

    @Test
    public void testTiposAlimento() {
        Alimento n = new Nectar();
        Alimento c = new Carnivoro();

        assertNotSame(n.getClass(), c.getClass());
    }
}