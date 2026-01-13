package BusinessLogic.Entities;

public class Laser extends Armamento {
    private double potencia;
    private double energiaActual;
    private double energiaMaxima;

    public Laser() {
        super("Láser Energético", "LASER");
        this.potencia = 100.0;
        this.energiaMaxima = 500.0;
        this.energiaActual = 500.0;
    }

    public double getPotencia() { return potencia; }
    public void setPotencia(double potencia) { this.potencia = potencia; }

    public double getEnergiaActual() { return energiaActual; }
    public void setEnergiaActual(double energiaActual) { this.energiaActual = energiaActual; }

    public double getEnergiaMaxima() { return energiaMaxima; }
    public void setEnergiaMaxima(double energiaMaxima) { this.energiaMaxima = energiaMaxima; }

    public void disparar() {
        if (energiaActual >= potencia) {
            energiaActual -= potencia;
        }
    }

    public void recargar() {
        this.energiaActual = this.energiaMaxima;
    }

    @Override
    public void usar() {
        disparar();
    }
}
