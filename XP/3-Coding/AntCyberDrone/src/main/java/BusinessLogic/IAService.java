package BusinessLogic;

public class IAService implements InteligenciaArtificial {
    @Override
    public boolean buscarTipoArsenal(String tipoArsenal) {
        return tipoArsenal != null && !tipoArsenal.isEmpty();
    }

    public boolean validarArsenal(String tipoArsenal) {
        String[] arsenalesValidos = {"METRALLETA", "LASER", "TURBOREACTOR", "FUENTE_PODER"};
        for (String arsenal : arsenalesValidos) {
            if (arsenal.equals(tipoArsenal.toUpperCase())) {
                return true;
            }
        }
        return false;
    }
}
