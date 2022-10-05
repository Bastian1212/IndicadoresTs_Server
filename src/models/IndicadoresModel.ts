const connection = require('../../db/db');
const servicios = require('./HistorialModel')
const sHistorial = new servicios.historialServicios();
import {Request, Response} from "express";


class indicadoresServicios{

    async getIndicadores(res : Response) {
        const TASK_QUERY = "select * from indicadores ORDER BY Aprobado"
        connection.query(TASK_QUERY, (err : string, respose : Request) =>{
            if(err) console.log(err)
            else res.send(respose)
        })
    }

    async createIndicador(res : Response,req : Request) {
        const ADD_QUERY = `insert into indicadores values ('${req.body.id}','${req.body.CalificacionCORFO}','${req.body.NumeroIndicador}','${req.body.MisionUniversitaria}','${req.body.nombre}','${req.body.TipoIndicador}','${req.body.eje}','${req.body.Unidad}','${req.body.FuenteInformacion}', '${req.body.Responsable}', '${req.body.Frecuencia}', 0, 'Añadir', ${req.body.idMetrica}, 0)`
        connection.query(ADD_QUERY, (err : string) =>{
            if(err) console.log(err)
            else res.send('addindicadores')
        })
    }

    async setMetricas(_res : Response,req : Request) {
        for(let i=0; i < req.body.idIndicadores.length ; i++){ 
            const ADD_QUERY = `UPDATE indicadores SET idMetrica = ${req.body.id} WHERE id = "${req.body.idIndicadores[i]}";`
            connection.query(ADD_QUERY, (err : string) =>{
                if(err) console.log(err)
            })   
        }
    }

    async setAprobado(_res : Response,id  : string ) {
        
        const myArray = id.split("_");
        id = myArray[0];
        const solicitud = myArray[1];
        const now = myArray[2];

        const UPDATE_QUERY = `UPDATE indicadores SET Aprobado = 1 WHERE id = "${id}";`
        connection.query(UPDATE_QUERY, (err : string) =>{
            if(err) console.log(err)
        })

        if(solicitud === 'Añadir'){
            sHistorial.createHistorial(0,{body: { id_imm: id, tipo: 1, solicitud: 'Añadir', estado: 'Aprobado', fecha: now }} );
        }else{
            sHistorial.createHistorial(0,{body: { id_imm: id, tipo: 1, solicitud: 'Eliminar', estado: 'Rechazado', fecha: now }} );  
        }
    }

    async setPeticion(_res : Response ,id : string) {
        const ADD_QUERY = `UPDATE indicadores SET Peticion = 'Eliminar', Aprobado = 0 WHERE id = '${id}';`
        connection.query(ADD_QUERY, (err : string) =>{
            if(err) console.log(err)
        })   
    }

    async deleteIndicador(_res : Response, id : string){
        const myArray = id.split("_");
        id = myArray[0];
        const solicitud = myArray[1];
        const now = myArray[2];

        const D = Math.random().toString(36).substr(2,18);

        //sMetas.deleteMetasIndicador(0,{body: { id: `${id}`, D: `${D}`}} ); 

        const ADD_QUERY = `UPDATE indicadores SET id ='${D}',Aprobado = 2, antiguaid = '${id}' WHERE id = '${id}';`
        connection.query(ADD_QUERY, (err : string) =>{
            if(err) console.log(err)
        })

        sHistorial.setHistorial(0,{body: { D: D, id: id, tipo: 1}} ); 

        if(solicitud === 'Eliminar'){
            sHistorial.createHistorial(0,{body: { id_imm: `${D}`, tipo: 1, solicitud: 'Eliminar', estado: 'Aprobado', fecha: now }} ); 
        }else{
            sHistorial.createHistorial(0,{body: { id_imm: `${D}`, tipo: 1, solicitud: 'Añadir', estado: 'Rechazado', fecha: now }} );   
        }

    }
}

module.exports = {
    indicadoresServicios
};