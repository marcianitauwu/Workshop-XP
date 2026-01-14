package Testing;

import BusinessLogic.Entities.Metralleta;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class MetralletaTesting {

    @Test
    public void testInstanciaMetralleta() {
        // Act
        Metralleta arma = new Metralleta();

        // Assert
        assertNotNull(arma, "La instancia de Metralleta no debería ser nula");
    }

    @Test
    public void testUsoArma() {
        Metralleta arma = new Metralleta();
        // Futuro: testear daño o munición
        assertNotNull(arma);
    }
}