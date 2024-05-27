import client from '../config/db.js';
import chalk from 'chalk';

const argumentos = process.argv.slice(2)

let arg1 = argumentos[0];
let arg2 = argumentos[1];
let arg3 = argumentos[2];
let arg4 = argumentos[3]; 
let arg5 = argumentos[4];
let arg6 = argumentos[5];

const nueva_transferencia = async (arg2, arg3, arg4, arg5, arg6) => {
    
    try {
        await client.connect()
        await client.query("BEGIN")
        
        const registrar_transferencia = {
            text: 'INSERT INTO transferencias (descripcion, fecha, monto, cuenta_origen, cuenta_destino) VALUES ($1, $2, $3, $4, $5)',
            values: [arg2, arg3, arg4, arg5, arg6]
        };
        
        await client.query(registrar_transferencia);
        
        const descontar = {
            text: `UPDATE cuentas SET saldo = saldo - $1 WHERE id = $2;`,
            values: [arg4, arg5]
        };
        const acreditar = {
            text: `UPDATE cuentas SET saldo = saldo + $1 WHERE id = $2;`,
            values: [arg4, arg6]
        };

        await client.query(descontar);
        await client.query(acreditar);

        await client.query('COMMIT');

        const ultimaTransferencia = await client.query('SELECT * FROM transferencias ORDER BY fecha DESC LIMIT 1');
        console.log(ultimaTransferencia.rows)
        console.log(chalk.white.bgGreen.bold('Transferencia realizada con éxito'));

        client.end();

    
    } catch (error) {
        console.error(chalk.white.bgRed.bold('Error en la transferencia'));
        console.error(chalk.red(error.message));
        client.end();
    }
};

const consultarUltimasTransferencias = async (arg2) => {
    try {
        await client.connect();

        const verificarIdUsuario = 'SELECT * FROM cuentas WHERE id = $1';
        const resultadoUsuario = await client.query(verificarIdUsuario, [arg2]);

        if (resultadoUsuario.rowCount === 0) {
            throw new Error(chalk.white.bgRed.bold(`No se encontró la cuenta de origen con ID ${arg2}`));
        }

        const res = await client.query('SELECT * FROM transferencias WHERE cuenta_origen = $1 ORDER BY fecha DESC LIMIT 10', [arg2]);
        console.log(res.rows);
        console.log(chalk.white.bgGreen.bold('Consulta realizada con éxito'));

    } catch (error) {
        console.error(chalk.red(error.message));
    } finally {
        client.end();
    }
}

const consultarSaldo = async (arg2) => {
    try {
        await client.connect();

        const verificarIdUsuario = 'SELECT * FROM cuentas WHERE id = $1';
        const resultadoUsuario = await client.query(verificarIdUsuario, [arg2]);

        if (resultadoUsuario.rowCount === 0) {
            throw new Error(chalk.white.bgRed.bold(`No se encontró la cuenta de origen con ID ${arg2}`));
        }

        const res = await client.query('SELECT saldo FROM cuentas WHERE id = $1', [arg2]);
        const saldo = res.rows[0].saldo;
        

        const mensaje = `El saldo de la cuenta es de $${saldo}.`;

        console.log(mensaje);
        console.log(chalk.white.bgGreen.bold('Consulta realizada con éxito'));
    } catch (error) {
        console.error(chalk.red(error.message));
    } finally {
        client.end();
    }
}



switch (arg1) {
    case 'transferir':
        if (argumentos.length !== 6) {
            console.error('Error, intenta de nuevo con el siguiente orden y numero de argumentos: node index.js nuevo <descripcion> <fecha> <monto> <cuenta_origen> <cuenta_destino>');
            break;
          }
          nueva_transferencia(arg2, arg3, arg4, arg5, arg6);
          
        break;

        case 'consultar':
        if (argumentos.length !== 2) {
            console.error('Error, intenta de nuevo con el siguiente orden y numero de argumentos: node index.js consultar <cuenta>');
            break;
          }
          consultarUltimasTransferencias(arg2);
          
        break;

        case 'saldo':
        if (argumentos.length !== 2) {
            console.error('Error, intenta de nuevo con el siguiente orden y numero de argumentos: node index.js saldo <cuenta>');
            break;
          }
          consultarSaldo(arg2);

        break;
    
   
    default:
        console.log('Acción desconocida');
        client.end();
        
}

