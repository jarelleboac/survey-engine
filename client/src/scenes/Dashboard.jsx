import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Label, Input, Box, Button, Divider } from 'theme-ui'
import { resetPasswordAction } from "../actions/session";
import { validEmail, triggerToast, changeSenderEmail } from "../utils";

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

const SetSenderEmail = ({school}) => {

    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target[0].value;
        if (!validEmail(email)) {
            triggerToast("Please enter a valid email.")
            return
        }

        const data = {
            email: email,
        };

        // Submit data and trigger toast
        changeSenderEmail(data, school)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    triggerToast(res.error)
                } else if (res.message) {
                    triggerToast(res.message)
                }
            })
            .catch(err => triggerToast(err.error))
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
    const session = useSelector(state => state.session)
    return (
        <div className="default">
            <Heading>Dashboard</Heading>
            <Divider />
            <Heading>Reset Password</Heading>
            <ResetPassword />
            
            <Divider />
            <Heading>Change AWS Sender Email</Heading>
            <SetSenderEmail school={session.school}/>
        </div>
    )  
};