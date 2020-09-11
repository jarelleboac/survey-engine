import {toast} from 'react-toastify'

// Triggers a toast error with the given message
export const triggerToast = (err) => toast(err);

// Checks to see if a single email is valid 
export const validEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Checks to see if the entire list of values 
export const validEmails = (emails) => emails.every((email) => validEmail(email))