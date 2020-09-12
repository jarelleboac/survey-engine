import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { signupAction } from "../actions/session";
import { Heading,  Label, Input, Box, Button } from 'theme-ui'

export const Signup = () => {
    const errors = useSelector(state => state.errors)
    const dispatch = useDispatch()
    const handleSubmit = e => {
        e.preventDefault();
        const user = {
            email: e.target[0].value,
            password: e.target[1].value,
        };
        dispatch(signupAction(user));
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
                    <Heading>Signup</Heading>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        name='email'
                        type='email'
                        id='email'
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