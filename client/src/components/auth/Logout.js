import React,{Fragment} from 'react';
import { NavLink } from 'reactstrap'
import {  useDispatch } from "react-redux";
import allActions from '../../actions'

function Logout() {

    const dispatch = useDispatch()

    return (
        <Fragment>
            <NavLink onClick={() => dispatch(allActions.authActions.logout())} href='#'>
                Logout
            </NavLink>
        </Fragment>
    )
}

export default Logout;
