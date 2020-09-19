import { Table } from '../../components/Table'
import React, {useEffect} from 'react'
import {CSVUpload} from '../../components/CSVUpload'

export const fetchOptions = {
    headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
        withCredentials: true,
        Authorization: `${localStorage.jwtToken}`
    },
};

// ${process.env.REACT_APP_API_URL}/email/${state.session.school}
export const SchoolAdminPanel = () => {
    return(
        <div className="admin-container">
            <Table />
            <CSVUpload />
        </div>)
}