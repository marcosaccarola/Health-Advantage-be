import express from 'express'
import listEndpoints from 'express-list-endpoints'
import cors from 'cors'
import mongoose from 'mongoose'

const server=express()
const PORT=process.env.PORT||3001

// ____________________________________ MIDDLEWARES
server.use(cors())
server.use(express.json())

// ____________________________________ ROUTES


// ____________________________________ ERROR HANDLERS


// ____________________________________ CONNECTION
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