import express from "express";
const servicios = require('../models/MetasModel')
const router = express.Router();
const sMetas = new servicios.metasServicios();

router.get('/lista', (req,res)=> {
    sMetas.getMetas(res,req);
})

router.post('/addmetas', (req,res)=> {
    sMetas.createMetas(res,req);
})

router.put('/setaprobado/:id', (req,res)=> {
    sMetas.setAprobado(res,req.params.id);
})

router.put('/setpeticion/:id', (req,res)=> {
    sMetas.setPeticion(res,req.params.id);
})

router.put('/deletemetas/:id', (req,res)=> {
    sMetas.deleteMetas(res,req.params.id)
})

module.exports = router;