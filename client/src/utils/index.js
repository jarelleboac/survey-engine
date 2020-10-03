import {toast} from 'react-toastify'

// Triggers a toast error with the given message
export const triggerToast = (err) => toast(err);

// Checks to see if a single email is valid 
export const validEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Checks to see if the entire list of values are valid emails, returning the invalid emails
export const getInvalidEmails = (emails) => emails.filter(email => !validEmail(email))

export const filterEmails = (emails) => [emails.filter(email => validEmail(email)), emails.filter(email => !validEmail(email))]

// Gets counts for the school
export const getCounts = (school) => (fetch(`${process.env.REACT_APP_API_URL}/email/${school}`, 
    {
        headers: { 'Content-Type': 'application/json', credentials: 'include',
            Authorization: `${localStorage.jwtToken}`,
            withCredentials: true, }
    }))

// Gets counts for the school
export const sendEmail = (school, status) => (fetch(`${process.env.REACT_APP_API_URL}/${school}/sendEmails`, 
    {
        headers: { 'Content-Type': 'application/json', credentials: 'include',
            Authorization: `${localStorage.jwtToken}`,
            withCredentials: true, },
        body: JSON.stringify({requestType: status})
    }))

    