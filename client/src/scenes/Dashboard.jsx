import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading,  Label, Input, Box, Button } from 'theme-ui'
import { resetPasswordAction } from "../actions/session";

export const Dashboard = () => {
    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault();
        const user = {
            email: e.target[0].value,
            password: e.target[1].value,
            newPassword: e.target[2].value
        };
        dispatch(resetPasswordAction(user));
    }
    return (
        <> 
            <Box
                as='form'
                onSubmit={e => handleSubmit(e)}
                className="login"
            >
                <Heading>Dashboard</Heading>
                <Label htmlFor='email'>Email</Label>
                <Input
                    name='email'
                    id='email'
                    mb={3}
                />
                <Label htmlFor='password'>Old Password</Label>
                <Input
                    type='password'
                    name='password'
                    id='password'
                    mb={3}
                />
                <Label htmlFor='newPassword'>New Password</Label>
                <Input
                    type='password'
                    name='newPassword'
                    id='newPassword'
                    mb={3}
                />


                <Button>Reset Password</Button>
            </Box>
        </>
    );
};