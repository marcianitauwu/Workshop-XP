package BusinessLogic.Entities;

public abstract class Hormiga {
    protected int idHormiga;
    protected double energia;
    protected String estado;
    protected String tipo;

    public Hormiga() {}

    public Hormiga(String tipo) {
        this.tipo = tipo;
        this.energia = 100.0;
        this.estado = "ACTIVA";
    }

    public int getIdHormiga() { return idHormiga; }
    public void setIdHormiga(int idHormiga) { this.idHormiga = idHormiga; }

    public double getEnergia() { return energia; }
    public void setEnergia(double energia) { this.energia = energia; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public abstract void comer(Alimento a);
}
