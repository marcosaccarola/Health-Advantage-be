import express from 'express'
import listEndpoints from 'express-list-endpoints'
import cors from 'cors'
import mongoose from 'mongoose'
import practitionerRouter from './services/practitioners/index.js'
import patientRouter from './services/patients/index.js'
import interventionRouter from './services/interventions/index.js'

const server=express()
const PORT=process.env.PORT||3001

// *____________________________________ MIDDLEWARES
const corsOptions = {
    origin:[process.env.FE_PROD_URL,process.env.FE_DEV_URL]
  }
server.use(cors(corsOptions))
server.use(express.json())

// *____________________________________ ROUTES
server.use('/practitioner',practitionerRouter)
server.use('/patient',patientRouter)
server.use('/intervention',interventionRouter)

// *____________________________________ ERROR HANDLERS


// *____________________________________ CONNECTION
mongoose.connect(process.env.MONGO_CONNECTION)
mongoose.connection.on('connected',()=>{
    console.log('CONNECTED TO MONGO')
    server.listen(PORT,()=>{
        console.table(listEndpoints(server))
        console.log(`RUNNING ON PORT ${PORT}`)
    })
})
mongoose.connection.on('error',(err)=>{
    console.log(err)
})