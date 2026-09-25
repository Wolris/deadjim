@echo off
setlocal
cd /d "%~dp0"

if not exist node_modules (
  echo Installing development dependencies...
  call npm install
  if errorlevel 1 exit /b %errorlevel%
)

call npm run validate
exit /b %errorlevel%
