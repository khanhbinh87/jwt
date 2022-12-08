import express from 'express'
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 8081

//config view engine
configViewEngine(app)

//init web router
initWebRoutes(app)

app.listen(PORT, () => {
    console.log('server run at ' + PORT)
})
