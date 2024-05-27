import pg from 'pg';
import 'dotenv/config';

const { Client } = pg; 

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;

// Configuración de la conexión a la base de datos
const config = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD, // cambiar por su contraseña
    database: DB_DATABASE, // cambiar por su base de datos
    allowExitOnIdle: true,

}

// Crear un nuevo cliente
const client = new Client(config);



export default client;