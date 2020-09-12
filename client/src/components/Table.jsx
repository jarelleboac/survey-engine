import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import React, {useRef, useState, useEffect} from 'react'
import {useSelector} from 'react-redux'


export const fetchOptions = {
    headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
        withCredentials: true,
        Authorization: `${localStorage.jwtToken}`
    },
};

export const Table = () => {
    const wrapperRef = useRef(null);
    const session = useSelector(state => state.session)

    const grid = new Grid({
        search: true,
        columns: ['Email', 'School', 'Status'],
        server: {
            url: `${process.env.REACT_APP_API_URL}/email/${session.school}`, ...fetchOptions,
            then: data => data.map(email => [email.email, email.school, email.status])
        },
    });
  
    useEffect(() => {
        grid.render(wrapperRef.current);
    });
  
    return <div className="table" ref={wrapperRef}/>;
}