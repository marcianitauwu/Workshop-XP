package BusinessLogic.Entities;

public class CoordenadaUK {
    private String geoposicion;
    private String lunes;
    private String martes;
    private String miercoles;
    private String jueves;
    private String viernes;
    private String tipoArsenal;
    private boolean explota;

    public CoordenadaUK() {}

    public CoordenadaUK(String geoposicion, String lunes, String martes, String miercoles,
                        String jueves, String viernes, String tipoArsenal) {
        this.geoposicion = geoposicion;
        this.lunes = lunes;
        this.martes = martes;
        this.miercoles = miercoles;
        this.jueves = jueves;
        this.viernes = viernes;
        this.tipoArsenal = tipoArsenal;
        this.explota = false;
    }

    public String getGeoposicion() { return geoposicion; }
    public void setGeoposicion(String geoposicion) { this.geoposicion = geoposicion; }

    public String getLunes() { return lunes; }
    public void setLunes(String lunes) { this.lunes = lunes; }

    public String getMartes() { return martes; }
    public void setMartes(String martes) { this.martes = martes; }

    public String getMiercoles() { return miercoles; }
    public void setMiercoles(String miercoles) { this.miercoles = miercoles; }

    public String getJueves() { return jueves; }
    public void setJueves(String jueves) { this.jueves = jueves; }

    public String getViernes() { return viernes; }
    public void setViernes(String viernes) { this.viernes = viernes; }

    public String getTipoArsenal() { return tipoArsenal; }
    public void setTipoArsenal(String tipoArsenal) { this.tipoArsenal = tipoArsenal; }

    public boolean isExplota() { return explota; }
    public void setExplota(boolean explota) { this.explota = explota; }

    @Override
    public String toString() {
        return geoposicion + " | Arsenal: " + tipoArsenal + (explota ? " ☢️ EXPLOTA" : " ✓ No explota");
    }
}
