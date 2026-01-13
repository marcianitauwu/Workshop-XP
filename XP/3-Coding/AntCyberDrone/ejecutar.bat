@echo off
setlocal

set "JAVA_HOME=C:\Program Files\Java\jdk-25"
set "MAVEN_HOME=C:\apache-maven-3.9.11"
set "PATH=%JAVA_HOME%\bin;%MAVEN_HOME%\bin;%PATH%"

cd /d "%~dp0"

echo ==========================================
echo   AntCyberDrone - Sistema de Control
echo ==========================================
echo.

REM Matar procesos Java previos
taskkill /F /IM java.exe >nul 2>&1
timeout /t 1 /nobreak >nul

REM Crear carpeta database si no existe
if not exist "database" mkdir database
echo [OK] Carpeta database verificada

echo [1/2] Compilando proyecto...
call "%MAVEN_HOME%\bin\mvn.cmd" clean compile -q

if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Error en compilacion
    pause
    exit /b 1
)

echo [OK] Compilacion exitosa
echo [2/2] Iniciando aplicacion...
echo.
echo ==========================================
echo   Credenciales por defecto:
echo   Usuario: patmic
echo   Password: 123
echo ==========================================
echo.

call "%MAVEN_HOME%\bin\mvn.cmd" javafx:run

pause
