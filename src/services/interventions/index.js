import express from 'express'
import InterventionModel from './schema.js'
import PatientModel from '../patients/schema.js'

const interventionRouter=express.Router()

interventionRouter.post('/',async(req,res,next)=>{
    try {
        const intervention=new InterventionModel(req.body)
        const{_id}=await intervention.save()
        const updatedUser=await PatientModel.findByIdAndUpdate(
            req.body.userId,
            {$push:{published:_id}},
            {new:true}
            ).populate({path:'published',select:'zipcode interventionRequested moreInfo answers'})
        // const user=await PatientModel.findById(req.body.userId)
        res.status(201).send(updatedUser)
    } catch (error) {
        next(error)
    }
})
interventionRouter.get('/',async(req,res,next)=>{
    try {
        const interventions=await InterventionModel.find()
        res.send(interventions)
    } catch (error) {
        next(error)
    }
})
interventionRouter.get('/:id',async(req,res,next)=>{
    try {
        const intervention=await InterventionModel.findById(req.params.id)
        if(intervention){
            res.send(intervention)
        }else{
            res.status(404).send('Intervention not found.')
        }
    } catch (error) {
        next(error)
    }
})

export default interventionRouter