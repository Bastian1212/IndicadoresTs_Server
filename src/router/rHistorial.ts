import express from "express";
const servicios = require('../models/HistorialModel')
const router = express.Router();
const sHistorial = new servicios.historialServicios();

router.get('/lista', (_req,res)=> {
    sHistorial.getHistorialPeticiones(res);
})

module.exports =  router;