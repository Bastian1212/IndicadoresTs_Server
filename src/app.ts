import express from "express";
const cors = require('cors');
const bodyParser = require('body-parser');

//Rutas 
const rIndicadores = require('./router/rIndicadores');
const rMetricas = require('./routes/rMetricas');
const rMetas = require('./routes/rMetas');
const rHistorial = require('./routes/rHistorial')



const app = express();
app.use(cors());
app.use(bodyParser.json());  

const PORT = 4000 

app.use("/indicadores",rIndicadores);

app.use('/metricas', rMetricas);

app.use('/metas', rMetas);

app.use('/historial', rHistorial)




app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})