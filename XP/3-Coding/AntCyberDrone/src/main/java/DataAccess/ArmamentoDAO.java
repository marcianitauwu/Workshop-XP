package DataAccess;

import BusinessLogic.Entities.*;
import java.sql.*;
import java.util.*;

public class ArmamentoDAO {
    private Connection connection;

    public ArmamentoDAO() {
        this.connection = SQLiteDataHelper.getInstance().getConnection();
    }

    public int guardar(Armamento armamento, int idHormiga) {
        String sql = "INSERT INTO ARMAMENTO (id_hormiga, tipo, nombre, activo) VALUES (?, ?, ?, ?)";
        try (PreparedStatement pstmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            pstmt.setInt(1, idHormiga);
            pstmt.setString(2, armamento.getTipo());
            pstmt.setString(3, armamento.getNombre());
            pstmt.setInt(4, armamento.isActivo() ? 1 : 0);
            pstmt.executeUpdate();

            ResultSet rs = pstmt.getGeneratedKeys();
            if (rs.next()) {
                return rs.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return -1;
    }

    public List<Armamento> obtenerPorHormiga(int idHormiga) {
        List<Armamento> armamentos = new ArrayList<>();
        String sql = "SELECT * FROM ARMAMENTO WHERE id_hormiga = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, idHormiga);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                Armamento armamento = null;
                String tipo = rs.getString("tipo");
                
                switch (tipo) {
                    case "METRALLETA":
                        armamento = new Metralleta();
                        break;
                    case "LASER":
                        armamento = new Laser();
                        break;
                    case "TURBOREACTOR":
                        armamento = new TurboReactor();
                        break;
                    case "FUENTE_PODER":
                        armamento = new FuentePoder();
                        break;
                }
                
                if (armamento != null) {
                    armamento.setIdArmamento(rs.getInt("id_armamento"));
                    armamento.setActivo(rs.getInt("activo") == 1);
                    armamentos.add(armamento);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return armamentos;
    }

    public void eliminarPorHormiga(int idHormiga) {
        String sql = "DELETE FROM ARMAMENTO WHERE id_hormiga = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, idHormiga);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void actualizar(Armamento armamento) {
        String sql = "UPDATE ARMAMENTO SET activo = ? WHERE id_armamento = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, armamento.isActivo() ? 1 : 0);
            pstmt.setInt(2, armamento.getIdArmamento());
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
