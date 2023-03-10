import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import {useContext, useState} from "react";
import AppContext from "../Contexts/AppContext";
import {Badge, Divider, Icon} from "@mui/material";

export default function TodoState() {

    const [open, setOpen] = useState(false);
    const {state , dispatch} = useContext(AppContext);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Grid container justifyContent="center">


                    <Grid item>
                        <Tooltip  title="show remained todo">

                            <Button  startIcon={<Icon>task</Icon>} onClick={()=> dispatch({type : "showTodo" })} >ToDo </Button>
                        </Tooltip>

                    </Grid>
                <Divider orientation="vertical" flexItem/>
                <Badge badgeContent={state.badges.completed} color="success"  max={3}>
                    <Grid item>
                        <Tooltip  title="show completed todo">
                            <Button   startIcon={<Icon>done_all</Icon>} onClick={()=> dispatch({type : "showCompleted"})}>Completed</Button>
                        </Tooltip>
                    </Grid>
                </Badge>
                <Divider orientation="vertical" flexItem/>
                <Badge badgeContent={state.badges.deleted} color="warning"  max={3}>
                    <Grid item>
                        <Tooltip   title="show deleted todo">
                            <Button startIcon={<Icon>delete</Icon>} onClick={()=> dispatch({type : "showDeleted" })}> Deleted</Button>
                        </Tooltip>
                    </Grid>
                </Badge>
            </Grid>
        </>
    );
}