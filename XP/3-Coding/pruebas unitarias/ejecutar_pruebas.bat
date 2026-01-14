@echo off
echo ============================================
echo  EJECUTANDO PRUEBAS UNITARIAS
echo  AntCyberDrone
echo ============================================
echo.

cd /d "%~dp0..\AntCyberDrone"

echo [1/3] Compilando proyecto...
call mvn clean compile
if %errorlevel% neq 0 (
    echo ERROR: Fallo en la compilacion
    pause
    exit /b 1
)

echo.
echo [2/3] Ejecutando pruebas...
call mvn test
if %errorlevel% neq 0 (
    echo ERROR: Algunas pruebas fallaron
    pause
    exit /b 1
)

echo.
echo [3/3] Generando reporte...
call mvn surefire-report:report

echo.
echo ============================================
echo  PRUEBAS COMPLETADAS EXITOSAMENTE
echo ============================================
echo.
echo Reporte disponible en:
echo target\surefire-reports\
echo.
pause
