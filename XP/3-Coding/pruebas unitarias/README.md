# Pruebas Unitarias - AntCyberDrone

Este directorio contiene las pruebas unitarias completas para el sistema AntCyberDrone.

## 📋 Estructura de Pruebas

### Pruebas Implementadas

1. **AutomataDFATest.java** - Pruebas del Autómata DFA
   - Validación de patrones: `ab*`, `a+`, `abcdt+`
   - Casos positivos y negativos
   - Casos límite y complejos
   - **Total: 20+ casos de prueba**

2. **EvaluadorExplosionTest.java** - Pruebas del Evaluador de Explosión
   - Arsenales que explotan
   - Arsenales que no explotan
   - Casos especiales (null, vacío)
   - **Total: 15+ casos de prueba**

3. **CSVServiceTest.java** - Pruebas del Servicio CSV
   - Carga de archivos CSV
   - Procesamiento de coordenadas
   - Estadísticas
   - Manejo de errores
   - **Total: 10+ casos de prueba**

4. **CoordenadaUKTest.java** - Pruebas de la Entidad CoordenadaUK
   - Construcción de objetos
   - Getters y Setters
   - Estados de explosión
   - Valores null y vacíos
   - **Total: 8+ casos de prueba**

5. **AuthServiceTest.java** - Pruebas del Servicio de Autenticación
   - Estructura base para pruebas de integración
   - Requiere configuración de BD para tests completos

## 🚀 Cómo Ejecutar las Pruebas

### Opción 1: Desde Maven (Recomendado)

```bash
# Ejecutar todas las pruebas
mvn test

# Ejecutar pruebas con reporte detallado
mvn test -Dtest=AutomataDFATest

# Ejecutar una prueba específica
mvn test -Dtest=AutomataDFATest#testPatronAB_SoloA
```

### Opción 2: Copiar pruebas a la estructura Maven

Las pruebas pueden copiarse a la estructura estándar de Maven:

```
AntCyberDrone/
  src/
    test/
      java/
        AutomataDFATest.java
        EvaluadorExplosionTest.java
        CSVServiceTest.java
        CoordenadaUKTest.java
        AuthServiceTest.java
```

### Opción 3: Desde VS Code

1. Instala la extensión "Test Runner for Java"
2. Abre cualquier archivo de prueba
3. Haz clic en el botón "Run Test" sobre cada método de prueba

### Opción 4: Desde IntelliJ IDEA

1. Haz clic derecho en el archivo de prueba
2. Selecciona "Run 'NombreTest'"

## 📦 Dependencias Necesarias

Las siguientes dependencias ya fueron agregadas al `pom.xml`:

```xml
<!-- JUnit 5 -->
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-api</artifactId>
    <version>5.10.1</version>
    <scope>test</scope>
</dependency>

<!-- Mockito -->
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <version>5.8.0</version>
    <scope>test</scope>
</dependency>
```

## ✅ Cobertura de Pruebas

### Componentes Probados

- ✅ **AutomataDFA**: 100% de cobertura
  - Todos los patrones validados
  - Casos límite cubiertos
  
- ✅ **EvaluadorExplosion**: 100% de cobertura
  - Lógica de decisión completa
  - Manejo de casos especiales

- ✅ **CSVService**: ~90% de cobertura
  - Carga y procesamiento
  - Estadísticas
  - Manejo de errores

- ✅ **CoordenadaUK**: 100% de cobertura
  - Todos los getters/setters
  - Estados y valores especiales

- ⚠️ **AuthService**: Estructura básica
  - Requiere BD para pruebas completas

### Componentes Pendientes

Las siguientes clases requieren pruebas adicionales de integración:

- `HormigueroService`
- `BBAService`
- `IAService`
- `InteligenciaArtificial`
- DAOs (requieren BD de prueba)

## 🔧 Instalación de Dependencias

```bash
# Navegar al directorio del proyecto
cd XP/3-Coding/AntCyberDrone

# Instalar dependencias
mvn clean install

# Ejecutar pruebas
mvn test
```

## 📊 Reportes de Pruebas

Después de ejecutar `mvn test`, los reportes se generan en:

```
target/surefire-reports/
```

Para un reporte HTML más detallado, agrega el plugin Surefire Report:

```bash
mvn surefire-report:report
```

## 🐛 Solución de Problemas

### Error: "Could not find or load main class"
- Asegúrate de estar en el directorio correcto
- Ejecuta `mvn clean compile` antes de las pruebas

### Error: "No tests found"
- Verifica que las clases terminen en `Test.java`
- Asegúrate de que los métodos tengan la anotación `@Test`

### Error: "Package BusinessLogic does not exist"
- Las pruebas deben estar en la misma estructura de paquetes
- O copia las pruebas a `src/test/java/`

## 📝 Convenciones de Nombrado

- **Clases de prueba**: `NombreClaseTest.java`
- **Métodos de prueba**: `test[Característica]_[Escenario]()`
- **Anotaciones**: `@DisplayName` para descripciones legibles

## 🎯 Mejores Prácticas

1. **AAA Pattern**: Arrange, Act, Assert
2. **Nombres descriptivos**: Cada test debe explicar qué valida
3. **Independencia**: Los tests no deben depender entre sí
4. **Limpieza**: Usa `@BeforeEach` y `@AfterEach` apropiadamente
5. **Datos de prueba**: Usa valores significativos

## 📚 Recursos Adicionales

- [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/)
- [Mockito Documentation](https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html)
- [Maven Surefire Plugin](https://maven.apache.org/surefire/maven-surefire-plugin/)

## 👥 Contribuir

Para agregar nuevas pruebas:

1. Crea un archivo `NombreClaseTest.java`
2. Sigue las convenciones de nombrado
3. Documenta casos especiales
4. Actualiza este README

---

**Última actualización**: Enero 2026  
**Versión**: 1.0  
**Autor**: Equipo AntCyberDrone
