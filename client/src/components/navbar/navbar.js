import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Navbar, Button, Nav, Container } from 'react-bootstrap';
import decode from 'jwt-decode';


import './navbar.css'
import REDUCERS_CONSTANTS from '../../constants/reducers.js'

const NavigationBar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('login')));

    const dispatch = useDispatch();

    const location = useLocation();
    const history = useHistory();


    const signOut = () => {
        dispatch({ type: REDUCERS_CONSTANTS.LOGOUT });
        history.push('/auth');

        setUser(null);
    }

    // TO CHECK FOR THE NATURAL EXPIRY OF THE JWT-TOKEN
    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) signOut();
        }
        setUser(JSON.parse(localStorage.getItem('login')));
    }, [location]);

    return (
        <div className='sticky-top'>
            <Navbar className='navbar  navbar-expand-md navbar-light my-3' expand="md">
                <Container>
                    <Navbar.Brand>
                        <Link className='navbar-brand' to='/' >Moments</Link>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="navbar-nav py-4 py-md-0 ms-auto">
                            {location.pathname !== '/auth' ?
                                user?.result ? (
                                    <div className='d-flex justify-content-end'>
                                        <h6 className='pt-2 me-4'>{user?.result.name}</h6>
                                        <Button className='mx-3' variant="danger" onClick={signOut}>Sign Out</Button>

                                    </div>
                                ) : (
                                    <div className='nav-item'>
                                        <Link className='nav-link mx-3' to="/auth">Sign In</Link>
                                    </div>
                                )
                                :
                                <div className='nav-item'>
                                    <Link className='nav-link mx-3' to="/">Home</Link>
                                </div>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavigationBar
