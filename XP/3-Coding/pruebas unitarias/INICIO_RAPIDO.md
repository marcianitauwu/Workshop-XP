# 🧪 GUÍA RÁPIDA - Pruebas Unitarias AntCyberDrone

## ✅ ¿Qué se ha creado?

### 📁 Carpeta: `3-Coding/pruebas unitarias/`
Contiene todos los archivos de prueba y documentación:
- AutomataDFATest.java (20+ pruebas)
- EvaluadorExplosionTest.java (15+ pruebas)
- CSVServiceTest.java (10+ pruebas)
- CoordenadaUKTest.java (8+ pruebas)
- AuthServiceTest.java (estructura base)
- README.md (documentación completa)
- ejecutar_pruebas.bat (script de ejecución)

### 📁 Carpeta: `AntCyberDrone/src/test/java/`
Mismas pruebas en la ubicación estándar de Maven para ejecución directa.

## 🚀 EJECUCIÓN RÁPIDA

### Opción 1: Script Automático (MÁS FÁCIL) ⭐
```bash
cd "XP/3-Coding/pruebas unitarias"
ejecutar_pruebas.bat
```

### Opción 2: Comandos Maven
```bash
cd "XP/3-Coding/AntCyberDrone"

# Ejecutar todas las pruebas
mvn test

# Ejecutar con reporte detallado
mvn clean test

# Ver resultados
cd target/surefire-reports
```

### Opción 3: VS Code
1. Abre cualquier archivo `*Test.java`
2. Verás botones "Run Test" sobre cada método
3. Clic para ejecutar individualmente

## 📊 Pruebas Incluidas

### ✅ AutomataDFATest
- Patrón ab*: a, ab, abb, abbbbb ✓
- Patrón a+: a, aa, aaaa ✓
- Patrón abcdt+: abcdt, abcdtt, abcdtttt ✓
- Casos negativos: vacío, null, xyz, abc, abcd ✓

### ✅ EvaluadorExplosionTest
- Arsenales que explotan: a, ab, abb, aa, abcdt ✓
- Arsenales que NO explotan: xyz, abc, abcd, b ✓
- Casos especiales: null, vacío ✓

### ✅ CSVServiceTest
- Carga de CSV válidos ✓
- Procesamiento de arsenales ✓
- Estadísticas: total, explotan, no_explotan ✓
- Manejo de errores: líneas malformadas, archivo inexistente ✓

### ✅ CoordenadaUKTest
- Constructores y getters/setters ✓
- Estado de explosión ✓
- Valores null y vacíos ✓

## 📦 Dependencias Agregadas

Ya se agregaron al `pom.xml`:
```xml
- JUnit 5 (jupiter-api + jupiter-engine)
- Mockito (core + junit-jupiter)
- Maven Surefire Plugin
```

## ⚡ Comandos Útiles

```bash
# Compilar sin ejecutar pruebas
mvn compile

# Solo compilar pruebas
mvn test-compile

# Ejecutar una prueba específica
mvn test -Dtest=AutomataDFATest

# Ejecutar un método específico
mvn test -Dtest=AutomataDFATest#testPatronAB_SoloA

# Ver reporte HTML
mvn surefire-report:report
# Ver en: target/site/surefire-report.html
```

## 📈 Resultados Esperados

```
Tests run: 53+
Failures: 0
Errors: 0
Skipped: 0
Success rate: 100%
```

## 🔧 Solución de Problemas

### "No se encuentra mvn"
- Instala Maven: https://maven.apache.org/download.cgi
- Agrega al PATH de Windows

### "Tests no se ejecutan"
```bash
mvn clean install
mvn test
```

### "Package does not exist"
- Verifica que estés en el directorio correcto
- Ejecuta: `mvn clean compile test`

## 📝 Próximos Pasos

Para agregar más pruebas:
1. Crea `NombreClaseTest.java` en `src/test/java/`
2. Usa las plantillas existentes como referencia
3. Ejecuta `mvn test` para validar

## 💡 Ejemplos de Salida

### Prueba Exitosa ✅
```
[INFO] Running AutomataDFATest
[INFO] Tests run: 20, Failures: 0, Errors: 0, Skipped: 0
```

### Prueba Fallida ❌
```
[ERROR] testPatronAB_SoloA  Time elapsed: 0.001 s  <<< FAILURE!
Expected: true
Actual: false
```

## 📚 Más Información

Ver README.md completo en la carpeta "pruebas unitarias" para:
- Explicación detallada de cada prueba
- Mejores prácticas
- Guía de contribución
- Referencias y recursos

---

**¡Listo para ejecutar! 🎯**

¿Dudas? Revisa README.md o la documentación de JUnit 5.
