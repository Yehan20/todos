import todoModal from "../model/Todo.js";


const addTodo = async (req, res) => {
    console.log(req.body);
    try {
        const todo = await todoModal.create({
            name: req.body.name,
            checked: req.body.checked,
            
        })
        
        console.log(todo)

        res.status(200).json({success: true})
    } 
    catch (e) {
        console.log(e);
        res.status(500).json({success: false})
    }

}

const getTodos = async (req, res) => {
    try{
        const todos = await todoModal.find()
        res.send(todos)
    }catch(e){
        console.log(e);
    }

}

const deleteTodo = async (req, res) => {
    try {
        await todoModal.remove({_id: req.params.id})
        res.status(200).json({success: true})
    } catch (e) {
        res.status(500).json({success: false})
    }

}

const updateTodo = async (req, res) => {
    try {
        // console.log(req.body);
         await todoModal.findByIdAndUpdate(req.body._id, {name: req.body.name})
         res.status(200).json({success:true})
    } catch (e) {
        console.log(e);
        res.status(500).json({success:false})
    }
}

const updateTask = async (req, res) => {
    try {
        // console.log(req.body);
         await todoModal.findByIdAndUpdate(req.body._id, {checked:req.body.checked})
         res.status(200).json({success:true})
    } catch (e) {
        console.log(e);
        res.status(500).json({success:false})
    }
}

const sortByName = async (req,res)=>{
    try{
        const todos = await todoModal.find().collation({'locale': "en"}).sort("feild name")
        res.send(todos)
    }catch(e){
        console.log(e);
    }
}



const todoController = {
    addTodo,
    getTodos,
    deleteTodo,
    updateTodo,
    sortByName,
    updateTask
}

export default todoController;
