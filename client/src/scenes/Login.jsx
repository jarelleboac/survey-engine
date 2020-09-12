import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginAction } from "../actions/session";
import { Heading,  Label,
    Input, Box, Button } from 'theme-ui'

const mapStateToProps = ({ errors }) => ({
    errors
});

const Login = ({ errors, login }) => {
    const dispatch = useDispatch()
    const handleSubmit = e => {
        e.preventDefault();
        const user = {
            email: e.target[0].value,
            password: e.target[1].value,
        };
        dispatch(loginAction(user));
    }
    return (
        <> 
            <div className="container">
                <div id="logo-container">
                    <img src="logo.png" id="logo" alt="% project logo"/>
                </div>
                <Box
                    as='form'
                    onSubmit={e => handleSubmit(e)}
                    className="login"
                >
                    <Heading>Login</Heading>
                    <Label htmlFor='username'>Username</Label>
                    <Input
                        name='username'
                        id='username'
                        mb={3}
                    />
                    <Label htmlFor='password'>Password</Label>
                    <Input
                        type='password'
                        name='password'
                        id='password'
                        mb={3}
                    />
                    <p>{errors}</p>

                    <Button>Submit</Button>
                </Box>
                
            </div>
        </>
    );
};

export default connect(
    mapStateToProps,
)(Login);