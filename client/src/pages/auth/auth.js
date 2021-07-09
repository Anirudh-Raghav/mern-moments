import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

import './auth.css'
import { signIn, signUp } from '../../actions/authentication.js'
// import REDUCERS_CONSTANTS from '../../constants/reducers';

const Auth = () => {

    const [authForm, setAuthForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });

    const dispatch = useDispatch();
    const history = useHistory();

    const [isSignUp, setIsSignUp] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const onSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            dispatch(signUp(authForm, history));
        } else {
            dispatch(signIn(authForm, history));
        }
    };

    const clear = () => setAuthForm({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });


    return (
        <Container className='custom-container mt-5 mx-auto'>

            <div className='row'>
                <div className='col-md-6 mb-5 d-flex justify-content-center'>
                    <button className={`btn btn-outline-primary ${isSignUp && 'disabled'}`} onClick={() => { setIsSignUp(true); clear(); }} >Sign Up</button>
                </div>
                <div className='col-md-6 mb-5 d-flex justify-content-center'>
                    <button className={`btn btn-outline-primary ${!isSignUp && 'disabled'}`} onClick={() => { setIsSignUp(false); clear(); }} >Sign In</button>
                </div>
            </div>
            {
                isSignUp ?
                    <Form className='mb-5' onSubmit={onSubmit}>
                        <Row className='mb-3'>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicfirstName">
                                    <Form.Label>Enter first name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter last name" value={authForm.firstName} onChange={(e) => setAuthForm({ ...authForm, firstName: e.target.value })} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicLastName">
                                    <Form.Label>Enter last name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter last name" value={authForm.lastName} onChange={(e) => setAuthForm({ ...authForm, lastName: e.target.value })} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label>Re-enter password</Form.Label>
                            <Form.Control type="password" placeholder="Re-enter password" value={authForm.confirmPassword} onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })} onBlur={() => { if (authForm.confirmPassword !== authForm.password) setPasswordsMatch(false) }} />
                            {!passwordsMatch &&
                                <Form.Text className="text-muted">
                                    The passwords don't match
                                </Form.Text>
                            }
                        </Form.Group>


                        <Button variant="primary" type="submit">Sign Up</Button>
                    </Form>


                    :


                    <Form className='mb-5' onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} />
                        </Form.Group>

                        <Button variant="primary" type="submit">Sign In</Button>
                    </Form>
            }
        </Container >
    )
}

export default Auth