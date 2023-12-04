# TaylorSwiftGPT

## Compilación

Para compilar las aplicaciones debe ejecutarse el siguiente comando tanto en la carpeta de ```Backend``` como en ```Frontend```:

```
npm install
```

Este comando instala las dependencias en los respectivos projectos. Cabe resaltar que por la extension de ```@tensorflow/tfjs-node``` genera probelmas en Windows.

## Ejecución

Es importante aclarar que si se ejecutan las aplicaciones en el sistema de ```WSL2``` la autenticación de Google puede presentar probelmas o no funcionar, en ese caso se deberá crear una cuenta y utilizar la autenticación de email, es preferible que se ejecute en un entorno Linux o MacOS. Para la ejecución de la aplicación de ```Backend``` se debe ejecutar el siguiente comando:

```
npm start
```

En cambio, para ejecutar la aplicación de ```Frontend``` hay que ejecutar el comando:

```
npm run dev
```

## Autores

- Esteban Castañeda Blanco - esteban.castaneda@ucr.ac.cr
- Daniel Lizano Morales - daniel.lizano@ucr.ac.cr
