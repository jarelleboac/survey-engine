import React from "react";
import { Heading, Text } from 'theme-ui'


export const ThankYou = () => {
    return (
        <div className="container">
            <div id="logo-container">
                <img src="logo.png" id="logo" alt="% project logo"/>
            </div>

            <header className="section-header">
                <Heading>Thank You</Heading>
            </header>
            <div className="default">
                <Text>
                    Thank you for your participation!
                    
                    If you have any questions regarding the survey or would like to get in touch, please contact us at hello@percentageproject.com.
                </Text>
            </div>
        </div>
    );
};
