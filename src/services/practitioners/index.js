import express from 'express'
import PractitionerModel from './schema.js'

const practitionerRouter=express.Router()

practitionerRouter.post('/',async(req,res,next)=>{
    try {
        const newPractitioner=new PractitionerModel(req.body)
        const{_id}=await newPractitioner.save()
        res.status(201).send({_id})
    } catch (error) {
        next(error)
    }
})
practitionerRouter.post('/login',async(req,res,next)=>{
    try {
        const{email,password}=req.body
        const user=await PractitionerModel.checkCredentials(email,password)
        if(user){
            res.send(user)
        }else{
            res.status(404).send('User not found.')
        }
    } catch (error) {
        next(error)
    }
})
practitionerRouter.put('/:userId/addIntervention/:interventionId',async(req,res,next)=>{
    try {
        const updatedPractitioner=await PractitionerModel.findByIdAndUpdate(
            req.params.userId,
            {$push:{InterventionsTakenInCharge:req.params.interventionId}},
            {new:true}
        ).populate({path:'InterventionsTakenInCharge',select:'zipcode interventionRequested moreInfo answers'})
        res.status(201).send(updatedPractitioner)
    } catch (error) {
        next(error)
    }
})
practitionerRouter.delete('/:userId/removeIntervention/:interventionId',async(req,res,next)=>{
    try {
        const updatedPractitioner=await PractitionerModel.findByIdAndUpdate(
            req.params.userId,
            {$pull:{InterventionsTakenInCharge:{_id:req.params.interventionId}}},
            {new:true}
        ).populate({path:'InterventionsTakenInCharge',select:'zipcode interventionRequested moreInfo answers'})
        res.status(201).send(updatedPractitioner)
    } catch (error) {
        next(error)
    }
})
practitionerRouter.get('/:id',async(req,res,next)=>{
    try {
        const practitioner=await PractitionerModel.findById(req.params.id)
        if(practitioner){
            res.send(practitioner)
        }else{
            res.status(404).send('Practitioner not found.')
        }
    } catch (error) {
        next(error)
    }
})

export default practitionerRouter