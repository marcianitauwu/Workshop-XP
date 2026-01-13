package BusinessLogic.Entities;

public class Carnivoro extends Alimento {
    public Carnivoro() {
        super("Carne Fresca", "CARNIVORO");
    }

    public void alimentar(Hormiga h) {
        h.setEnergia(h.getEnergia() + 100);
    }
}
