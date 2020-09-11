import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import React, {useRef, useState, useEffect} from 'react'


export const fetchOptions = {
    headers: {
        'Content-Type': 'application/json',
    },
};

export const Table =  () => {
    const [emails, setEmails] = useState(['Loading...', 'Loading...', 'Loading...'] )

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/emails/BROWN`, {...fetchOptions, method: 'GET'})
            .then(res => res.json())
            .then(res => res.map(email => [email.email, email.school, email.status]))
            .then(mappedEmails => setEmails(mappedEmails))
    }, [])
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
    }, [emails]);
  
    return <><div style={{width:'80%'}}><div ref={wrapperRef} /></div></>;
}