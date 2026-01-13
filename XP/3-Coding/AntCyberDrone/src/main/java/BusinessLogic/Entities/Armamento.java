package BusinessLogic.Entities;

public abstract class Armamento {
    protected int idArmamento;
    protected String nombre;
    protected String tipo;
    protected boolean activo;

    public Armamento(String nombre, String tipo) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.activo = true;
    }

    public int getIdArmamento() { return idArmamento; }
    public void setIdArmamento(int idArmamento) { this.idArmamento = idArmamento; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public boolean isActivo() { return activo; }
    public void setActivo(boolean activo) { this.activo = activo; }

    public abstract void usar();
}
