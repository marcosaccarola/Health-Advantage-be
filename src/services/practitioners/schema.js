import mongoose from 'mongoose'

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
        InterventionsTakenInCharge:{type:Array,default:[]}
    },{timestamps:true}
)
practitionerSchema.statics.checkCredentials=async function(email,plainPw){
    const practitioner=await this.findOne({email})
    if(practitioner){
        const isMatch=await bcrypt.compare(plainPw,practitioner.password)
        if(isMatch) return practitioner
        else return null
    }else return null
}

export default model('practitioner',practitionerSchema)