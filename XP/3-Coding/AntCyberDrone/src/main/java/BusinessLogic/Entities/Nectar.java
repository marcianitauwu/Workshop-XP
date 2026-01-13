package BusinessLogic.Entities;

public class Nectar extends Alimento {
    public Nectar() {
        super("Néctar Premium", "NECTAR");
    }

    public void alimentar(Hormiga h) {
        h.setEnergia(h.getEnergia() + 50);
    }
}
