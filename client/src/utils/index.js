import {toast} from 'react-toastify'

// Triggers a toast error with the given message
export const triggerToast = (err) => toast(err);

// Checks to see if a single email is valid 
export const validEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Transforms strings into where the first value is capitalized, remaining are lowercase.
 * If input is a acronym, capitalize the whole string.
 * 
 * @param {string} input – input string to be converted 
 */
export const capitalizeString = (input) => {
    if (['CMU', 'NYU', 'UMD', 'UIUC'].includes(input)) {
        return input.toUpperCase()
    }
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
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


export const getGeneralCounts = (school) => (fetch(`${process.env.REACT_APP_API_URL}/survey/count/${school}`, 
    {
        headers: { 
            'Content-Type': 'application/json', 
            credentials: 'include',
            Authorization: `${localStorage.jwtToken}`,
            withCredentials: true, 
        }
    }
))

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

export const testSendEmails = (school, status, emails) => (fetch(`${process.env.REACT_APP_API_URL}/email/${school}/testSendEmails`, 
    {
        headers: { 
            'Content-Type': 'application/json', 
            credentials: 'include',
            Authorization: `${localStorage.jwtToken}`,
            withCredentials: true, 
        },
        method: "POST",
        body: JSON.stringify({requestType: status, emails: emails})
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
 * Downloads survey responses for a single school. Doesn't return anything, invokes the download
 * 
 * @param {String} school - the school to download responses for
 */
export const downloadSchoolResponse = async (school) => {
    // Uses anonymous function to invoke the function without needing parameters
    downloadJSON(() => (getSurveyResponses(school)))
}

/**
 * Handles getting all survey responses for all schools
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
 * Handles setting the sender email for a school
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
 * Handles getting all generalized survey links for all schools. Will generate them if they don't already exist
 * 
 */
export const getGeneralSurveyLinks = () => (
    fetch(`${process.env.REACT_APP_API_URL}/survey/makeGeneralizedLinks`, 
        {
            headers: { 
                'Content-Type': 'application/json', 
                credentials: 'include',
                Authorization: `${localStorage.jwtToken}`,
                withCredentials: true, 
            },
            method: "POST"
        })
)

/**
 * Handles unsubscribing a user
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

/**
 * Handles setting the sender email for a school
 * 
 * @param {string} school – user school 
 */
export const changeCloseDate = (data, school) => (
    fetch(`${process.env.REACT_APP_API_URL}/survey/closeDate/${school}`, 
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

// Helper middleware that checks if status is ok or not
export const checkStatus = (res) => {
    if (res.status >= 200 && res.status < 300) {
        return res
    } else {
        let err = new Error(res.statusText)
        err.response = res
        throw err
    }
}

export const getCloseDate = (school) => {
    return fetch(`${process.env.REACT_APP_API_URL}/survey/closeDate/${school}`, 
        {
            headers: { 
                'Content-Type': 'application/json', 
                credentials: 'include',
                withCredentials: true, 
            },
        })
}