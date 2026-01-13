package BusinessLogic.Entities;

public abstract class Alimento {
    protected int idAlimento;
    protected String nombre;
    protected String tipo;
    protected int disponibilidad;

    public Alimento() {}

    public Alimento(String nombre, String tipo) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.disponibilidad = 100;
    }

    public int getIdAlimento() { return idAlimento; }
    public void setIdAlimento(int idAlimento) { this.idAlimento = idAlimento; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public int getDisponibilidad() { return disponibilidad; }
    public void setDisponibilidad(int disponibilidad) { this.disponibilidad = disponibilidad; }
}
