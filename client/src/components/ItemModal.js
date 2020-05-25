import React, { useState } from 'react';
import {Button,Modal,ModalHeader,ModalBody,Form,FormGroup,Label,Input} from 'reactstrap'
import { useDispatch } from "react-redux";
// import  {v4} from 'uuid'
import allActions from '../actions'

function ItemModal() {

    const [modal, setmodal] = useState(false)
    const [name, setname] = useState('')
    const dispatch = useDispatch()

    const toggle = () => {
        setmodal(!modal)
    }

    const onChange = e => {
        setname({[e.target.name] : e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const newItem = {
            // id:v4(), we dont need it anymore since MongoDB will add it for us
            name:name.name
        }
        // add item via addItemActions
        dispatch(allActions.itemActions.addItem(newItem))
        toggle()
        console.log(newItem)
    }
    return (
        <div>
            <Button color="dark" style={{marginBottom:'2rem'}} onClick={() => toggle()}> Add Items </Button>
            <Modal isOpen={modal} toggle={() => toggle()}>
                <ModalHeader toggle={() => toggle()}> Add To Shopping List</ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="item">Item</Label>
                            <Input type="text" name="name" id="item" placeholder="Add Shopping Item" onChange={onChange}/>
                            <Button color="dark" style={{marginTop:"2rem" }} block> Add Item</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ItemModal;
