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

select * from transferencias
select * from cuentas