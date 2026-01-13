package UserInterface.Controllers;

import BusinessLogic.AuthService;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.stage.Stage;

import java.io.IOException;

public class LoginController {
    @FXML
    private TextField usernameField;
    @FXML
    private PasswordField passwordField;
    @FXML
    private Label messageLabel;
    @FXML
    private Button loginButton;

    private AuthService authService;
    private int intentosFallidosUI = 0; // Contador local para usuarios no existentes

    @FXML
    public void initialize() {
        authService = new AuthService();
        System.out.println("LoginController inicializado");
    }

    @FXML
    private void handleLogin() {
        String username = usernameField.getText().trim();
        String password = passwordField.getText();

        if (username.isEmpty() || password.isEmpty()) {
            messageLabel.setText("⚠️ Por favor ingresa usuario y contraseña");
            messageLabel.setStyle("-fx-text-fill: #ffa500;");
            return;
        }

        System.out.println("\n🔐 HANDLELOGIN - Usuario: " + username);

        // Verificar si el usuario existe
        if (!authService.usuarioExiste(username)) {
            intentosFallidosUI++;
            System.out.println("UI: Usuario no existe - Intento " + intentosFallidosUI + "/3");

            if (intentosFallidosUI >= 3) {
                bloquearUI();
                messageLabel.setText("🚫 BLOQUEADO - Demasiados intentos con usuarios inválidos");
                messageLabel.setStyle("-fx-text-fill: #ff0000; -fx-font-weight: bold; -fx-font-size: 14;");
                return;
            }

            messageLabel.setText("❌ Usuario no existe - Intentos: " + (3 - intentosFallidosUI) + "/3");
            messageLabel.setStyle("-fx-text-fill: #ff6b6b; -fx-font-size: 13;");
            passwordField.clear();
            return;
        }

        // Resetear contador si el usuario existe
        intentosFallidosUI = 0;

        // Verificar bloqueo ANTES (solo para usuarios existentes)
        if (authService.estasBloqueado(username)) {
            System.out.println("UI: Usuario ya bloqueado antes del intento");
            bloquearUI();
            messageLabel.setText("🚫 CUENTA BLOQUEADA - Contacta al administrador");
            messageLabel.setStyle("-fx-text-fill: #ff0000; -fx-font-weight: bold; -fx-font-size: 14;");
            return;
        }

        // Intentar login
        boolean exito = authService.autenticarse(username, password);

        if (exito) {
            System.out.println("UI: Login exitoso");
            messageLabel.setText("✅ ¡Acceso concedido!");
            messageLabel.setStyle("-fx-text-fill: #00ff00; -fx-font-weight: bold;");
            abrirPrincipal();
        } else {
            System.out.println("UI: Login fallido");

            // Verificar si se bloqueó DESPUÉS del intento
            if (authService.estasBloqueado(username)) {
                System.out.println("UI: Usuario bloqueado AHORA");
                bloquearUI();
                messageLabel.setText("🚫 CUENTA BLOQUEADA - 3 intentos fallidos");
                messageLabel.setStyle("-fx-text-fill: #ff0000; -fx-font-weight: bold; -fx-font-size: 14;");
            } else {
                int intentos = authService.getIntentosRestantes(username);
                System.out.println("UI: Intentos restantes: " + intentos);
                messageLabel.setText("❌ Credenciales incorrectas - Intentos: " + intentos + "/3");
                messageLabel.setStyle("-fx-text-fill: #ff6b6b; -fx-font-size: 13;");
            }
        }

        passwordField.clear();
    }

    private void bloquearUI() {
        loginButton.setDisable(true);
        usernameField.setDisable(true);
        passwordField.setDisable(true);
        System.out.println("UI: Controles deshabilitados");
    }

    private void abrirPrincipal() {
        try {
            FXMLLoader loader = new FXMLLoader(getClass().getResource("/Principal.fxml"));
            Scene scene = new Scene(loader.load(), 800, 600);
            Stage stage = (Stage) loginButton.getScene().getWindow();
            stage.setScene(scene);
            stage.setTitle("AntCyberDrone - Sistema Principal");
            stage.setResizable(false);
            stage.show();
        } catch (IOException e) {
            e.printStackTrace();
            messageLabel.setText("Error al cargar pantalla principal");
        }
    }
}
