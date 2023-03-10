
import React, {useContext, useRef, useState} from 'react'
//----------------------
import {Card, CardActions, CardContent, Icon, Typography, Button} from "@mui/material";
//----------------------
import AppModal from "./AppModal";
import AppContext from "../Contexts/AppContext";
//----------------------
function ToDo(props)
{


    const [manager , setManager] = useState({

        showModal : false,
        theCard : {}

    });
    const handleClose = () =>  setShowModal(false);
    const {state , dispatch} = useContext(AppContext);
    //-------------------------------
    const setShowModal = (value) => {

        setManager({...manager , showModal: value});
    }

    const completeTodo = (event) => {
        const todoNumber = event.currentTarget.parentElement.parentElement.childNodes[0].childNodes[0].innerHTML;
        const theCard = state.cards.filter((card)=> card.number == todoNumber);
        // console.log(theCard[0]);
        dispatch({type : "completeTodo" , payload:theCard[0]});
    }

    const deleteTodo = (event) =>{

        const todoNumber = event.currentTarget.parentElement.parentElement.childNodes[0].childNodes[0].innerHTML;

        const theCard = state.cards.filter((card)=> card.number == todoNumber);

        console.log(theCard);

        dispatch({type : "deleteTodo" , payload:theCard[0]});

    }

    const editTodo = (event) => {

        const todoNumber = event.currentTarget.parentElement.parentElement.childNodes[0].childNodes[0].innerHTML;// --- Find The Number Of Todo

        //console.log(todoNumber)
        const theCard = state.cards.filter((card)=>
        {
            return card.number == todoNumber ? card : '';
        })


        {/*----------------------------------------*/}
        setManager({
            showModal:  true, theCard
        })

        {/*----------------------------------------*/}

    }

    return(
        <>
            {manager.showModal &&  <AppModal status={{payload :"EDIT" , showModal : manager.showModal , setShowModal, handleClose , theCard : manager.theCard[0]  }} />}

            {

                    ( props.showType === props.status ) ?
                    <Card  sx={{ border :"1px solid black",  flex : "auto" , marginTop: "7px"  , backgroundColor: "#f0f4c3\n" , width :"100%" }} >
                        <CardContent sx={{ height : "60px"}}>
                            <Typography sx={{fontSize : 12}} color="text.secondary" gutterBottom>
                                {props.number}
                            </Typography>
                            <Typography  component="div">
                                <b> {props.name} </b>
                            </Typography>
                            <Typography variant="body2">
                                {props.detail}
                                <br />

                            </Typography>
                        </CardContent >
                        {
                            props.status === "todo" &&
                            <CardActions >

                                <>
                                    <Button variant="outlined" size="small" color="success"
                                            startIcon={<Icon>check_circle</Icon>}
                                            onClick={(event) => completeTodo(event)}> Finish</Button>
                                    <Button variant="outlined" size="small" color="primary" startIcon={<Icon>edit</Icon>}
                                            onClick={(event) => editTodo(event)}> Edit </Button>
                                    <Button variant="outlined" size="small" color="error" startIcon={<Icon>delete</Icon>}
                                            onClick={(event) => deleteTodo(event)}> Delete</Button>
                                </>
                            </CardActions>
                        }
                    </Card> : ""
            }




        </>

    )
}
export default ToDo;