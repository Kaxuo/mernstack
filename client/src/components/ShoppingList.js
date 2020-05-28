import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap'
import { useDispatch, useSelector } from "react-redux";
import Button from '@material-ui/core/Button';
import allActions from '../actions'
import { makeStyles } from '@material-ui/core/styles';
import Fade from 'react-reveal/Fade';
import { motion } from 'framer-motion'
import Box from '@material-ui/core/Box';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CircularProgress from '@material-ui/core/CircularProgress';


// setitems ([...items,{id...,name....}])
function ShoppingList() {

    var randomColor = require('randomcolor');
    var color = randomColor({ count: 100, luminosity: "light" })


    // dispatch = action
    const dispatch = useDispatch()
    // item => like mapstatetoprops, same as in the rootreducer
    const { items, loading } = useSelector(state => state.item)
    const { isAuthenticated } = useSelector(state => state.auth)
    const [state] = useState(color)
    const useStyles = makeStyles((theme) => ({
        root: {
            fontSize: "20px",
        },
    }));

    const classes = useStyles()

    useEffect(() => {
        dispatch(allActions.itemActions.getItems())
    }, [dispatch]);

    const onDeleteClick = id => {
        dispatch(allActions.itemActions.deleteItem(id))
    }

    if (loading) {
        return <div style={{ color: "white", textAlign: "center", paddingTop: "5%" }}>
            <h2 >Loading Items</h2>
            <br />
            <CircularProgress color="secondary" />
        </div>
    }
    return (
        <ListGroup>
            <TransitionGroup className="shopping-list">
                {items && items.map(({ _id, name }, index) => (
                    index % 2 ?
                        (<CSSTransition timeout={500} classNames="fade" >
                            <motion.div whileHover={{ scale: 0.9, padding: 10, transition: { duration: 1 } }}>
                                <Fade left>
                                    <ListGroupItem key={_id} style={{ backgroundColor: `${state[index]}` }} >
                                        <Box display="flex">
                                            <Box><strong>{name}</strong></Box>
                                            <Box style={{ marginLeft: "auto" }} >
                                                <Button className="remove-btn" variant="contained" color="primary" disabled={!isAuthenticated} onClick={() => onDeleteClick(_id)}>Delete</Button>
                                            </Box>
                                        </Box>
                                    </ListGroupItem>
                                </Fade>
                            </motion.div>
                        </CSSTransition>)
                        :
                        (<CSSTransition timeout={500} classNames="fade" >
                            <motion.div whileHover={{ scale: 0.9, padding: 10, transition: { duration: 1 } }}>
                                <Fade right>
                                    <ListGroupItem key={_id} style={{ backgroundColor: `${state[index]}` }} >
                                        <Box display="flex">
                                            <Box><strong>{name}</strong></Box>
                                            <Box style={{ marginLeft: "auto" }} >
                                                <Button className="remove-btn" variant="contained" color="primary" disabled={!isAuthenticated} onClick={() => onDeleteClick(_id)}>Delete</Button>
                                            </Box>
                                        </Box>
                                    </ListGroupItem>
                                </Fade>
                            </motion.div>
                        </CSSTransition>)

                ))}
            </TransitionGroup>
        </ListGroup>
    )
}



// Connect will always take 2 parameters, 1st one is always the same, second one are the actions 

// const mapStateToProps = (state) => ({
//     // state.item comes from rootreducer , THE ITEM NOW REPRESENTS THE STATE
//     item:state.item
// }) 
export default ShoppingList
