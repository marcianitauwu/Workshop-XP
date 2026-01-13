package DataAccess;

import BusinessLogic.Entities.*;
import java.sql.*;
import java.util.*;

public class HormigaDAO {
    private Connection connection;

    public HormigaDAO() {
        this.connection = SQLiteDataHelper.getInstance().getConnection();
    }

    public int guardar(Hormiga hormiga) {
        String sql = "INSERT INTO HORMIGA (tipo, energia, estado, brazo_izquierdo, brazo_derecho, tiene_turboreactor, tiene_fuente_poder) VALUES (?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement pstmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            pstmt.setString(1, hormiga.getTipo());
            pstmt.setDouble(2, hormiga.getEnergia());
            pstmt.setString(3, hormiga.getEstado());
            
            if (hormiga instanceof HSoldado) {
                HSoldado soldado = (HSoldado) hormiga;
                pstmt.setString(4, soldado.isTieneLaser() ? "LASER" : null);
                pstmt.setString(5, soldado.isTieneMetralleta() ? "METRALLETA" : null);
                pstmt.setInt(6, soldado.isTieneTurboReactor() ? 1 : 0);
                pstmt.setInt(7, soldado.isTieneFuentePoder() ? 1 : 0);
            } else {
                pstmt.setString(4, null);
                pstmt.setString(5, null);
                pstmt.setInt(6, 0);
                pstmt.setInt(7, 0);
            }
            
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

    public List<Hormiga> obtenerTodas() {
        List<Hormiga> hormigas = new ArrayList<>();
        String sql = "SELECT * FROM HORMIGA";
        try (Statement stmt = connection.createStatement()) {
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                String tipo = rs.getString("tipo");
                Hormiga h;
                if ("LARVA".equals(tipo)) {
                    h = new HLarva();
                } else {
                    HSoldado soldado = new HSoldado();
                    soldado.setTieneLaser("LASER".equals(rs.getString("brazo_izquierdo")));
                    soldado.setTieneMetralleta("METRALLETA".equals(rs.getString("brazo_derecho")));
                    soldado.setTieneTurboReactor(rs.getInt("tiene_turboreactor") == 1);
                    soldado.setTieneFuentePoder(rs.getInt("tiene_fuente_poder") == 1);
                    h = soldado;
                }
                h.setIdHormiga(rs.getInt("id_hormiga"));
                h.setEnergia(rs.getDouble("energia"));
                h.setEstado(rs.getString("estado"));
                hormigas.add(h);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return hormigas;
    }

    public void actualizar(Hormiga hormiga) {
        String sql = "UPDATE HORMIGA SET tipo = ?, energia = ?, estado = ?, brazo_izquierdo = ?, brazo_derecho = ?, tiene_turboreactor = ?, tiene_fuente_poder = ? WHERE id_hormiga = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, hormiga.getTipo());
            pstmt.setDouble(2, hormiga.getEnergia());
            pstmt.setString(3, hormiga.getEstado());
            
            if (hormiga instanceof HSoldado) {
                HSoldado soldado = (HSoldado) hormiga;
                pstmt.setString(4, soldado.isTieneLaser() ? "LASER" : null);
                pstmt.setString(5, soldado.isTieneMetralleta() ? "METRALLETA" : null);
                pstmt.setInt(6, soldado.isTieneTurboReactor() ? 1 : 0);
                pstmt.setInt(7, soldado.isTieneFuentePoder() ? 1 : 0);
            } else {
                pstmt.setString(4, null);
                pstmt.setString(5, null);
                pstmt.setInt(6, 0);
                pstmt.setInt(7, 0);
            }
            
            pstmt.setInt(8, hormiga.getIdHormiga());
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public Hormiga obtenerPorId(int id) {
        String sql = "SELECT * FROM HORMIGA WHERE id_hormiga = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                String tipo = rs.getString("tipo");
                Hormiga h;
                if ("LARVA".equals(tipo)) {
                    h = new HLarva();
                } else {
                    HSoldado soldado = new HSoldado();
                    soldado.setTieneLaser("LASER".equals(rs.getString("brazo_izquierdo")));
                    soldado.setTieneMetralleta("METRALLETA".equals(rs.getString("brazo_derecho")));
                    soldado.setTieneTurboReactor(rs.getInt("tiene_turboreactor") == 1);
                    soldado.setTieneFuentePoder(rs.getInt("tiene_fuente_poder") == 1);
                    h = soldado;
                }
                h.setIdHormiga(rs.getInt("id_hormiga"));
                h.setEnergia(rs.getDouble("energia"));
                h.setEstado(rs.getString("estado"));
                return h;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public void eliminar(int idHormiga) {
        String sql = "DELETE FROM HORMIGA WHERE id_hormiga = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, idHormiga);
            pstmt.executeUpdate();
            System.out.println("[DAO] Hormiga eliminada: " + idHormiga);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
