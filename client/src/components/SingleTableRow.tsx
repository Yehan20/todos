import React from 'react'

import { FaCheck} from "react-icons/fa";
import { GrClose } from "react-icons/gr";

interface PersonData{
  name:string;
  checked:boolean,
  id:number,
 _id:string,
  setDeleteId:React.Dispatch<React.SetStateAction<number>>
  setDeleteModalShow:React.Dispatch<React.SetStateAction<boolean>>
  setUpdateId:React.Dispatch<React.SetStateAction<number>>,
  setUpdateShow:React.Dispatch<React.SetStateAction<boolean>>
  deleteTodo:(id: string) => Promise<void>
  updateTask:(id: string,checked:boolean) => Promise<void>

} 

const SingleTableRow:React.FC<PersonData> = ({_id,name,checked,id,setDeleteModalShow,setDeleteId,setUpdateId,setUpdateShow,deleteTodo,updateTask}) => {
  const handleDelete = ()=>{
    //  setDeleteId(id);
    // setDeleteModalShow(false)
     deleteTodo(_id)
     setDeleteModalShow(true)
     alert('deleted');
  
  }

  const handleUpdate = ()=>{
    setUpdateId(id)
    setUpdateShow(true)
 }
  return (
        
         <tr style={{backgroundColor:checked?'#f5f5f5':''}}>
          <td style={{display:'flex',cursor:'pointer'}} onClick={()=>updateTask(_id,!checked)}>{checked ? <FaCheck color='green'/> : <GrClose color='red'/>}</td>
          <td>{id}</td>
          <td>{name}</td>
      
        
          <td className='d-flex gap-2'>
            <button className=' btn btn-success' onClick={handleUpdate}>Edit</button>
            <button className=' btn btn-danger' onClick={handleDelete}>Delete</button>
          </td>
        </tr>
        

   
  )
}
export default SingleTableRow
