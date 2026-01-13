package BusinessLogic;

import BusinessLogic.Entities.CoordenadaUK;
import java.io.*;
import java.util.*;

public class CSVService {
    private AutomataDFA automata;

    public CSVService() {
        this.automata = new AutomataDFA();
    }

    /**
     * Carga el CSV y procesa las coordenadas en MEMORIA (no guarda en BD)
     * @param path Ruta del archivo CSV
     * @return Lista de coordenadas procesadas
     */
    public List<CoordenadaUK> cargarYProcesarCSV(String path) {
        List<CoordenadaUK> coordenadas = new ArrayList<>();
        
        System.out.println("\n========================================");
        System.out.println("CARGANDO CSV: " + path);
        System.out.println("========================================");

        try (BufferedReader br = new BufferedReader(new FileReader(path))) {
            String linea;
            boolean primeraLinea = true;
            int numeroLinea = 0;

            while ((linea = br.readLine()) != null) {
                numeroLinea++;
                
                // Saltar la cabecera
                if (primeraLinea) {
                    primeraLinea = false;
                    System.out.println("Cabecera: " + linea);
                    continue;
                }

                // Dividir por punto y coma (;)
                String[] partes = linea.split(";");
                
                if (partes.length >= 7) {
                    String geoposicion = partes[0].trim();
                    String lunes = partes[1].trim();
                    String martes = partes[2].trim();
                    String miercoles = partes[3].trim();
                    String jueves = partes[4].trim();
                    String viernes = partes[5].trim();
                    String tipoArsenal = partes[6].trim();

                    CoordenadaUK coord = new CoordenadaUK(
                        geoposicion, lunes, martes, miercoles, 
                        jueves, viernes, tipoArsenal
                    );

                    // Evaluar con autómata
                    boolean explota = automata.evaluar(tipoArsenal);
                    coord.setExplota(explota);

                    coordenadas.add(coord);
                    
                    System.out.println("Línea " + numeroLinea + ": " + geoposicion + 
                                     " | Arsenal: " + tipoArsenal + 
                                     (explota ? " ☢️ EXPLOTA" : " ✓ No explota"));
                } else {
                    System.err.println("Línea " + numeroLinea + " mal formada (esperadas 7 columnas, encontradas " + partes.length + ")");
                }
            }

            System.out.println("\n========================================");
            System.out.println("RESUMEN:");
            System.out.println("Total coordenadas: " + coordenadas.size());
            long explosiones = coordenadas.stream().filter(CoordenadaUK::isExplota).count();
            System.out.println("Explosiones detectadas: " + explosiones);
            System.out.println("========================================\n");

        } catch (IOException e) {
            System.err.println("Error al leer el archivo CSV: " + e.getMessage());
            e.printStackTrace();
        }

        return coordenadas;
    }

    /**
     * Obtiene estadísticas de las coordenadas procesadas
     */
    public Map<String, Integer> obtenerEstadisticas(List<CoordenadaUK> coordenadas) {
        Map<String, Integer> stats = new HashMap<>();
        stats.put("total", coordenadas.size());
        stats.put("explotan", (int) coordenadas.stream().filter(CoordenadaUK::isExplota).count());
        stats.put("no_explotan", coordenadas.size() - stats.get("explotan"));
        return stats;
    }
}
