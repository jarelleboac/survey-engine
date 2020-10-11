import {toast} from 'react-toastify'

// Triggers a toast error with the given message
export const triggerToast = (err) => toast(err);

// Checks to see if a single email is valid 
export const validEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Transforms strings into where the first value is capitalized, remaining are lowercase
 * 
 * @param {string} input – input string to be converted 
 */
export const capitalizeString = (input) => (
    input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
)

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
export const sendEmails = (school, status) => (fetch(`${process.env.REACT_APP_API_URL}/email/${school}/sendEmails`, 
    {
        headers: { 
            'Content-Type': 'application/json', 
            credentials: 'include',
            Authorization: `${localStorage.jwtToken}`,
            withCredentials: true, 
        },
        method: "POST",
        body: JSON.stringify({requestType: status})
    }))

/**
 * Submits a single completed survey
 * 
 * @param {string} school – the school to write to
 * @param {string} token – UUID for the survey
 * @param {JSON} responses – survey responses matching the schema
 */
export const submitSurvey = (school, token, responses) => (
    fetch(`${process.env.REACT_APP_API_URL}/survey`, 
        {
            headers: { 
                'Content-Type': 'application/json', 
                credentials: 'include',
                Authorization: `${localStorage.jwtToken}`,
                withCredentials: true, 
            },
            method: "POST",
            body: JSON.stringify({school, token, responses})
        })
)

/**
 * Handles getting all survey responses for a certain school
 * 
 * @param {string} school – user school 
 */
export const getSurveyResponses = (school) => (
    fetch(`${process.env.REACT_APP_API_URL}/survey/${school}`, 
        {
            headers: { 
                'Content-Type': 'application/json', 
                credentials: 'include',
                Authorization: `${localStorage.jwtToken}`,
                withCredentials: true, 
            },
        })
)

/**
 * 
 * @param {Function} fetchFunction – calls the fetching function then downloads the JSON
 */
export const downloadJSON = (fetchFunction) => {
    fetchFunction()
        .then(res => {
            if (!res.ok) throw Error(res.statusText)
            else return res.json()
        }).then(res => {
        // Create a temp link for downloading
            const downloadLink = document.createElement("a");
            const jsonString = JSON.stringify(res)
            const file = new Blob([jsonString], { type: "application/json" });
            downloadLink.href = URL.createObjectURL(file);
            downloadLink.download = "responses.json";
            document.body.appendChild(downloadLink)
            downloadLink.click();
            document.body.removeChild(downloadLink)
        }).catch(err => {
            console.error(err)
        })
}

/**
 * Handles getting all survey responses for a certain school
 * 
 */
export const getMasterSurveyResponses = () => (
    fetch(`${process.env.REACT_APP_API_URL}/survey/allResponses`, 
        {
            headers: { 
                'Content-Type': 'application/json', 
                credentials: 'include',
                Authorization: `${localStorage.jwtToken}`,
                withCredentials: true, 
            },
        })
)

/**
 * Handles getting all survey responses for a certain school
 * 
 * @param {string} school – user school 
 */
export const changeSenderEmail = (data, school) => (
    fetch(`${process.env.REACT_APP_API_URL}/email/${school}/changeSenderEmail`, 
        {
            headers: { 
                'Content-Type': 'application/json', 
                credentials: 'include',
                Authorization: `${localStorage.jwtToken}`,
                withCredentials: true, 
            },
            method: "POST",
            body: JSON.stringify(data)
        })
)

/**
 * Handles getting all survey responses for a certain school
 * 
 * @param {string} token – email token to unsubscribe 
 */
export const unsubscribe = (token) => (
    fetch(`${process.env.REACT_APP_API_URL}/email/unsubscribe`, 
        {
            headers: { 
                'Content-Type': 'application/json', 
                credentials: 'include',
                withCredentials: true, 
            },
            method: "POST",
            body: JSON.stringify({token: token})
        })
)