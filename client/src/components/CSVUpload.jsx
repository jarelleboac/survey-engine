import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { readString } from 'react-papaparse'

import CSVReader from 'react-csv-reader'
import { Button, Label, Textarea, Box, Heading, Flex, Text } from 'theme-ui'
import { triggerToast, filterEmails } from '../utils'
import { submissionStatus } from '../../../common/schema'

export const CSVUpload = ({setFreshData}) => {
    const emailsRef = useRef()
    const [message, setMessage] = useState("")
    const state = useSelector(state => state)

    useEffect(() => {
        if (message) triggerToast(message)
    }, [message])

    const sendEmails = () => {
        
        if (emailsRef.current.length === 0) {
            setMessage("Please upload a CSV containing emails first, or enter emails below.");
            setMessage("")
            return;
        } 
        // Get rid of whitespace on every email
        emailsRef.current = emailsRef.current.map(email => email.trim())

        const [validEmails, invalidEmails] = filterEmails(emailsRef.current)
        if (invalidEmails.length !== 0) {
            setMessage("Please make sure your emails are valid emails.")
            // TODO: We should populate invalid emails section as a separate page
        }
        // Ready to dispatch emails to API
        // POST request using fetch with error handling
        fetch(`${process.env.REACT_APP_API_URL}/email/${state.session.school}`, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', credentials: 'include',
                    Authorization: `${localStorage.jwtToken}`,
                    withCredentials: true, },
                body: JSON.stringify({ emails: validEmails })
            })
            .then(res => {
                if (!res.ok) throw Error(res.statusText)
                else return res.json()
            })
            .then(res => {
                setMessage(res.message)
                setFreshData(false)
                setMessage("")
            })
            .catch(error => {
                console.error(error)
                setMessage(`Error: ${error.msg}`);
                setMessage("")
            });
    }

    // Handler for the text input region
    const handleTextSubmit = (e) => {
        const results = readString(e.target[0].value).data.flat()
        emailsRef.current = results
        sendEmails()
    }

    return(
        <>
            <Heading mt='20px'>Upload Emails</Heading>
            <div className="csv-upload">
                <CSVReader onFileLoaded={(data) => {
                    emailsRef.current = data.flat()
                }
                } />
                <Button onClick={sendEmails}>Upload</Button>
            </div>
            <Box
                as='form'
                onSubmit={e => {
                    e.preventDefault() 
                    handleTextSubmit(e)}
                }>
  
                <Label htmlFor='text-emails'>Emails</Label>
                <Textarea
                    name='text-emails'
                    id='text-emails'
                    rows='6'
                    mb={3}
                />
                <Button>
                    Submit
                </Button>
            </Box>
        </>)

}

export const TestEmailUpload = ({sendEmailsFetch}) => {
    const [testEmails, setTestEmails] = useState([])

    // Handles trying to submit text for the tester email box
    const handleTextSubmit = (e) => {
        const results = readString(e.target[0].value).data.flat()
        let cleanedEmails = results.map(email => email.trim())

        const [validEmails, invalidEmails] = filterEmails(cleanedEmails)
        if (invalidEmails.length !== 0) {
            triggerToast("Please make sure your emails are valid emails.")
        } else {
            setTestEmails(validEmails);
            triggerToast(`Set ${validEmails.length} emails successfully.`)
        }
    }

    return(<>
        <Heading mt='20px'>Send Test Surveys</Heading>
        <Text>First, add emails separated by commas, then hit submit. Then, select the template you wish to send.</Text>
        <Box
            as='form'
            onSubmit={e => {
                e.preventDefault() 
                handleTextSubmit(e)}
            }>
  
            <Label htmlFor='text-test-emails'>Emails for Testing</Label>
            <Textarea
                name='text-test-emails'
                id='text-test-emails'
                rows='6'
                mb={3}
            />
            <Button>
                    Submit
            </Button>
        </Box>
        <Flex>
            <Button mt='15px' mr='20px' onClick={() => {
                sendEmailsFetch(submissionStatus.unsent, true, testEmails)
            }}>Send Unsent Email Template</Button>
            <Button mt='15px' mr='20px' onClick={() => {
                sendEmailsFetch(submissionStatus.sent, true, testEmails)
            }}>Send Reminder Email Template</Button>
        </Flex>
    </>)
}