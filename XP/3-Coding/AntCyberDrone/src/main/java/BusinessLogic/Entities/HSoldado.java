package BusinessLogic.Entities;

public class HSoldado extends Hormiga {
    private boolean tieneLaser;
    private boolean tieneMetralleta;
    private boolean tieneTurboReactor;
    private boolean tieneFuentePoder;

    public HSoldado() {
        super("SOLDADO");
        this.tieneLaser = false;
        this.tieneMetralleta = false;
        this.tieneTurboReactor = false;
        this.tieneFuentePoder = false;
    }

    @Override
    public void comer(Alimento a) {
        if (a instanceof Carnivoro) {
            ((Carnivoro) a).alimentar(this);
        }
    }

    public boolean necesitaCarne() {
        return true;
    }

    // Getters y Setters
    public boolean isTieneLaser() { return tieneLaser; }
    public void setTieneLaser(boolean tieneLaser) { this.tieneLaser = tieneLaser; }

    public boolean isTieneMetralleta() { return tieneMetralleta; }
    public void setTieneMetralleta(boolean tieneMetralleta) { this.tieneMetralleta = tieneMetralleta; }

    public boolean isTieneTurboReactor() { return tieneTurboReactor; }
    public void setTieneTurboReactor(boolean tieneTurboReactor) { this.tieneTurboReactor = tieneTurboReactor; }

    public boolean isTieneFuentePoder() { return tieneFuentePoder; }
    public void setTieneFuentePoder(boolean tieneFuentePoder) { this.tieneFuentePoder = tieneFuentePoder; }

    public String getArmamentoTexto() {
        StringBuilder armamento = new StringBuilder();
        if (tieneLaser) armamento.append("🔫 Láser ");
        if (tieneMetralleta) armamento.append("⚔️ Metralleta ");
        if (tieneTurboReactor) armamento.append("🚀 Turbo ");
        if (tieneFuentePoder) armamento.append("⚡ Fuente ");
        
        return armamento.length() > 0 ? armamento.toString().trim() : "Sin armas";
    }
}
