import app from './app'

//ejecución de nuestro servicio, se encarga de arrancar nuestra función principal
const main=()=>{
    app.listen(app.get("port"));
    console.log(`Server corriento en el puerto: ${app.get("port")}`);
}

main();