package UserInterface.Controllers;

import BusinessLogic.*;
import BusinessLogic.Entities.CoordenadaUK;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.stage.FileChooser;

import java.io.File;
import java.util.List;
import java.util.Map;

public class CargarCSVController {
    @FXML
    private TextArea logArea;
    @FXML
    private Button cargarButton;
    @FXML
    private Button volverButton;
    @FXML
    private TextField patronTextField;

    private CSVService csvService;
    private List<CoordenadaUK> coordenadasCargadas;

    @FXML
    public void initialize() {
        csvService = new CSVService();
        logArea.setWrapText(true);
        logArea.setStyle("-fx-control-inner-background: #1a1a1a; -fx-text-fill: #00ff00; -fx-font-family: 'Courier New';");
        
        logArea.appendText("========================================\n");
        logArea.appendText("  SISTEMA DE ANÁLISIS DE EXPLOSIONES\n");
        logArea.appendText("========================================\n\n");
        logArea.appendText("Patrones válidos:\n");
        logArea.appendText("  • ab*    → 'a' seguido de cero o más 'b'\n");
        logArea.appendText("  • a+     → una o más 'a'\n");
        logArea.appendText("  • abcdt+ → 'abcd' seguido de una o más 't'\n\n");
        logArea.appendText("Esperando archivo CSV...\n\n");
    }

    @FXML
    private void handleCargarCSV() {
        FileChooser fileChooser = new FileChooser();
        fileChooser.setTitle("Seleccionar archivo CSV");
        fileChooser.getExtensionFilters().add(
            new FileChooser.ExtensionFilter("Archivos CSV", "*.csv")
        );
        
        File file = fileChooser.showOpenDialog(cargarButton.getScene().getWindow());

        if (file != null) {
            logArea.clear();
            
            logArea.appendText("========================================\n");
            logArea.appendText("PROCESANDO: " + file.getName() + "\n");
            logArea.appendText("========================================\n\n");

            // Cargar y procesar CSV
            coordenadasCargadas = csvService.cargarYProcesarCSV(file.getAbsolutePath());
            
            if (coordenadasCargadas.isEmpty()) {
                logArea.appendText("⚠️ No se encontraron coordenadas válidas\n");
                return;
            }

            // Mostrar estadísticas
            Map<String, Integer> stats = csvService.obtenerEstadisticas(coordenadasCargadas);
            logArea.appendText("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
            logArea.appendText("  ESTADÍSTICAS:\n");
            logArea.appendText("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
            logArea.appendText("  Total coordenadas: " + stats.get("total") + "\n");
            logArea.appendText("  ☢️  Explosiones:    " + stats.get("explotan") + "\n");
            logArea.appendText("  ✓  No explotan:    " + stats.get("no_explotan") + "\n");
            logArea.appendText("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n");

            // Mostrar resultados en LOG CON ESTADO A LA DERECHA
            logArea.appendText("RESULTADOS:\n");
            logArea.appendText("───────────────────────────────────────────────────────\n");
            coordenadasCargadas.forEach(coord -> {
                String estado = coord.isExplota() ? "☢️ EXPLOTA" : "✓ No explota";
                String linea = String.format("%-35s | %s", 
                    coord.getGeoposicion() + " [" + coord.getTipoArsenal() + "]",
                    estado);
                logArea.appendText("  " + linea + "\n");
            });
            logArea.appendText("───────────────────────────────────────────────────────\n");

            logArea.appendText("\n✅ Análisis completado\n");
        }
    }

    @FXML
    private void handleProbarPatron() {
        String patron = patronTextField.getText().trim();
        if (patron.isEmpty()) {
            logArea.appendText("⚠️ Ingresa un patrón\n");
            return;
        }
        
        if (coordenadasCargadas == null || coordenadasCargadas.isEmpty()) {
            logArea.appendText("⚠️ Carga un CSV primero\n");
            return;
        }
        
        logArea.appendText("\n--- Probando patrón: " + patron + " ---\n");
    }

    @FXML
    private void handleVolver() {
        volverButton.getScene().getWindow().hide();
    }
}
