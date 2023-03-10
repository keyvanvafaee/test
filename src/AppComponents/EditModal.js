//---------------------------
import React, {useContext}           from "react";
import {useEffect, useRef, useState} from "react";
//---------------------------
import {Box ,Typography , Modal, Button , Card, CardActions, CardContent, Icon, TextareaAutosize, TextField} from "@mui/material";
import {ToastContainer} from "react-toastify";
//---------------------------
import Toastify   from "../HelperComponents/Toastify";
import AppContext from "../Contexts/AppContext";
//---------------------------
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function EditModal({status}) {

    // useEffect(()=> { console.log(`mount ${props.status.showModal}`)
    //     return ()=> {console.log("unmount")}} , [props.status.showModal] );
    //-------------------------
    const {state , dispatch} = useContext(AppContext);
    const [open, setOpen]    = useState(status.showModal);
    const todoDetailRef      = useRef();
    //-------------------------
    const add2TodoList = () =>
    {
        if (todoDetailRef.current.value === '')
        {
            Toastify({type: "error", message: "Enter ToDo Detail !"}) //--- Send Signal To Notify Engine
        }
        else
        {


            dispatch({type : "addToDo" ,
                payload : {
                    number    : state.todoCounter +1 ,
                    name      : status.todoNameRef.current.value ,
                    detail    : todoDetailRef.current.value ,
                    id        : Math.random(),
                    completed : false,
                    timestamp : new Date().getTime()


                }})

            status.setShowModal(false);
            status.todoNameRef.current.value = "";
        }

    }


    return (
        <div>
            {/*-------------- ToastContainer ----------*/}
            <ToastContainer position="top-right"  autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss  draggable pauseOnHover theme="light"/>
            {/*----------------------------------------*/}
            <Modal
                open={open}
                onClose={status.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Card sx={{flex : "auto" , marginTop: "7px" }} >
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Enter ToDo information
                            </Typography>
                            <Typography variant="h5" component="div" mt={2}>
                                <TextField value={status.todoNameRef.current.value} required size="small" id="outlined-basic" label="ToDo name Ex : Reading" variant="outlined" />
                            </Typography>
                            <Typography variant="body2" mt={3}>
                                <TextareaAutosize
                                    ref={todoDetailRef}
                                    aria-label="minimum height"
                                    minRows={3}
                                    placeholder="Write Detail"
                                    style={{ width: 200 , padding: '5px'}}
                                />
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="outlined" size="small" color="success" startIcon={<Icon>check_circle</Icon>} onClick={()=> add2TodoList()}> Finish</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Modal>
        </div>
    );
}
export default EditModal;