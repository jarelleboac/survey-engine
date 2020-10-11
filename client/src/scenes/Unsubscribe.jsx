import React from "react";
import { Heading,Button } from 'theme-ui'
import { unsubscribe, triggerToast } from '../utils'


export const Unsubscribe = ({token}) => {

    const unsubscribeHandler = () => {
        unsubscribe(token)
            .then(res => 
                res.json()
            )
            .then(res => {
                if (res.error) {
                    triggerToast(res.error)
                } else if (res.message) {
                    triggerToast(res.message)
                }
            })
            .catch(err => {
                triggerToast(err)
            })
    }

    return (
        <> 
            <div className="container">
                <div id="logo-container">
                    <img src="logo.png" id="logo" alt="% project logo"/>
                </div>

                <header className="section-header">
                    <Heading>Unsubscribe</Heading>
                </header>
                <div className="default">
                    <Button onClick={() => unsubscribeHandler()}>Unsubscribe</Button>
                </div>
            </div>
        </>
    );
};
