package Testing;

import BusinessLogic.Entities.Laser;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class LaserTesting {

    @Test
    public void testInstanciaLaser() {
        // Act
        Laser arma = new Laser();

        // Assert
        assertNotNull(arma, "La instancia de Laser no debería ser nula");
    }

    @Test
    public void testLaserOperativo() {
        Laser arma = new Laser();
        assertDoesNotThrow(() -> arma.toString());
    }
}