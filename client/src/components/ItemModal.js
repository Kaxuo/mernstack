import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from "react-redux";
// import  {v4} from 'uuid'
import allActions from '../actions'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';


function ItemModal() {

    const useStyles = makeStyles((theme) => ({
        root: {
            backgroundColor: "white",
            height:"100%"
        },
        button: {
            backgroundImage: "linear-gradient(to right top, #748aac, #7198b9, #6ea7c3, #6eb5cb, #72c3cf)",
            height: "100%",
            textAlign: "center",
            paddingTop: "2%",
            color: "white",
        },
        field:{
            backgroundColor:"white",
            width:"120%",
            margin:"0% 0% 5% 5%",
            color:"white",
            border:"1px solid blue",
            borderRadius: "5px",
            [theme.breakpoints.down('sm')]: {
                width:"100%"
              },
        }
    }));
    const classes = useStyles()

    const [name, setname] = useState('')
    const dispatch = useDispatch()

    const { isAuthenticated } = useSelector(state => state.auth)


    const onChange = e => {
        setname(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const newItem = {
            // id:v4(), we dont need it anymore since MongoDB will add it for us
            // You had an issue where the handlechange would always show object object after typing, it's because you have name.name below ! 
            name: name
        }
        // add item via addItemActions
        dispatch(allActions.itemActions.addItem(newItem))
        setname('')
    }
    return (
        <div className={classes.root}>
            <div className={classes.button}>
                    <form onSubmit={onSubmit}>
                        <Box display="flex">
                            <Box>
                                <TextField disabled={!isAuthenticated}  className={classes.field} value={name} required id="outlined-basic" label={isAuthenticated ? "Item" : "Please Register or Log in "} variant="outlined" type="text" name="name" placeholder="Add Shopping Item" onChange={(e) => onChange(e)} />
                            </Box>
                            <Box style={{ marginLeft: "auto", marginRight:"10px" }} p={1} >
                                <Button className={classes.but} disabled={!name} type="submit" variant="contained" color="primary"  > Add Item</Button>
                            </Box>
                        </Box>
                    </form>
            </div>
        </div>
    )
}

export default ItemModal;
