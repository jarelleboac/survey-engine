import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

import CSVReader from 'react-csv-reader'
import { Button } from 'theme-ui'
import {triggerToast, filterEmails} from '../utils'


export const CSVUpload = () => {
    const [emails, setEmails] = useState([])
    const [uploaded, setUploaded] = useState(false)
    const [message, setMessage] = useState("")
    const state = useSelector(state => state)

    useEffect(() => {
        if (message) triggerToast(message)
    }, [message])

    const sendEmails = () => {
        
        if (!uploaded) {
            setMessage("Please upload a CSV containing emails first.");
            return;
        } 
        const [validEmails, invalidEmails] = filterEmails(emails)
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
                setMessage("")
            })
            .catch(error => {
                console.error(error)
                setMessage(`Error: ${error.msg}`);
                setMessage("")
            });
    }

    return(
        <div className="csv-upload">
            <CSVReader onFileLoaded={(data) => {
                setUploaded(true)
                setEmails(data.flat())
            }
            } />
            <Button onClick={sendEmails}>Upload</Button>
        </div>
    )

}