package BusinessLogic;

public class AutomataDFA {
    
    public AutomataDFA() {}

    /**
     * Evalúa si la cadena cumple con alguno de los patrones: ab*, a+, abcdt+
     * @param w Cadena a evaluar (tipo arsenal)
     * @return true si cumple con algún patrón
     */
    public boolean evaluar(String w) {
        if (w == null || w.isEmpty()) {
            return false;
        }

        // Patrón 1: ab* (a seguido de cero o más b)
        if (cumplePatronAB(w)) {
            System.out.println("  ✓ Cumple patrón ab*: " + w);
            return true;
        }

        // Patrón 2: a+ (una o más a)
        if (cumplePatronAPlus(w)) {
            System.out.println("  ✓ Cumple patrón a+: " + w);
            return true;
        }

        // Patrón 3: abcdt+ (abcd seguido de una o más t)
        if (cumplePatronABCDT(w)) {
            System.out.println("  ✓ Cumple patrón abcdt+: " + w);
            return true;
        }

        System.out.println("  ✗ No cumple ningún patrón: " + w);
        return false;
    }

    /**
     * Patrón ab*: 'a' seguido de cero o más 'b'
     */
    private boolean cumplePatronAB(String w) {
        if (!w.startsWith("a")) {
            return false;
        }
        // Después de 'a', solo puede haber 'b' o nada
        for (int i = 1; i < w.length(); i++) {
            if (w.charAt(i) != 'b') {
                return false;
            }
        }
        return true;
    }

    /**
     * Patrón a+: una o más 'a'
     */
    private boolean cumplePatronAPlus(String w) {
        if (w.length() == 0) {
            return false;
        }
        // Todas deben ser 'a'
        for (char c : w.toCharArray()) {
            if (c != 'a') {
                return false;
            }
        }
        return true;
    }

    /**
     * Patrón abcdt+: 'abcd' seguido de una o más 't'
     */
    private boolean cumplePatronABCDT(String w) {
        if (w.length() < 5) { // Mínimo "abcdt"
            return false;
        }
        // Debe empezar con "abcd"
        if (!w.startsWith("abcd")) {
            return false;
        }
        // Después solo puede haber 't'
        for (int i = 4; i < w.length(); i++) {
            if (w.charAt(i) != 't') {
                return false;
            }
        }
        return true;
    }
}
