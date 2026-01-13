package BusinessLogic.Entities;

public class Metralleta extends Armamento {
    private double municion;
    private int cadenciaDisparo;

    public Metralleta() {
        super("Metralleta M16", "METRALLETA");
        this.municion = 300;
        this.cadenciaDisparo = 600; // disparos por minuto
    }

    public double getMunicion() { return municion; }
    public void setMunicion(double municion) { this.municion = municion; }

    public int getCadenciaDisparo() { return cadenciaDisparo; }
    public void setCadenciaDisparo(int cadenciaDisparo) { this.cadenciaDisparo = cadenciaDisparo; }

    public void disparar(double cantidad) {
        if (this.municion >= cantidad) {
            this.municion -= cantidad;
        }
    }

    public void recargar() {
        this.municion = 300;
    }

    @Override
    public void usar() {
        disparar(1);
    }
}
