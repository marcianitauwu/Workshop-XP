package BusinessLogic;

import BusinessLogic.Entities.CoordenadaUK;

public class BBAService {
    private EvaluadorExplosion evaluador;

    public BBAService(EvaluadorExplosion evaluador) {
        this.evaluador = evaluador;
    }

    public String mostrarCoordenadaExplota(CoordenadaUK coord) {
        if (evaluador.decidirExplosion(coord)) {
            return "COORDENADA: " + coord.getGeoposicion() + " | Arsenal: " + coord.getTipoArsenal() + " | ¡EXPLOTA!";
        } else {
            return "COORDENADA: " + coord.getGeoposicion() + " | No explota";
        }
    }
}
