import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap'
import { useSelector, useDispatch } from "react-redux";
import allActions from '../../actions'

// import  {v4} from 'uuid'

function LoginModal() {

    const [modal, setmodal] = useState(false)
    const [info, setinfo] = useState({
        email: "",
        password: ""
    })
    const [msg, setmsg] = useState('hello')
    const dispatch = useDispatch()

    // In reducer, index.js
    const { isAuthenticated } = useSelector(state => state.auth)
    const error = useSelector(state => state.error)

    const toggle = () => {
        // Clear errors so that they don't last forever
        dispatch(allActions.errorActions.clearErrors())
        setmodal(!modal)
        setinfo({
            email: "",
            password: "",
        })
    }

    const onChange = e => {
        setinfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const {email,password} = info
        const user = {
            email,
            password
        }
        dispatch(allActions.authActions.login(user))
        if (modal) {
            if (isAuthenticated) {
                toggle()
            }
        }
    }

    // ComponentDidupdate ! 
    useEffect(() => {
        if (error.id === "LOGIN_FAIL") {
            setmsg(error.msg.msg)
        } else {
            setmsg(null)
        }
        // !!!! you had an issue here, below, you put msg, but that only changed when error.id changed, so you had to put another value
    }, [error.id,isAuthenticated,error.msg.msg]);

    return (
        <div>
            <NavLink onClick={() => toggle()} href='#'> Login</NavLink>
            <Modal isOpen={modal} toggle={() => toggle()}>
                <ModalHeader toggle={() => toggle()}> Login</ModalHeader>
                <ModalBody>
                    {msg && <Alert color="danger">{msg}</Alert>}
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input className="mb-3" type="email" name="email" id="email" placeholder="Email" onChange={onChange} />
                            <Label for="password">Password</Label>
                            <Input className="mb-3" type="password" name="password" id="password" placeholder="Password" onChange={onChange} />
                            <Button color="dark" type="submit" style={{ marginTop: "2rem" }} block > Login</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default LoginModal;
