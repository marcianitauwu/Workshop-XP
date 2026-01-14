package Testing;

import BusinessLogic.Entities.AntCiberDron;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class AntCiberDronTesting {

    @Test
    public void testInstanciaDron() {
        // Act
        AntCiberDron dron = new AntCiberDron();

        // Assert
        assertNotNull(dron, "La instancia de AntCiberDron no debería ser nula");
    }

    @Test
    public void testFuncionalidadBase() {
        AntCiberDron dron = new AntCiberDron();
        // Aquí se agregarían pruebas específicas si AntCiberDron tuviera métodos
        // públicos de lógica
        assertNotNull(dron.getClass().getSimpleName());
    }
}