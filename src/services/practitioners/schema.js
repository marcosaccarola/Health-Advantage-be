import mongoose, { Schema } from 'mongoose'

const{Shema,model}=mongoose

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
    },
    {timestamps:true}
)

export default model('practitioner',practitionerSchema)

// "userId":"ottavionzdlfisgu",

// "zipcode":30125,
// "type":"practitioner",
// "firstName":"Ottavio",
// "lastName":"Ottaviani",
// "age":42,
// "profession":"doctor",
// "educationalQualification":"Studente Scienze Infermieristiche",
// "medicalBoard":"Ordine dei Medici di Trento n.2987415",
// "bio":"bio text example (ottavio)",
// "photo":"",
// "specializations":"specializations text example (ottavio)",
// "InterventionsTakenInCharge":[],
// "addedAt":"2021-02-02T06:12:26.668Z",
// "updatedAt":"2021-02-02T06:12:48.930Z"