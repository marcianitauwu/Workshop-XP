package Testing;

import BusinessLogic.Entities.Nectar;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class NectarTesting {

    @Test
    public void testInstanciaNectar() {
        // Act
        Nectar nectar = new Nectar();

        // Assert
        assertNotNull(nectar, "La instancia de Nectar no debería ser nula");
    }

    @Test
    public void testPropiedadesNectar() {
        Nectar nectar = new Nectar();
        // Verificar si tiene propiedades específicas en el futuro
        assertTrue(nectar instanceof BusinessLogic.Entities.Alimento);
    }
}