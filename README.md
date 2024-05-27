# Proyecto API para Gestión de Transferencias Bancarias

Este código permite realizar operaciones básicas de gestión de transferencias bancarias, como transferir dinero entre cuentas y consultar las últimas transferencias o el saldo de una cuenta específica. Utiliza PostgreSQL como base de datos para almacenar información sobre las cuentas y las transferencias realizadas.


## Prerrequisitos

Para poder ejecutar la API, se deben cumplir los siguientes prerrequisitos:

- Node.js 
- PostgreSQL .
- Tener instalado un cliente de PostgreSQL, como por ejemplo pgAdmin.


## Instalación

Para instalar la API, se deben seguir los siguientes pasos:

1. Clonar el repositorio
```bash
git clone https://github.com/danilojpalma/mi_banco.git
```
2. Acceder al directorio del repositorio.
```bash
cd mi_banco
```
3. Instalar las dependencias del proyecto.
```bash
npm install
```
4. Crear la base de datos en PostgreSQL.

Para crear la base de datos, se debe ejecutar el siguiente comando en el cliente de PostgreSQL:
```sql
CREATE DATABASE banco
CREATE TABLE transferencias(
	descripcion varchar(50), 
 	fecha varchar(10), 
 	monto DECIMAL, 
 	cuenta_origen INT, 
 	cuenta_destino INT);
 
CREATE TABLE cuentas (
	id INT, 
	saldo DECIMAL CHECK (saldo >= 0))
	
INSERT INTO cuentas values (1, 20000);
INSERT INTO cuentas values (2, 10000);
```
5. Configurar la conexión a la base de datos.

Debes crear un archivo en la carpeta raiz con el nombre `.env`, en donde se deben configurar las variables de entorno segun tu configuración en tu cliente de PostgreSQL.
```javascript

DB_HOST = localhost
DB_USER = postgres
DB_PASSWORD = contraseña
DB_DATABASE = banco

```
## Uso

El script acepta comandos a través de la línea de comando. Los comandos disponibles son:

### Transferir Dinero

Para transferir dinero de una cuenta a otra, utiliza el comando `transferir` seguido de los detalles necesarios:

```shell
node queries/queries.js transferir <descripcion> <fecha> <monto> <cuenta_origen> <cuenta_destino>
```

Donde:
- `<descripcion>` es una descripción opcional de la transferencia.
- `<fecha>` es la fecha de la transferencia en formato YYYY-MM-DD.
- `<monto>` es el monto a transferir.
- `<cuenta_origen>` es el ID de la cuenta desde la cual se retirará el dinero.
- `<cuenta_destino>` es el ID de la cuenta a la que se depositará el dinero.

![imagen ejemplo transferencia](https://onedrive.live.com/embed?resid=EBD9E1806310E978%21102651&authkey=%21AD0yC0WYENoC78M&width=1024)

### Consultar Últimas Transferencias

Para consultar las últimas 10 transferencias realizadas por una cuenta específica, utiliza el comando `consultar`:

```shell
node queries/queries.js consultar <cuenta>
```

Donde `<cuenta>` es el ID de la cuenta cuyas transferencias deseas consultar.

![imagen ejemplo consulta](https://onedrive.live.com/embed?resid=EBD9E1806310E978%21102653&authkey=%21AI91LuvPh_wcZOc&width=1024)

### Consultar Saldo

Para consultar el saldo actual de una cuenta específica, utiliza el comando `saldo`:

```shell
node queries/queries.js saldo <cuenta>
```
Donde `<cuenta>` es el ID de la cuenta cuyo saldo deseas conocer.

![imagen ejemplo saldo](https://onedrive.live.com/embed?resid=EBD9E1806310E978%21102655&authkey=%21AJCBFs3VQkGH0ww&width=1024)
## Ejemplo de Uso

Supongamos que tienes dos cuentas con IDs 123 y 456, y deseas transferir 100 unidades de efectivo de la cuenta 123 a la cuenta 456. El comando sería:

```shell
node queries/queries.js transferir "Pago de servicios" 2024-05-27 100 123 456
```

Y luego puedes consultar las últimas transferencias de la cuenta 123 con:

```shell
node queries/queries.js consultar 123
```

O verificar el saldo de la misma cuenta con:

```shell
node queries/queries.js saldo 123
```
## Notas Importantes

- Asegúrate de tener configurada correctamente la conexión a tu base de datos PostgreSQL en el archivo `db.js`y crear el archivo `.env` con tus credenciales.
- Este script no incluye validaciones exhaustivas ni manejo de errores más allá de lo necesario para su funcionamiento básico.

## Código fuente

El código fuente de la API se encuentra en el siguiente repositorio de GitHub:

[https://github.com/danilojpalma/mi_banco.git](https://github.com/danilojpalma/mi_banco.git)

En el repositorio, se pueden encontrar los archivos de configuración de la base de datos (`db.js`) y las consultas a la base de datos (`queries.js`).

## Licencia

Este proyecto se encuentra bajo la licencia MIT. Para más información, consultar el archivo `LICENSE.md`.