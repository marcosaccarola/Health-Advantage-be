import mongoose from 'mongoose'

const{Schema,model}=mongoose

const interventionSchema=new Schema(
    {
        userId:{type:String,required:true},
        zipcode:{type:Number,required:true},
        interventionRequested:{type:String,required:true},
        moreInfo:{type:String},
        answers:{type:Array,default:[]}
    },{timestamps:true}
)

export default model('intervention',interventionSchema)