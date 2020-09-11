import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import React, {useRef, useState, useEffect} from 'react'


export const fetchOptions = {
    headers: {
        'Content-Type': 'application/json',
    },
};

export const Table =  () => {
    const wrapperRef = useRef(null);

    const grid = new Grid({
        search: true,
        columns: ['Email', 'School', 'Status'],
        server: {
            url: `${process.env.REACT_APP_API_URL}/emails/BROWN`,
            then: data => data.map(email => [email.email, email.school, email.status])
        }
    });
  
    useEffect(() => {
        grid.render(wrapperRef.current);
    });
  
    return <><div ref={wrapperRef} style={{width:'80%'}}/></>;
}