import express from 'express'
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import bodyParser from 'body-parser'
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 8081

//config view engine
configViewEngine(app)


//config body-parser

// create application/json parser
app.use(bodyParser.json())
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))

//init web router
initWebRoutes(app)





app.listen(PORT, () => {
    console.log('server run at ' + PORT)
})
