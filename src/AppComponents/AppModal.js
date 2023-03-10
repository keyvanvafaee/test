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
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function AppModal({status}) {

    //console.log(`[APP modal] ${status.theCard}`);
    // console.log(status.theCard)
    // useEffect(()=> { console.log(`mount ${props.status.showModal}`)
    //     return ()=> {console.log("unmount")}} , [props.status.showModal] );
    //-------------------------

    const {state , dispatch} = useContext(AppContext);
    const [open, setOpen]    = useState(status.showModal);


    const [theCard , setTheCard] = useState({
        ...status.theCard

    })
    console.log(theCard);
    const todoDetailRef      = useRef();
    //-------------------------
    const changeTheCard = (value , paylod) =>{

        switch (paylod)
        {
            case "name":
            {
                setTheCard({
                    ...theCard , name: value
                })
            }
            break;
            case "detail":
            {
                setTheCard({
                    ...theCard , detail: value
                })

            }
            break;
        }



    }


    //-------------------------
    const action = () =>
    {
        switch (status.payload)
        {
            case "ADD":
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
                            status    : "todo",
                            timestamp : new Date().getTime()


                        }})

                    status.setShowModal(false);
                    status.todoNameRef.current.value = "";

                }
            }
            break;
            case "EDIT":
                {

                    console.log("final "  , theCard)
                    dispatch({type : "EditToDo" , payload : theCard});
                    status.setShowModal(false);


                }
            break;
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
                                {status.payload == "ADD" &&  "Add Todo information" }
                                {status.payload == "EDIT"&& "EDIT Todo information" }

                            </Typography>
                            <Typography variant="h5" component="div" mt={2}>
                                {status.payload == "ADD" && <TextField value={status.todoNameRef.current.value}  size="small" id="outlined-basic" label="ToDo name Ex : Reading" variant="outlined" />}
                                {status.payload == "EDIT"&& <TextField defaultValue={theCard.name}  size="small" id="outlined-basic" label="Edit name" variant="outlined"  onChange={(e)=>changeTheCard(e.target.value , "name")} />}
                            </Typography>
                            <Typography variant="body2" mt={3}>
                                {status.payload == "ADD" && <TextareaAutosize ref={todoDetailRef} aria-label="minimum height" minRows={3} placeholder="Write Detail" style={{ width: 200 , padding: '5px'}}/>}
                                {status.payload == "EDIT"&& <TextField defaultValue={theCard.detail}  size="small" id="outlined-basic" label="Edit Detail" variant="outlined"   onChange={(e)=>changeTheCard(e.target.value , "detail")} />}


                            </Typography>
                        </CardContent>
                        <CardActions>
                            {status.payload == "ADD" && <Button variant="outlined" size="small" color="success" startIcon={<Icon>check_circle</Icon>} onClick={()=> action()}> ADD </Button>}
                            {status.payload == "EDIT"&& <Button variant="outlined" size="small" color="success" startIcon={<Icon>check_circle</Icon>} onClick={()=> action()}> EDIT </Button>}


                        </CardActions>
                    </Card>
                </Box>
            </Modal>
        </div>
    );
}
export default AppModal;