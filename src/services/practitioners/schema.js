import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const{Schema,model}=mongoose

const practitionerSchema=new Schema(
    {
        email:{type:String,required:true},
        password:{type:String},
        zipcode:{type:Number,required:true},
        role:{type:String,required:true},
        firstName:{type:String,required:true},
        lastName:{type:String,required:true},
        age:{type:Number},
        profession:{type:String,required:true},
        educationalQualification:{type:String,required:true},
        medicalBoard:{type:String,required:true},
        bio:{type:String},
        photo:{type:String},
        specializations:{type:String},
        // InterventionsTakenInCharge:{type:Array,default:[]}
        InterventionsTakenInCharge:[{type:Schema.Types.ObjectId,ref:'intervention'}]
    },{timestamps:true}
)
practitionerSchema.pre('save',async function(next){
    const newPractitioner=this
    const plainPW=newPractitioner.password
    if(newPractitioner.isModified('password')){
        newPractitioner.password=await bcrypt.hash(plainPW,10)
    }
    next()
})
practitionerSchema.methods.toJSON=function(){
    const practitionerDocument=this
    const practitionerObject=practitionerDocument.toObject()
    delete practitionerObject.password
    delete practitionerObject.__v
    return practitionerObject
}
practitionerSchema.statics.checkCredentials=async function(email,plainPW){
    const practitioner=await this.findOne({email})
    if(practitioner){
        const isMatch=await bcrypt.compare(plainPW,practitioner.password)
        if(isMatch) return practitioner
        else return null
    }else return null
}

export default model('practitioner',practitionerSchema)