import React, { useState, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap'
import RegisterModal from './auth/RegisterModal'
import Logout from './auth/Logout'
import LoginModal from './auth/LoginModal'
import { useSelector } from "react-redux";

function AppNavbar() {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const { isAuthenticated, user } = useSelector(state => state.auth)

    const authLinks = (
        <Fragment>
            <NavItem>
                <span className="navbar-text mr-3"><strong>{user && `Welcome ${user.name}`}</strong></span>
            </NavItem>
            <NavItem>
                <Logout />
            </NavItem>
        </Fragment>
    )
    const guestLinks = (
        <Fragment>
            <NavItem>
                <RegisterModal />
            </NavItem>
            <NavItem>
                <LoginModal />
            </NavItem>
        </Fragment>
    )

    return (
        <div>
            {/* dark property = dark so white letters , expand = hamburser when small */}
            <Navbar color="dark" dark expand="sm" className="mb-5" style={{zIndex:1}}>
                <Container>
                    <NavbarBrand href="/"> Shopping List</NavbarBrand>
                    <NavbarToggler onClick={() => toggle()} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {isAuthenticated ? authLinks : guestLinks}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default AppNavbar;
