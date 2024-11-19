import React,{useState} from "react";
import Button from 'react-bootstrap/Button';
import InputModal from "../components/inputModel";

const Home=()=>{

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <>
         <Button onClick={handleShow}>Click Here</Button>
        {show && <InputModal show={show} handleClose={handleClose}/>}
        </>
        
    )
}

export default Home;