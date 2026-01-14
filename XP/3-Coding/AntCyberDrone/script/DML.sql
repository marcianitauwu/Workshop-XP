-- ==========================================
-- INSERCIONES INICIALES
-- ==========================================

-- Usuario patmic con contraseña 123
INSERT INTO USUARIO (username, password, rol) VALUES ('patmic', '123', 'KGD');

-- Usuarios adicionales con contraseña admin
INSERT INTO USUARIO (username, password, rol) VALUES ('Paul', 'admin', 'KGD');
INSERT INTO USUARIO (username, password, rol) VALUES ('Samira', 'admin', 'KGD');
INSERT INTO USUARIO (username, password, rol) VALUES ('Sebas', 'admin', 'KGD');
INSERT INTO USUARIO (username, password, rol) VALUES ('Salma', 'admin', 'KGD');
INSERT INTO USUARIO (username, password, rol) VALUES ('Danna', 'admin', 'KGD');

-- Control de login inicial para todos los usuarios
INSERT INTO CONTROL_LOGIN (id_usuario, intentos_restantes, bloqueado)
SELECT id_usuario, 3, 0 FROM USUARIO WHERE username = 'patmic';

INSERT INTO CONTROL_LOGIN (id_usuario, intentos_restantes, bloqueado)
SELECT id_usuario, 3, 0 FROM USUARIO WHERE username = 'Paul';

INSERT INTO CONTROL_LOGIN (id_usuario, intentos_restantes, bloqueado)
SELECT id_usuario, 3, 0 FROM USUARIO WHERE username = 'Samira';

INSERT INTO CONTROL_LOGIN (id_usuario, intentos_restantes, bloqueado)
SELECT id_usuario, 3, 0 FROM USUARIO WHERE username = 'Sebas';

INSERT INTO CONTROL_LOGIN (id_usuario, intentos_restantes, bloqueado)
SELECT id_usuario, 3, 0 FROM USUARIO WHERE username = 'Salma';

INSERT INTO CONTROL_LOGIN (id_usuario, intentos_restantes, bloqueado)
SELECT id_usuario, 3, 0 FROM USUARIO WHERE username = 'Danna';

-- Alimentos iniciales
INSERT INTO ALIMENTO (nombre, tipo, disponibilidad) VALUES ('Néctar Premium', 'NECTAR', 100);
INSERT INTO ALIMENTO (nombre, tipo, disponibilidad) VALUES ('Carne Fresca', 'CARNIVORO', 50);
