package BusinessLogic;

import DataAccess.UsuarioDAO;
import BusinessLogic.Entities.Usuario;

public class AuthService {
    private UsuarioDAO usuarioDAO;

    public AuthService() {
        this.usuarioDAO = new UsuarioDAO();
    }

    public boolean usuarioExiste(String username) {
        Usuario usuario = usuarioDAO.buscarPorUsername(username);
        return usuario != null;
    }

    public boolean autenticarse(String username, String password) {
        System.out.println("\n========================================");
        System.out.println("INTENTO DE LOGIN: " + username);
        System.out.println("========================================");
        
        Usuario usuario = usuarioDAO.buscarPorUsername(username);
        if (usuario == null) {
            System.out.println("❌ Usuario no existe");
            return false;
        }

        int idUsuario = usuario.getIdUsuario();
        
        // Garantizar registro existe
        usuarioDAO.garantizarRegistroControl(idUsuario);
        
        // Verificar bloqueo PRIMERO
        if (usuarioDAO.estasBloqueado(idUsuario)) {
            System.out.println("🚫 BLOQUEADO - Acceso denegado");
            System.out.println("========================================\n");
            return false;
        }

        // Verificar password
        if (usuario.getPassword().equals(password)) {
            // ✅ LOGIN EXITOSO
            System.out.println("✅ PASSWORD CORRECTO");
            usuarioDAO.desbloquearUsuario(idUsuario);
            System.out.println("========================================\n");
            return true;
        } else {
            // ❌ PASSWORD INCORRECTO
            System.out.println("❌ PASSWORD INCORRECTO");
            
            int intentosActuales = usuarioDAO.getIntentosRestantes(idUsuario);
            System.out.println("Intentos antes: " + intentosActuales);
            
            intentosActuales--;
            System.out.println("Intentos después: " + intentosActuales);
            
            usuarioDAO.actualizarIntentos(idUsuario, intentosActuales);
            
            if (intentosActuales <= 0) {
                System.out.println("⛔ BLOQUEANDO CUENTA");
                usuarioDAO.bloquearUsuario(idUsuario);
            }
            
            System.out.println("========================================\n");
            return false;
        }
    }

    public int getIntentosRestantes(String username) {
        Usuario usuario = usuarioDAO.buscarPorUsername(username);
        if (usuario != null) {
            return usuarioDAO.getIntentosRestantes(usuario.getIdUsuario());
        }
        return 3;
    }

    public boolean estasBloqueado(String username) {
        Usuario usuario = usuarioDAO.buscarPorUsername(username);
        if (usuario != null) {
            return usuarioDAO.estasBloqueado(usuario.getIdUsuario());
        }
        return false;
    }
}
