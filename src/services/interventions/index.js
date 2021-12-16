import express from 'express'
import InterventionModel from './schema.js'
import PatientModel from '../patients/schema.js'
import PractitionerModel from '../practitioners/schema.js'

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
        res.status(201).send(updatedUser)
    } catch (error) {
        next(error)
    }
})
interventionRouter.post('/:interventionId/:userId',async(req,res,next)=>{
    try {
        const practitioner=await PractitionerModel.findById(req.params.userId)
        const updatedIntervention=await InterventionModel.findByIdAndUpdate(
            req.params.interventionId,
            {$push:{answers:practitioner}},
            {new:true}
            ).populate({path:'answers',select:'email zipcode firstName lastName photo profession educationalQualification medicalBoard'})
        console.log(updatedIntervention)
        res.status(201).send(updatedIntervention)
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