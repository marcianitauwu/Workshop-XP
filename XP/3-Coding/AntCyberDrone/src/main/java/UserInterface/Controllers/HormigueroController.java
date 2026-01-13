package UserInterface.Controllers;

import BusinessLogic.*;
import BusinessLogic.Entities.*;
import DataAccess.HormigaDAO;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.VBox;

import java.util.List;

public class HormigueroController {
    @FXML
    private TableView<Hormiga> hormigasTable;
    @FXML
    private TableColumn<Hormiga, Integer> idColumn;
    @FXML
    private TableColumn<Hormiga, String> tipoColumn;
    @FXML
    private TableColumn<Hormiga, String> estadoColumn;
    @FXML
    private TableColumn<Hormiga, String> armamentoColumn;

    @FXML
    private Button crearLarvaButton;
    @FXML
    private ComboBox<String> alimentoComboBox;
    @FXML
    private Button alimentarButton;
    @FXML
    private Button gestionarSoldadosButton;
    @FXML
    private Button volverButton;
    @FXML
    private Label infoLabel;

    private HormigueroService hormigueroService;
    private HormigaDAO hormigaDAO;
    private Hormiga hormigaSeleccionada;

    @FXML
    public void initialize() {
        hormigueroService = new HormigueroService();
        hormigaDAO = new HormigaDAO();

        idColumn.setCellValueFactory(new PropertyValueFactory<>("idHormiga"));
        tipoColumn.setCellValueFactory(new PropertyValueFactory<>("tipo"));
        estadoColumn.setCellValueFactory(new PropertyValueFactory<>("estado"));
        
        // Columna de armamento - mostrar detalles específicos
        armamentoColumn.setCellValueFactory(cellData -> {
            Hormiga h = cellData.getValue();
            if (h instanceof HSoldado) {
                HSoldado soldado = (HSoldado) h;
                return new javafx.beans.property.SimpleStringProperty(soldado.getArmamentoTexto());
            } else {
                return new javafx.beans.property.SimpleStringProperty("-");
            }
        });

        alimentoComboBox.setItems(FXCollections.observableArrayList("Néctar Premium", "Carne Fresca"));
        alimentoComboBox.setValue("Néctar Premium");

        hormigasTable.setOnMouseClicked(event -> {
            hormigaSeleccionada = hormigasTable.getSelectionModel().getSelectedItem();
            if (hormigaSeleccionada != null) {
                infoLabel.setText("Seleccionada: " + hormigaSeleccionada.getTipo() + " (ID: " + hormigaSeleccionada.getIdHormiga() + ")");
            }
        });

        cargarHormigas();
    }

    @FXML
    private void handleCrearLarva() {
        HLarva larva = hormigueroService.crearLarva();
        infoLabel.setText("Larva creada con ID: " + larva.getIdHormiga());
        cargarHormigas();
    }

    @FXML
    private void handleAlimentar() {
        if (hormigaSeleccionada == null) {
            infoLabel.setText("Selecciona una hormiga primero");
            return;
        }

        String alimento = alimentoComboBox.getValue();
        Alimento alimentoObj = alimento.contains("Néctar") ? new Nectar() : new Carnivoro();

        // Si es larva y come carne, se transforma automáticamente a soldado
        if (hormigaSeleccionada.getTipo().equals("LARVA") && alimento.contains("Carne")) {
            HLarva larva = (HLarva) hormigaSeleccionada;
            larva.comer(alimentoObj);
            HSoldado soldado = hormigueroService.transformarLarvaASoldado(larva);
            infoLabel.setText("Larva alimentada con CARNE - TRANSFORMADA A SOLDADO (ID: " + soldado.getIdHormiga() + ")");
        } else {
            hormigaSeleccionada.comer(alimentoObj);
            hormigaDAO.actualizar(hormigaSeleccionada);
            String tipoAlimento = alimento.contains("Nectar") ? "Nectar" : "Carne";
            infoLabel.setText(hormigaSeleccionada.getTipo() + " alimentada con " + tipoAlimento);
        }
        
        cargarHormigas();
    }

    @FXML
    private void handleGestionarSoldados() {
        if (hormigaSeleccionada == null || !hormigaSeleccionada.getTipo().equals("SOLDADO")) {
            infoLabel.setText("Selecciona un soldado primero");
            return;
        }

        mostrarVentanaArmamento();
    }

    @FXML
    private void handleVolver() {
        volverButton.getScene().getWindow().hide();
    }

    private void mostrarVentanaArmamento() {
        Dialog<String> dialog = new Dialog<>();
        dialog.setTitle("Configurar Armamento - Ant Ciber Dron");

        VBox vbox = new VBox(15);
        vbox.setStyle("-fx-padding: 20; -fx-background-color: #1a1a1a;");

        Label titleLabel = new Label("CONFIGURAR ARMAMENTO DEL SOLDADO");
        titleLabel.setStyle("-fx-text-fill: #0099ff; -fx-font-size: 14; -fx-font-weight: bold;");

        // BRAZO IZQUIERDO - SOLO LASER
        Label brazoIzqLabel = new Label("BRAZO IZQUIERDO:");
        brazoIzqLabel.setStyle("-fx-text-fill: #ffaa00; -fx-font-size: 12; -fx-font-weight: bold;");
        
        CheckBox laserIzq = new CheckBox("🔫 Laser Energetico");
        laserIzq.setStyle("-fx-text-fill: #fff;");
        if (hormigaSeleccionada instanceof HSoldado) {
            laserIzq.setSelected(((HSoldado) hormigaSeleccionada).isTieneLaser());
        }

        // BRAZO DERECHO - SOLO METRALLETA
        Label brazoDerLabel = new Label("BRAZO DERECHO:");
        brazoDerLabel.setStyle("-fx-text-fill: #ffaa00; -fx-font-size: 12; -fx-font-weight: bold;");
        
        CheckBox metralletaDer = new CheckBox("⚔️ Metralleta M16");
        metralletaDer.setStyle("-fx-text-fill: #fff;");
        if (hormigaSeleccionada instanceof HSoldado) {
            metralletaDer.setSelected(((HSoldado) hormigaSeleccionada).isTieneMetralleta());
        }

        // EQUIPAMIENTO GENERAL
        Label equipoLabel = new Label("EQUIPAMIENTO GENERAL:");
        equipoLabel.setStyle("-fx-text-fill: #ffaa00; -fx-font-size: 12; -fx-font-weight: bold;");
        
        CheckBox turboreactor = new CheckBox("🚀 TurboReactor V2 (Espalda)");
        turboreactor.setStyle("-fx-text-fill: #fff;");
        if (hormigaSeleccionada instanceof HSoldado) {
            turboreactor.setSelected(((HSoldado) hormigaSeleccionada).isTieneTurboReactor());
        }

        CheckBox fuentePoder = new CheckBox("⚡ Fuente de Poder (Nucleo)");
        fuentePoder.setStyle("-fx-text-fill: #fff;");
        if (hormigaSeleccionada instanceof HSoldado) {
            fuentePoder.setSelected(((HSoldado) hormigaSeleccionada).isTieneFuentePoder());
        }

        vbox.getChildren().addAll(titleLabel, 
                                   new Separator(), 
                                   brazoIzqLabel, laserIzq,
                                   new Separator(),
                                   brazoDerLabel, metralletaDer,
                                   new Separator(),
                                   equipoLabel, turboreactor, fuentePoder);

        dialog.getDialogPane().setContent(vbox);
        dialog.getDialogPane().getButtonTypes().addAll(ButtonType.OK, ButtonType.CANCEL);
        dialog.getDialogPane().setStyle("-fx-background-color: #0d0d0d;");

        dialog.setResultConverter(buttonType -> {
            if (buttonType == ButtonType.OK && hormigaSeleccionada instanceof HSoldado) {
                HSoldado soldado = (HSoldado) hormigaSeleccionada;
                
                // Actualizar armamento
                soldado.setTieneLaser(laserIzq.isSelected());
                soldado.setTieneMetralleta(metralletaDer.isSelected());
                soldado.setTieneTurboReactor(turboreactor.isSelected());
                soldado.setTieneFuentePoder(fuentePoder.isSelected());
                
                // Guardar en BD
                hormigaDAO.actualizar(soldado);
                
                infoLabel.setText("Armamento actualizado: " + soldado.getArmamentoTexto());
                cargarHormigas(); // Refrescar tabla
            }
            return null;
        });

        dialog.show();
    }

    private void cargarHormigas() {
        List<Hormiga> hormigas = hormigueroService.obtenerTodasLasHormigas();
        ObservableList<Hormiga> data = FXCollections.observableArrayList(hormigas);
        hormigasTable.setItems(data);
    }
}
