-- ==========================================
-- INSERCIONES INICIALES
-- ==========================================

-- Usuario patmic con contraseña 123
INSERT INTO USUARIO (username, password, rol) VALUES ('patmic', '123', 'KGD');

-- Control de login inicial
INSERT INTO CONTROL_LOGIN (id_usuario, intentos_restantes, bloqueado)
SELECT id_usuario, 3, 0 FROM USUARIO WHERE username = 'patmic';

-- Alimentos iniciales
INSERT INTO ALIMENTO (nombre, tipo, disponibilidad) VALUES ('Néctar Premium', 'NECTAR', 100);
INSERT INTO ALIMENTO (nombre, tipo, disponibilidad) VALUES ('Carne Fresca', 'CARNIVORO', 50);
