import express from 'express'
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import bodyParser from 'body-parser'
import configCors from './config/cors';
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 8081


configCors(app)
//config view engine
configViewEngine(app)

//config body-parser

// create application/json parser
app.use(bodyParser.json())
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))

//init web router
initWebRoutes(app)
initApiRoutes(app)

app.listen(PORT, () => {
    console.log('server run at ' + PORT)
})
