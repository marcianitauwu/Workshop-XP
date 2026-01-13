package BusinessLogic.Entities;

public class TurboReactor extends Armamento {
    private double velocidadMaxima;
    private boolean volando;

    public TurboReactor() {
        super("TurboReactor V2", "TURBOREACTOR");
        this.velocidadMaxima = 250.0; // km/h
        this.volando = false;
    }

    public double getVelocidadMaxima() { return velocidadMaxima; }
    public void setVelocidadMaxima(double velocidadMaxima) { this.velocidadMaxima = velocidadMaxima; }

    public boolean isVolando() { return volando; }
    public void setVolando(boolean volando) { this.volando = volando; }

    public void volar() {
        this.volando = true;
        this.activo = true;
    }

    public void aterrizar() {
        this.volando = false;
        this.activo = false;
    }

    @Override
    public void usar() {
        if (!volando) {
            volar();
        } else {
            aterrizar();
        }
    }
}
