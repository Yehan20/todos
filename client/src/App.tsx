import React, { useState} from 'react';
import UserTable  from './components/todoTable';
import 'bootstrap/dist/css/bootstrap.min.css';

import './css/style.css';

const App: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);


  const handleClose= () =>setShow(false);
  const handleShow = () => setShow(true);
  

   
  

  return (
    <div className="App">
      <h1>Todo's</h1>
 
      <div className='employe-options gap-3 d-flex justify-content-end'>

     
        <button className='btn btn-primary btn-add ' onClick={handleShow} >Add a Todo</button>
      </div>
      <UserTable show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow}/>
    </div>
  );
}

export default App;
