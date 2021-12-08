import mongoose from 'mongoose'

const{Schema,model}=mongoose

const patientSchema=new Schema(
    {
        email:{type:String,required:true},
        password:{type:String},
        zipcode:{type:Number,required:true},
        role:{type:String,required:true},
        firstName:{type:String,required:true},
        lastName:{type:String,required:true},
        bio:{type:String},
        photo:{type:String}
    },{timestamps:true}
)

export default model('patient',patientSchema)