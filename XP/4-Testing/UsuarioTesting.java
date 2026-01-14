package Testing;

import BusinessLogic.Entities.Usuario;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class UsuarioTesting {

    @Test
    public void testCrearUsuario() {
        // Arrange
        Usuario usuario = new Usuario("patmic", "123", "Profesor");

        // Act & Assert
        assertEquals("patmic", usuario.getNombre(), "El nombre de usuario no coincide");
        assertEquals("123", usuario.getPassword(), "La contraseña no coincide");
        assertEquals("Profesor", usuario.getRol(), "El rol no coincide");
    }

    @Test
    public void testModificarUsuario() {
        Usuario usuario = new Usuario("temp", "000", "None");
        usuario.setNombre("nuevoNombre");
        usuario.setPassword("nuevaPass");

        assertEquals("nuevoNombre", usuario.getNombre());
        assertEquals("nuevaPass", usuario.getPassword());
    }

    @Test
    public void testUsuarioNoNulo() {
        Usuario usuario = new Usuario("test", "test", "Tester");
        assertNotNull(usuario);
    }
}