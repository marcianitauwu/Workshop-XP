package Testing;

import BusinessLogic.Entities.Hormiga;
import BusinessLogic.Entities.HLarva;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class HormigaTesting {

    @Test
    public void testGestionEnergia() {
        // Arrange: Usamos HLarva ya que Hormiga podría ser abstracta
        Hormiga hormiga = new HLarva(1);

        // Act
        hormiga.setEnergia(100);

        // Assert
        assertEquals(100, hormiga.getEnergia(), "La energía inicial debería ser 100");

        // Act: Cambio de estado
        hormiga.setEnergia(50);

        // Assert
        assertEquals(50, hormiga.getEnergia(), "La energía debería haberse actualizado a 50");
    }

    @Test
    public void testHormigaMuerta() {
        Hormiga hormiga = new HLarva(2);
        hormiga.setEnergia(0);

        assertEquals(0, hormiga.getEnergia());
        // Asumiendo lógica de negocio, energía 0 implica muerte o inactividad
        assertFalse(hormiga.getEnergia() > 0);
    }
}