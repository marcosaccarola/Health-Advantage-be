import express from 'express'
import PatientModel from './schema.js'
import InterventionModel from '../interventions/schema.js'

const patientRouter=express.Router()

patientRouter.post('/login',async(req,res,next)=>{
    try {
        const{email,password}=req.body
        const user=await PatientModel.checkCredentials(email,password)
        if(user){
            res.send(user)
        }else{
            res.status(404).send('User not found.')
        }
    } catch (error) {
        next(error)
    }
})
// patientRouter.post('/intervention',async(req,res,next)=>{
//     try {
//         const updatedUser=await PatientModel.findByIdAndUpdate(
//             req.body.userId,
//             {$push:{published:req.body}},
//             {new:true}
//         )
//         res.send(updatedUser)
//     } catch (error) {
//         next(error)
//     }
// })
patientRouter.post('/',async(req,res,next)=>{
    try {
        const patient=new PatientModel(req.body)
        const{_id}=await patient.save()
        res.status(201).send(patient)
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