import express from 'express'
import PatientModel from './schema.js'

const patientRouter=express.Router()

patientRouter.post('/',async(req,res,next)=>{
    try {
        const patient=new PatientModel(req.body)
        const{_id}=await patient.save()
        res.status(201).send({_id})
    } catch (error) {
        next(error)
    }
})
patientRouter.get('/:id',async(req,res,next)=>{
    try {
        const patient=await PatientModel.findById(req.params.id)
        if(patient){
            res.send(patient)
        }else{
            res.status(404).send('Patient not found.')
        }
    } catch (error) {
        next(error)
    }
})

export default patientRouter