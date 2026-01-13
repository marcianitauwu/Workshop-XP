package BusinessLogic.Entities;

public class HLarva extends Hormiga {
    public HLarva() {
        super("LARVA");
    }

    @Override
    public void comer(Alimento a) {
        if (a instanceof Nectar) {
            ((Nectar) a).alimentar(this);
        } else if (a instanceof Carnivoro) {
            ((Carnivoro) a).alimentar(this);
            // La larva se transforma en soldado si come carne
        }
    }

    public HSoldado transformarASoldado() {
        HSoldado soldado = new HSoldado();
        soldado.setEnergia(this.energia);
        return soldado;
    }
}
