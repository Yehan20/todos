import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import  dotenv from 'dotenv'
import todoRoutes from './routes/todo.routes.js'

//  ENV 
const KEY =function(){
    if( process.env.CONNECTION_URL===undefined){
        // console.log('wrong')
        return dotenv.config().parsed.CONNECTION_URL
    }
    console.log('run')
   return  process.env.CONNECTION_URL
}()

const app = express();
const port = 5000



// Middle Wheare
app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use(express.json())



app.use('/todos',todoRoutes)



app.listen(port, () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(KEY, 
        () => {
        console.log('Connetect');
    })

})