package BusinessLogic;

import BusinessLogic.Entities.*;
import DataAccess.HormigaDAO;
import java.util.*;

public class HormigueroService {
    private HormigaDAO hormigaDAO;

    public HormigueroService() {
        this.hormigaDAO = new HormigaDAO();
    }

    public HLarva crearLarva() {
        HLarva larva = new HLarva();
        int idGenerado = hormigaDAO.guardar(larva);
        larva.setIdHormiga(idGenerado);
        return larva;
    }

    public void alimentarHormiga(Hormiga hormiga, Alimento alimento) {
        hormiga.comer(alimento);
        hormigaDAO.actualizar(hormiga);
    }

    public HSoldado transformarLarvaASoldado(HLarva larva) {
        HSoldado soldado = larva.transformarASoldado();
        soldado.setIdHormiga(larva.getIdHormiga());
        hormigaDAO.actualizar(soldado);
        return soldado;
    }

    public List<Hormiga> obtenerTodasLasHormigas() {
        return hormigaDAO.obtenerTodas();
    }

    public void eliminarHormiga(int idHormiga) {
        hormigaDAO.eliminar(idHormiga);
    }

    public Hormiga obtenerHormigaPorId(int id) {
        return hormigaDAO.obtenerPorId(id);
    }
}
