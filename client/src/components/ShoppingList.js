import React, {useEffect } from 'react';
import {Container, ListGroup, ListGroupItem,Button} from 'reactstrap'
import {CSSTransition,TransitionGroup} from 'react-transition-group'
import { useDispatch, useSelector } from "react-redux";
import allActions from '../actions'

// setitems ([...items,{id...,name....}])
function ShoppingList() {
    // dispatch = action
    const dispatch = useDispatch()
    // item => like mapstatetoprops, same as in the rootreducer
    const {items} = useSelector(state => state.item)


    useEffect(() => {
        dispatch(allActions.itemActions.getItems())
    }, [dispatch]);

    const onDeleteClick = id => {
        dispatch(allActions.itemActions.deleteItem(id))
    }
    return(
        <Container>
            <ListGroup>
                <TransitionGroup className="shopping-list">
                    {items && items.map(({_id,name}) => (
                        <CSSTransition key ={_id} timeout={500} classNames="fade">
                            <ListGroupItem key={_id}>
                                <Button className="remove-btn" color="danger" size="sm" onClick={() => onDeleteClick(_id)}>&times;</Button>
                                {name}
                            </ListGroupItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ListGroup>
        </Container>
    )}



// Connect will always take 2 parameters, 1st one is always the same, second one are the actions 

// const mapStateToProps = (state) => ({
//     // state.item comes from rootreducer , THE ITEM NOW REPRESENTS THE STATE
//     item:state.item
// }) 
export default ShoppingList
