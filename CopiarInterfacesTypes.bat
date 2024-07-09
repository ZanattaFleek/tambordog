@echo off
cls

del "C:\Users\programador\Desktop\FSD0043 - AreaDeTrabalho\tambordog\tambordog-frontend\src\backendImports\types\*.ts"

xcopy "C:\Users\programador\Desktop\FSD0043 - AreaDeTrabalho\tambordog\tambordog-backend\src\types\*.ts" "C:\Users\programador\Desktop\FSD0043 - AreaDeTrabalho\tambordog\tambordog-frontend\src\backendImports\types"
