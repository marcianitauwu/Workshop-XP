package Testing;

import BusinessLogic.Entities.HSoldado;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class HSoldadoTesting {

    @Test
    public void testSoldadoVivo() {
        // Arrange
        HSoldado soldado = new HSoldado(5);

        // Act
        soldado.setEnergia(200);

        // Assert
        assertEquals(5, soldado.getId());
        assertTrue(soldado.getEnergia() > 0, "El soldado debería estar vivo (energía > 0)");
    }

    @Test
    public void testSoldadoIdentidad() {
        HSoldado s1 = new HSoldado(1);
        HSoldado s2 = new HSoldado(2);

        assertNotEquals(s1.getId(), s2.getId());
    }
}