package Testing;

import BusinessLogic.Entities.CoordenadaUK;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CoordenadaUKTesting {

    @Test
    public void testSetGetGeoposicion() {
        // Arrange
        CoordenadaUK coord = new CoordenadaUK();

        // Act
        coord.setGeoposicion("100,200");
        coord.setTipoArsenal("ab*");

        // Assert
        assertEquals("100,200", coord.getGeoposicion());
        assertEquals("ab*", coord.getTipoArsenal());
    }

    @Test
    public void testValoresVacios() {
        CoordenadaUK coord = new CoordenadaUK();
        coord.setGeoposicion("");
        coord.setTipoArsenal("");

        assertTrue(coord.getGeoposicion().isEmpty());
        assertTrue(coord.getTipoArsenal().isEmpty());
    }
}