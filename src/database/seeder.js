import connection from "./db.js";
import { faker } from "@faker-js/faker";

async function seederProducto() {

    let query = 'SELECT COUNT(*) AS FILAS FROM productos;'

    const [rows] = await connection.query(query);
    if(rows[0].FILAS!==0){
        return {message:"Datos existentes"}
    }
    
    const cafes= ['Latte', 'Latte vainilla', 'Latte chocolate', 'Expresso','Expresso doble', 'Americano','Cappuccino', 'Macchiato']
    query= 'INSERT INTO productos(nombre,precio,stock,estado) VALUES(?,?,?,1)'
    for(let i = 0 ;i<cafes.length ; i++){
        console.log(1)
        const params =[cafes[i],Math.random()*10000,Math.random()*100]
        await connection.execute(query,params)
    }
    return {message:'Datos enviados'}
}
async function seederCliente(){
    let query = 'SELECT count(*) AS filas FROM clientes;'
    const [rows] = await connection.query(query);
    if(rows[0].filas !==0 ){
        return {message:'Tabla con datos'}
    }   
    query = 'INSERT INTO clientes(nombre,tipo,estado) VALUES(?,?,1)'
    for(let i = 0; i<10 ;i++){
        const paramas = [faker.name.fullName(),Math.random()*10>8?"premium":"normal"]
        await connection.execute(query,paramas)
    }
    return{ message:'Datos enviados'}
}

export  {seederProducto, seederCliente};
