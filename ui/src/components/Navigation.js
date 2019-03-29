import React from 'react'

import { Nav, Navbar, Container} from 'react-bootstrap'

import { Link } from 'react-router-dom'

const Navigation = () => (
    <Navbar style={{backgroundColor: '#fff'}}>
        <Container>
            <Navbar.Brand href="/">React-Readable</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item>
                        <Link style={{color: '#000', textDecoration: 'none'}} to="/posts/new">Write Something</Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)

export default Navigation