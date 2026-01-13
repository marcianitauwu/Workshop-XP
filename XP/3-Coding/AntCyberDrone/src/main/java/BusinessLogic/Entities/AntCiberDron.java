package BusinessLogic.Entities;

public class AntCiberDron extends HSoldado {
    private int idAnt;
    private Metralleta metralleta;
    private Laser laser;
    private TurboReactor turboreactor;
    private FuentePoder fuentePoder;

    public AntCiberDron() {
        super();
        this.fuentePoder = new FuentePoder();
    }

    public int getIdAnt() { return idAnt; }
    public void setIdAnt(int idAnt) { this.idAnt = idAnt; }

    public Metralleta getMetralleta() { return metralleta; }
    public void setMetralleta(Metralleta metralleta) { this.metralleta = metralleta; }

    public Laser getLaser() { return laser; }
    public void setLaser(Laser laser) { this.laser = laser; }

    public TurboReactor getTurboreactor() { return turboreactor; }
    public void setTurboreactor(TurboReactor turboreactor) { this.turboreactor = turboreactor; }

    public FuentePoder getFuentePoder() { return fuentePoder; }
    public void setFuentePoder(FuentePoder fuentePoder) { this.fuentePoder = fuentePoder; }

    public boolean buscarTipoArsenal(String tipo) {
        // Busca si el arsenal es válido
        return tipo != null && !tipo.isEmpty();
    }

    public boolean evaluarExplosion(CoordenadaUK coord) {
        // Evalúa si debe explotar basado en autómata y coordenada
        return coord != null;
    }
}
