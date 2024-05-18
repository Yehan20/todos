import mongoose from "mongoose";

//  create Schema
const TodoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
  
    },
    checked:{
        type:Boolean,
        required:true,
    
        
    }

})

const todoModal = mongoose.model('todo',TodoSchema);

export default todoModal;