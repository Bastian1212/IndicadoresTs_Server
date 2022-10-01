import express from "express";
const servicios = require('../models/IndicadoresModel')
const sIndicadores = new servicios.indicadoresServicios();

const router = express.Router();

router.get('/lista', (_req,res)=> {
    sIndicadores.getIndicadores(res);
})

router.post('/addindicadores', (_req,res)=> {
    sIndicadores.createIndicador(res,_req);
})

router.put('/setmetricas', (_req,res)=> {
    sIndicadores.setMetricas(res,_req);
})
router.put('/setmetas', (_req,res)=> {
    sIndicadores.setMetas(res,_req);
})

router.put('/setaprobado/:id', (_req,res)=> {
    sIndicadores.setAprobado(res,_req.params.id);
})

router.put('/setpeticion/:id', (_req,res)=> {
    sIndicadores.setPeticion(res,_req.params.id);
})

router.put('/deleteindicadores/:id', (_req,res)=> {
    sIndicadores.deleteIndicador(res,_req.params.id)
})

module.exports = router;