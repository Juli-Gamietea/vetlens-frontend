# VetLensFrontend
Este repositorio es el frontend para la aplicación VetLens, el mismo esta desarrollado utilizando React Native.
Se recomienda tener instalado un IDE para facilitar la lectura del código y ejecución del mismo, el utilizado en el desarrollo fue Visual Studio Code.
También se sugiere instalar un emulador en caso de no utilizar un telefóno Android, el utilizado en el desarrollo fue creado mediante Android Studio.
Para poder utilizar la aplicación usted debe:
1. Tener instalado Node (importante tener npm) y Expo
2. Descargar el repositorio en la ruta en la que se encuentra en su dispositivo mediante 'git clone https://github.com/Juli-Gamietea/vetlens-frontend.git'
3. Asegurarse de encontrarse sobre la branch 'master' (con git checkout master en caso de no estarlo)
4. Una vez dentro del proyecto instalar todas las dependencias necesarias mediante 'npm i'
5. Asegurarse que el backend se encuentre corriendo en el mismo puerto que se encuentra configurado en el archivo `.env`
6. Encender el emulador y una vez listo correr el frontend con 'npx expo start'. Cada vez que se modifica algo en el archivo `.env` correr el frontend con 'npx expo start -c'

## Consideraciones
Al estar en etapa de desarrollo la aplicación se encuentra consumiendo servicios web de capa gratuita (Mongo DBAtlas y Cloudinary) por lo cual se pide encarecidamente que
el tráfico de prueba sea moderado para poder mantenerse dentro de los valores suministrados gratuitamente por el proveedor.


