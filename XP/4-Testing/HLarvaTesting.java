package Testing;

import BusinessLogic.Entities.HLarva;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class HLarvaTesting {

    @Test
    public void testCreacionLarva() {
        // Arrange & Act
        HLarva larva = new HLarva(10);

        // Assert
        assertEquals(10, larva.getId(), "El ID de la larva no es correcto");
        assertNotNull(larva.getTipo(), "El tipo de hormiga no debería ser nulo");
    }

    @Test
    public void testTipoLarvaCorrecto() {
        HLarva larva = new HLarva(11);
        // Verificamos que el tipo sea consistente (dependiendo de la implementación
        // toString o getTipo)
        assertNotNull(larva.toString());
    }
}