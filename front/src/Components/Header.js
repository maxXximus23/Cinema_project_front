import React, { Component } from "react";
import './Header.css'
import {
    Navbar,
    Nav,
    FormControl,
    Container,
    Form,
    Button
} from "react-bootstrap";
import Switch from "react-bootstrap/esm/Switch";
import logo from "./logo192.png";
import avatar from "./user128.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "../Pages/Home";
import Contacts from "../Pages/Contacts";
import Booking from "../Pages/Booking";

export default class Header extends Component {
    render (){
        return (
            <>
            <Navbar className="navbar-custom" collapseOnSelect /*fixed="top"*/ expand="md" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                        src={logo}
                        height="30"
                        width="30"
                        className="d-inline-block align-top"
                        alt="Logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <div className="custom-nav">
                            <Nav.Link href="/"> Home </Nav.Link>
                            </div>
                            <div className="custom-nav">
                            <Nav.Link href="/booking"> Booking </Nav.Link>
                            </div>
                            <div className="custom-nav">
                            <Nav.Link href="/contacts"> Contacts </Nav.Link>
                            </div>
                        </Nav>
                        <Form inline >
                            <Button href="/registr" style={{marginRight: 10, backgroundColor: "#A64D4D"}} variant="secondary">Sign up</Button>
                            <Button href="/login" style={{marginRight: 10, backgroundColor: "#ABB4B4"}} variant="secondary">Sign in</Button>
                        </Form>
                        <Navbar>
                            <a href = "/account">
                                <img
                                src={avatar}
                                height="30"
                                width="30"
                                className="d-inline-block align-top"
                                alt="Avatar"
                                />
                                </a>
                                </Navbar>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/booking" component={Booking} />
                    <Route exact path="/contacts" component={Contacts} />
                </Switch>
            </Router>
            </>
        )
    }
}