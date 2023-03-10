import React, {useState , useRef , useEffect} from "react";
//-------------------------
import { ToastContainer, toast } from 'react-toastify'; // Notification Lib
import {Box, TextField, Grid, FormControl , Icon  , Button} from "@mui/material";
//-------------------------
import AppModal from "./AppModal";
import Toastify from "../HelperComponents/Toastify";
//-------------------------
function AddToDo()
{

    // useEffect(()=> { console.log(`mount AddTODO`)
    //     return ()=> {console.log("Will Unmount")}} , [] );

    //---------------------------------------
    const [showModal , setShowModal] = useState(false);
    const handleClose = () =>  openAppModal(false);
    const todoNameRef   = useRef(null);
    //---------------------------------------
    const openAppModal = (value) => todoNameRef.current.value === '' ? Toastify({type:"error" , message:"Enter ToDo Name !"}) : setShowModal(value);
    //---------------------------------------
    return(
            <>
                {/*-------------- ToastContainer ----------*/}
                <ToastContainer position="top-right"  autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss  draggable pauseOnHover theme="light"/>
                {/*----------------------------------------*/}
                { showModal &&  <AppModal status={{payload :"ADD" ,  showModal , setShowModal, handleClose , todoNameRef , theCard :{} }} />}
                {/*----------------------------------------*/}
                <Grid container xs={10} >
                    <TextField inputRef={todoNameRef} sx={{   display : "flex" , flex : "auto"}} size="small" id="outlined-basic" label="Add toDo" variant="outlined" />
                </Grid >
                <Grid container xs={2} >
                    <Button  variant="contained" color="success" startIcon={<Icon>task_alt</Icon>} onClick={()=>openAppModal(true)}> Add</Button>
                </Grid>
            </>
    )
}

export default AddToDo;