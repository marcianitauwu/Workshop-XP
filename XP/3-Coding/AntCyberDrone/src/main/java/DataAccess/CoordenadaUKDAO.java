package DataAccess;

import BusinessLogic.Entities.CoordenadaUK;
import java.sql.*;
import java.util.*;

public class CoordenadaUKDAO {
    private Connection connection;

    public CoordenadaUKDAO() {
        this.connection = SQLiteDataHelper.getInstance().getConnection();
    }

    public void guardar(CoordenadaUK coord) {
        String sql = "INSERT INTO COORDENADA_UK (geoposicion, lunes, martes, miercoles, jueves, viernes, tipo_arsenal, w) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, coord.getGeoposicion());
            pstmt.setString(2, coord.getLunes());
            pstmt.setString(3, coord.getMartes());
            pstmt.setString(4, coord.getMiercoles());
            pstmt.setString(5, coord.getJueves());
            pstmt.setString(6, coord.getViernes());
            pstmt.setString(7, coord.getTipoArsenal());
            pstmt.setString(8, null); // o usa otro valor si w es diferente
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<CoordenadaUK> obtenerTodas() {
        List<CoordenadaUK> coords = new ArrayList<>();
        String sql = "SELECT * FROM COORDENADA_UK";
        try (Statement stmt = connection.createStatement()) {
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                CoordenadaUK coord = new CoordenadaUK();
                coord.setGeoposicion(rs.getString("geoposicion"));
                coord.setLunes(rs.getString("lunes"));
                coord.setMartes(rs.getString("martes"));
                coord.setMiercoles(rs.getString("miercoles"));
                coord.setJueves(rs.getString("jueves"));
                coord.setViernes(rs.getString("viernes"));
                coord.setTipoArsenal(rs.getString("tipo_arsenal"));
                coords.add(coord);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return coords;
    }

    public CoordenadaUK obtenerPorId(int id) {
        String sql = "SELECT * FROM COORDENADA_UK WHERE id_coord = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                CoordenadaUK coord = new CoordenadaUK();
                coord.setGeoposicion(rs.getString("geoposicion"));
                coord.setLunes(rs.getString("lunes"));
                coord.setMartes(rs.getString("martes"));
                coord.setMiercoles(rs.getString("miercoles"));
                coord.setJueves(rs.getString("jueves"));
                coord.setViernes(rs.getString("viernes"));
                coord.setTipoArsenal(rs.getString("tipo_arsenal"));
                return coord;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
