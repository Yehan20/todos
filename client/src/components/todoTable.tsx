import Axios from 'axios';
import React ,{useState,useEffect,useCallback} from 'react'
import SingleTableRow  from './SingleTableRow'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'
import UpdateModal from './updateModal';



type ModalType={
  show:boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,

  handleClose:()=>void
  handleShow: ()=>void
  
}

type TodoData={
  name:string;
  checked:false
  _id:string,
}
 
  const UserTable:React.FC<ModalType> = ({show,handleClose}) => {
     
;
    const [deleteId,setDeleteId] =useState<number>(0);
    const [updateId,setUpdateId] =useState<number>(0);
   
    const [todo,setTodo] = useState<TodoData[]>([]);
    const [singleTodo,setSingeTodo]= useState<TodoData>({name:'',checked:false,_id:''});

   
    const [change,setChange] = useState<number>(0)
    const [deleteModalShow,setDeleteModalShow]=useState<boolean>(false)
    const [updateModalShow,setUpdateShow]=useState<boolean>(false)
    const [isSort,SetisSortName]=useState<boolean>(true);

    const getTodo = useCallback(async()=>{
      try{
       
          const {data} = await Axios.get('http://localhost:5000/todos/all');
          // generateId(data)
          setTodo(data)
         
    
      }
      catch(e){
        console.log(e);
      }
 
    },[])
    

    const handleInput = (e:any)=>{

       const name:string = e.target.name;
       const value:string = e.target.value;
       setSingeTodo({...singleTodo,[name]:value})

    }
    

 

    const addPerson  = async ()=>{
      if(singleTodo.name==='' ) {
         alert('Fill Feilds')
         return 
      }
      try{
        const {data} = await Axios.post('http://localhost:5000/todos/add',singleTodo)
        if(data.success){
          setChange(Math.floor(Math.random()*10))
         }
       
        handleClose()
        alert('Added')
      }catch(e){
        console.log(e);
      }
    }

    const deleteTodo = async(id:string)=>{
      try {
        const response = await Axios.delete(`http://localhost:5000/todos/delete/${id}`);
        console.log(response.data); // Handle successful deletion (optional)
        // Update your UI to reflect the deletion (see next step)
      } catch (error) {
        console.error('Error deleting item:', error);
        // Handle errors (optional)
      }
    }

    const updateTask = async (id:string,checked:boolean)=>{
      try{
          const {data} = await Axios.put(`http://localhost:5000/todos/update-task/${id}`,
          {  
            _id:id,
            checked:checked
          })
            
          if(data.success){
                getTodo()
          }
      }
      catch(e){
         console.log(e);
      }

  }


    const sortName = async(name:string)=>{
      console.log('hi')
      SetisSortName(!isSort)
      try{
        if(isSort){
          const {data} = await Axios.get('http://localhost:5000/todos/sortName');
          console.log(data);
          // setPeople(data)
        }
        else{
          getTodo()
        }

      
      }
      catch(e){
        console.log(e);
      }
    }



    useEffect(()=>{
       getTodo()
 
    },[change,deleteId,getTodo,updateId,deleteModalShow])  

  return (
    <>
      <table className='table table-bordered '>
        <thead className='bg-dark text-white'>
          <tr>
            <th>Status</th>
            <th>Number</th>
            <th>Task Name </th>
          
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {
            todo.map((single_todo:TodoData,index)=>{
              
              return <SingleTableRow 
               id={index + 1}
              {...single_todo} 
              setUpdateShow={setUpdateShow} 
              key={index} 
              setDeleteId={setDeleteId} 
              setUpdateId={setUpdateId} 
              setDeleteModalShow={setDeleteModalShow}
              deleteTodo = {deleteTodo}
              updateTask = {updateTask}
          
              
              />
            })
        }
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <div className='d-flex gap-3'>
          <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                required
                name='name'
                type="text"
                placeholder="Feed the Dog"
                autoFocus
                onChange={(e)=>handleInput(e)}
              />
            </Form.Group>

       

          </div>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button  variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addPerson}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      
      { updateModalShow &&  <UpdateModal 
        updateModalShow={updateModalShow} 
        setUpdateId={setUpdateId} 
        updateId={updateId} 
        todos={todo}
        getTodos = {getTodo}
        setUpdateShow={setUpdateShow}
      /> 
    }
    </>
  )
}
export default UserTable
