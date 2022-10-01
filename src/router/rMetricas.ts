import express from "express";
const servicios = require('../models/MetricasModel')
const sMetricas = new servicios.metricasServicios();

const router = express.Router();


router.get('/lista', (req,res)=> {
    sMetricas.getMetricas(res,req);
})

router.post('/addmetricas', (req,res)=> {
    sMetricas.createMetricas(res,req);
})

router.put('/setaprobado/:id', (req,res)=> {
    sMetricas.setAprobado(res,req.params.id);
})

router.put('/setpeticion/:id', (req,res)=> {
    sMetricas.setPeticion(res,req.params.id);
})

router.put('/deletemetricas/:id', (req,res)=> {
    sMetricas.deleteMetricas(res,req.params.id)
})

module.exports =  router;