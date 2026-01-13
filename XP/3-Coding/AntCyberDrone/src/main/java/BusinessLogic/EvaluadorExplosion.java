package BusinessLogic;

import BusinessLogic.Entities.CoordenadaUK;

public class EvaluadorExplosion {
    private AutomataDFA automata;

    public EvaluadorExplosion(AutomataDFA automata) {
        this.automata = automata;
    }

    public boolean decidirExplosion(CoordenadaUK coord) {
        if (coord == null || coord.getTipoArsenal() == null) {
            return false;
        }
        return automata.evaluar(coord.getTipoArsenal());
    }
}
