import React, { useState,useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Axios from 'axios'

interface  UpdateModalType{

    updateId:number;
    updateModalShow:boolean
    todos:any,
    setUpdateId:React.Dispatch<React.SetStateAction<number>>,
    setUpdateShow:React.Dispatch<React.SetStateAction<boolean>>
    getTodos:any
}

const UpdateModal:React.FC<UpdateModalType> = ({updateModalShow,updateId,setUpdateId,setUpdateShow,todos,getTodos}) => {
    const [updateName,setUpdatedName]=useState<string>('')
    // const [updateID,setUpdatedID]=useState<string>('')
    const [todo,setTodo] = useState<any>('');
    
    useEffect(()=>{

        let todo = todos.filter((todo:any,index:any)=> index  + 1  === updateId)
      
        setUpdatedName(todo[0].name);
        setTodo(todo[0]);
    
    },[updateId])


    const handleClose=()=>{
       setUpdateShow(false)
       setUpdateId(0);
    }

    const updateTodo = async ()=>{
        try{
            const {data} = await Axios.put('http://localhost:5000/todos/update',
            {  name:updateName,
              _id:todo._id})
              
            if(data.success){
                handleClose();
                setUpdateId(0)
                alert('Updated');
                getTodos();
            }
        }
        catch(e){
           console.log(e);
        }

    }

    return (
    <Modal show={updateModalShow} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Update Todo</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {todo && <Form>

      <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
          <Form.Label>new Name</Form.Label>
          <Form.Control
            name='name'
            type="text"
            placeholder="Jon Doe"
            autoFocus
            value={updateName}
            onChange={(e)=>setUpdatedName(e.target.value)}
          />
        </Form.Group>
      </Form>
}
    </Modal.Body>
    <Modal.Footer>
      <Button  variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={updateTodo}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default UpdateModal