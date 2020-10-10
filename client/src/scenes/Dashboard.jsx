import React from "react";
import { useDispatch } from "react-redux";
import { Heading,  Label, Input, Box, Button } from 'theme-ui'
import { resetPasswordAction } from "../actions/session";

const ResetPassword = () => {
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
}

const SetSenderEmail = () => {
    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            email: e.target[0].value,
        };
        // dispatch(resetPasswordAction(email));
    }
    return (
        <> 
            <Box
                as='form'
                onSubmit={e => handleSubmit(e)}
                className="default"
            >
                
                <Label htmlFor='senderEmail'>New Sender Email</Label>
                <Input
                    name='senderEmail'
                    id='senderEmail'
                    mb={3}
                />


                <Button>Set Sender Email</Button>
            </Box>
        </>
    );

}

export const Dashboard = () => {
    return (
        <div className="default">
            <Heading className="section-header">Dashboard</Heading>
            <ResetPassword />
        </div>
    )  
};