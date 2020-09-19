import React from 'react'
import { useDispatch } from "react-redux";
import { Heading, Label, Input, Box, Button } from 'theme-ui'
import { createUserAction } from "../actions/session";

export const CreateUser = () => {
    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault();
        const user = {
            email: e.target[0].value,
            password: e.target[1].value,
            role: e.target[2].value,
            school: e.target[3].value
        };
        dispatch(createUserAction(user));
    }
    return (
        <>
            <Box
                as='form'
                onSubmit={e => handleSubmit(e)}
                className="login"
            >
                <Heading className="section-header">Create User</Heading>
                <Label htmlFor='email'>Email</Label>
                <Input
                    name='email'
                    id='email'
                    mb={3}
                />
                <Label htmlFor='password'>Temporary Password</Label>
                <Input
                    type='password'
                    name='password'
                    id='password'
                    mb={3}
                />
                <Label htmlFor='role'>Role</Label>
                <Input
                    type='text'
                    name='role'
                    id='role'
                    mb={3}
                />
                <Label htmlFor='school'>School</Label>
                <Input
                    type='text'
                    name='userRole'
                    id='userRole'
                    mb={3}
                />

                <Button>Create User</Button>
            </Box>
        </>
    )
}