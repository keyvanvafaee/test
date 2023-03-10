
//------ USED CONTEXT + REDUCERS + MUI
//----------------------------------            --- React BIF Components ---
import React, {useEffect, useReducer, useState} from "react";
//----------------------------------            --- React External Components ---
import {Box, Button, Fade, Grid, Grow, Icon, Pagination, PaginationItem, Slide, Zoom} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
//----------------------------------            --- MY React Components ---
import AddToDo from "./AddToDo";

//----------------------------------            --- Reducers + Contexts ---
import AppContext from "../Contexts/AppContext";
import appReducer from "../Reducers/AppReducer";
import ToDo from "./ToDo";
import TodoState from "./TodoState";


//----------------------------------


function App()
{



    const cardsLength = (val) => state.cards.filter(card=> card.status === val);

    const [state , dispatch] = useReducer(appReducer , {
        nightMode : false ,
        showType : "todo",
        badges : {completed : 0 , deleted : 0},
        todoCounter : 3,
        cards : [   {number : 1 , name : "ToDo One"   , detail:"Detail about todo one"    , status : "todo" , id : Math.random() , timestamp : new Date().getTime() },
                    {number : 2 , name : "Todo Two"   , detail:"Detail about todo two"    , status : "todo" , id : Math.random() , timestamp : new Date().getTime() },
                    {number : 3 , name : "Todo Three" , detail:"Detail about todo three"  , status : "todo" , id : Math.random() , timestamp : new Date().getTime() },

        ]});








    return(
        <Grid container xs={12} sm={9} md={6} sx={{ bgcolor: "#f1f8e9\n" ,  alignContent : "start",  border : "2px solid gray"   , height: "500px" , borderRadius : "10px" , margin : "30px auto"}}  >



            <Grid container  xs={12} sm={9} md={6} margin="30px auto"  padding="10px" >
                    <AppContext.Provider value={{state  , dispatch}}>
                        <AddToDo />


                        <Box   border="1px solid  gray" margin="15px auto" borderRadius="10px">
                            <TodoState/>
                        </Box>


                        <Zoom in={state.cards} style={{ transitionDelay: '500ms' }}>
                                <Grid  overflow="auto"   Content="center" container maxHeight="340px"    padding={1} >
                                    {
                                        cardsLength(state.showType).length ?
                                            state.cards.map( (card) =>  (

                                                <ToDo  keys={card.id} showType={state.showType}  status={card.status} number = {card.number} name={card.name} detail ={card.detail} />  ))

                                            : <div style={{margin:"auto"}}>

                                                    There is no todo <br/>

                                                </div>
                                    }
                                </Grid>

                        </Zoom>



                    </AppContext.Provider>
            </Grid>
        </Grid>
    )
}
export default App;