const connection = require('../../db/db');
const servicios = require('../models/IndicadorModel')
const servicios2 = require('./HistorialModel')
const sHistorial = new servicios2.historialServicios();

import {Request, Response} from "express";

class metasServicios{

    async getMetas(res : Response) {
        const TASK_QUERY = "select * from metas"
        connection.query(TASK_QUERY, (err : string, respose : Response) =>{
            if(err) console.log(err)
            else res.send(respose)
        })
    }

    async createMetas(res : Response,req : Request) {
        const ADD_QUERY = `insert into metas values ('${req.body.id}','${req.body.nombre}', 'Añadir', 0, 0);`
        connection.query(ADD_QUERY, (err : string) =>{
            if(err) console.log(err)
            else res.send('addmetas')
        })
    }

    async setAprobado(_res : Response,id : string) {
    
        const myArray = id.split("-");
        id = myArray[0];
        const solicitud = myArray[1];

        const UPDATE_QUERY = `UPDATE metas SET Aprobado = 1 WHERE id = "${id}";`
        connection.query(UPDATE_QUERY, (err : string) =>{
            if(err) console.log(err)
        })

        var today = new Date();
        var now = today.toLocaleString();

        if(solicitud === 'Añadir'){
            sHistorial.createHistorial(0,{body: { id_imm: id, tipo: 2, solicitud: 'Añadir', estado: 'Aprobado', fecha: now }} );
        }else{
            sHistorial.createHistorial(0,{body: { id_imm: id, tipo: 2, solicitud: 'Eliminar', estado: 'Rechazado', fecha: now }} );  
        }
    }
    

    async setPeticion(_res : Response,id : string) {
        const ADD_QUERY = `UPDATE metas SET Peticion = 'Eliminar', Aprobado = 0 WHERE id = '${id}';`
        connection.query(ADD_QUERY, (err : string) =>{
            if(err) console.log(err)
        })   
    }

    async deleteMetas(_res : Response, id : string){
        const myArray = id.split("-");
        id = myArray[0];
        const solicitud = myArray[1];
        const D = Math.random().toString(36).substr(2,18);

        const sIndicadores = new servicios.indicadoresServicios();
        const DELETE_QUERY = `SELECT id FROM indicadores WHERE idMeta = '${id}'`
        connection.query(DELETE_QUERY, (err : string, res : Response) =>{
            if(err) console.log(err)
            else{
                var idIndicadores = res.map(function(x) {
                    return x.id;
                 });
                 sIndicadores.setMetas(0,{body: { id: 0, idIndicadores: idIndicadores }} );
            }
        })
        const ADD_QUERY = `UPDATE metas SET id ='${D}',Aprobado = 2, antiguaid = '${id}' WHERE id = '${id}';`
        connection.query(ADD_QUERY, (err : string) =>{
            if(err) console.log(err)
        })

        sHistorial.setHistorial(0,{body: { D: D, id: id, tipo: 2}} ); 
        
        var today = new Date();
        var now = today.toLocaleString();

        if(solicitud === 'Eliminar'){
            sHistorial.createHistorial(0,{body: { id_imm: `${D}`, tipo: 2, solicitud: 'Eliminar', estado: 'Aprobado', fecha: now }} ); 
        }else{
            sHistorial.createHistorial(0,{body: { id_imm: `${D}`, tipo: 2, solicitud: 'Añadir', estado: 'Rechazado', fecha: now }} );   
        }

    }
}

module.exports = {
    metasServicios
};