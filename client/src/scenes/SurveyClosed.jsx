import React from "react";
import { Heading, Text } from 'theme-ui'
import { defaultCloseDate } from '../../../common/schema'

/**
 * Fallback component that renders if the survey has been closed
 * 
 * @param {string} date - the date that the survey closed 
 */
export const SurveyClosed = ({ date = defaultCloseDate }) => {
    return (
        <div className="container">
            <div id="logo-container">
                <img src="logo.png" id="logo" alt="% project logo"/>
            </div>

            <header className="section-header">
                <Heading>Survey Closed</Heading>
            </header>
            <div className="default">
                <Text>
                    {`The survey has been closed for this year on ${new Date(date).toLocaleString()}, but thank you for your interest!
                    
                    If you have any questions regarding the survey or would like to get in touch, please contact us at hello@percentageproject.com.`}
                </Text>
            </div>
        </div>
    );
};
