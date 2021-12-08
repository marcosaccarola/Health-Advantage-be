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
practitionerRouter.get('/:id',async(req,res,next)=>{
    try {
        const practitioner=await PractitionerModel.findById(req.params.id)
        if(practitioner){
            res.send(practitioners)
        }else{
            res.status(404).send('Practitioner not found.')
        }
    } catch (error) {
        next(error)
    }
})

export default practitionerRouter