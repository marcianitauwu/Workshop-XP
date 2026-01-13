package UserInterface.Controllers;

import BusinessLogic.*;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.stage.Stage;

import java.io.IOException;

public class PrincipalController {
    @FXML
    private Button cargarCSVButton;
    @FXML
    private Button hormigueroButton;
    @FXML
    private Button cerrarSesionButton;

    @FXML
    private void handleCargarCSV() {
        try {
            FXMLLoader loader = new FXMLLoader(getClass().getResource("/CargarCSV.fxml"));
            Scene scene = new Scene(loader.load(), 800, 600);
            Stage stage = new Stage();
            stage.setTitle("Cargar Coordenadas CSV");
            stage.setScene(scene);
            stage.setResizable(false);
            stage.show();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @FXML
    private void handleGestionarHormiguero() {
        try {
            FXMLLoader loader = new FXMLLoader(getClass().getResource("/Hormiguero.fxml"));
            Scene scene = new Scene(loader.load(), 800, 600);
            Stage stage = new Stage();
            stage.setTitle("Gestionar Hormiguero");
            stage.setScene(scene);
            stage.setResizable(false);
            stage.show();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @FXML
    private void handleCerrarSesion() {
        try {
            FXMLLoader loader = new FXMLLoader(getClass().getResource("/Login.fxml"));
            Scene scene = new Scene(loader.load(), 800, 600);
            Stage stage = (Stage) cerrarSesionButton.getScene().getWindow();
            stage.setScene(scene);
            stage.setTitle("AntCyberDrone - Login");
            stage.show();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
