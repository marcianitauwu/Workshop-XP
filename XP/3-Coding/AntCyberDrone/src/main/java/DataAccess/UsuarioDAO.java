package DataAccess;

import BusinessLogic.Entities.Usuario;
import java.sql.*;

public class UsuarioDAO {
    private Connection connection;

    public UsuarioDAO() {
        this.connection = SQLiteDataHelper.getInstance().getConnection();
    }

    public Usuario buscarPorUsername(String username) {
        String sql = "SELECT * FROM USUARIO WHERE username = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, username);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                return new Usuario(rs.getInt("id_usuario"), rs.getString("username"),
                        rs.getString("password"), rs.getString("rol"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public void garantizarRegistroControl(int idUsuario) {
        String checkSql = "SELECT COUNT(*) FROM CONTROL_LOGIN WHERE id_usuario = ?";
        String insertSql = "INSERT INTO CONTROL_LOGIN (id_usuario, intentos_restantes, bloqueado) VALUES (?, 3, 0)";
        
        try {
            // Verificar si existe
            try (PreparedStatement checkStmt = connection.prepareStatement(checkSql)) {
                checkStmt.setInt(1, idUsuario);
                ResultSet rs = checkStmt.executeQuery();
                if (rs.next() && rs.getInt(1) == 0) {
                    // No existe, insertar
                    try (PreparedStatement insertStmt = connection.prepareStatement(insertSql)) {
                        insertStmt.setInt(1, idUsuario);
                        insertStmt.executeUpdate();
                        System.out.println("[DAO] Registro de control creado para usuario " + idUsuario);
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public int getIntentosRestantes(int idUsuario) {
        garantizarRegistroControl(idUsuario);
        
        String sql = "SELECT intentos_restantes FROM CONTROL_LOGIN WHERE id_usuario = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, idUsuario);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                int intentos = rs.getInt("intentos_restantes");
                System.out.println("[DAO] Intentos restantes para usuario " + idUsuario + ": " + intentos);
                return intentos;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 3;
    }

    public void actualizarIntentos(int idUsuario, int intentos) {
        String sql = "UPDATE CONTROL_LOGIN SET intentos_restantes = ?, ultimo_intento = datetime('now') WHERE id_usuario = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, intentos);
            pstmt.setInt(2, idUsuario);
            int rows = pstmt.executeUpdate();
            System.out.println("[DAO] Intentos actualizados a " + intentos + " para usuario " + idUsuario + " (filas afectadas: " + rows + ")");
            
            // Verificar inmediatamente
            int verificacion = getIntentosRestantes(idUsuario);
            if (verificacion != intentos) {
                System.err.println("[DAO ERROR] ¡La actualización no persistió! Esperado: " + intentos + ", Obtenido: " + verificacion);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void bloquearUsuario(int idUsuario) {
        String sql = "UPDATE CONTROL_LOGIN SET bloqueado = 1, intentos_restantes = 0 WHERE id_usuario = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, idUsuario);
            int rows = pstmt.executeUpdate();
            System.out.println("[DAO] Usuario " + idUsuario + " BLOQUEADO (filas afectadas: " + rows + ")");
            
            // Verificar bloqueo
            boolean verificacion = estasBloqueado(idUsuario);
            if (!verificacion) {
                System.err.println("[DAO ERROR] ¡El bloqueo no persistió!");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public boolean estasBloqueado(int idUsuario) {
        garantizarRegistroControl(idUsuario);
        
        String sql = "SELECT bloqueado FROM CONTROL_LOGIN WHERE id_usuario = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, idUsuario);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                boolean bloqueado = rs.getInt("bloqueado") == 1;
                System.out.println("[DAO] Usuario " + idUsuario + " bloqueado: " + bloqueado);
                return bloqueado;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public void desbloquearUsuario(int idUsuario) {
        String sql = "UPDATE CONTROL_LOGIN SET bloqueado = 0, intentos_restantes = 3 WHERE id_usuario = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, idUsuario);
            pstmt.executeUpdate();
            System.out.println("[DAO] Usuario " + idUsuario + " desbloqueado y reseteado a 3 intentos");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

