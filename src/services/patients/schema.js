import mongoose from 'mongoose'

const{Schema,model}=mongoose

const patientSchema=new Schema(
    {
        email:{type:String,required:true},
        password:{type:String,required:true},
        zipcode:{type:Number,required:true},
        role:{type:String,required:true},
        firstName:{type:String},
        lastName:{type:String},
        bio:{type:String},
        photo:{type:String}
    },{timestamps:true}
)

export default model('patient',patientSchema)