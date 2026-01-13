package BusinessLogic.Entities;

public class FuentePoder extends Armamento {
    private double capacidad;
    private double cargaActual;

    public FuentePoder() {
        super("Fuente de Poder Nuclear", "FUENTE_PODER");
        this.capacidad = 500.0;
        this.cargaActual = 500.0;
    }

    public FuentePoder(double capacidad) {
        super("Fuente de Poder Nuclear", "FUENTE_PODER");
        this.capacidad = capacidad;
        this.cargaActual = capacidad;
    }

    public double getCapacidad() { return capacidad; }
    public void setCapacidad(double capacidad) { this.capacidad = capacidad; }

    public double getCargaActual() { return cargaActual; }
    public void setCargaActual(double cargaActual) { this.cargaActual = cargaActual; }

    public void recargar() {
        this.cargaActual = this.capacidad;
    }

    public void reemplazar(double nuevaCapacidad) {
        this.capacidad = nuevaCapacidad;
        this.cargaActual = nuevaCapacidad;
    }

    public void consumir(double cantidad) {
        if (this.cargaActual >= cantidad) {
            this.cargaActual -= cantidad;
        }
    }

    @Override
    public void usar() {
        // La fuente de poder se usa pasivamente
    }
}
