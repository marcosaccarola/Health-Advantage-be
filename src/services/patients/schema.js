import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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
        photo:{type:String},
        // published:[{type:Schema.Types.ObjectId,ref:"intervention"}]
        published:{type:Array,default:[]}
    },{timestamps:true}
)
patientSchema.pre('save',async function(next){
    const newPatient=this
    const plainPW=newPatient.password
    if(newPatient.isModified('password')){
        newPatient.password=await bcrypt.hash(plainPW,10)
    }
    next()
})
patientSchema.methods.toJSON=function(){
    const patientDocument=this
    const patientObj=patientDocument.toObject()
    delete patientObj.password
    delete patientObj.__v
    return patientObj
}
patientSchema.statics.checkCredentials=async function(email,plainPW){
    const patient=await this.findOne({email})
    if(patient){
        const isMatch=await bcrypt.compare(plainPW,patient.password)
        if(isMatch) return patient
        else return null
    }else return null
}

export default model('patient',patientSchema)