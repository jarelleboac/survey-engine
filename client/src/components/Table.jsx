import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import React, {useRef, useEffect} from 'react'
import {useSelector} from 'react-redux'

export const Table = () => {
    const wrapperRef = useRef(null);
    const state = useSelector(state => state)

    const grid = new Grid({
        columns: ['Unsent', 'Sent', 'In-progress', 'Completed', 'Total'],
        fixedHeader: true,
        authWidth: false,
        data: [
            [state.emails.unsent, state.emails.sent, state.emails.inprogress, state.emails.completed, state.emails.total, ]
        ]
    });
  
    useEffect(() => {
        grid.render(wrapperRef.current);
    });
  
    return (
        <div className="table" style={{ height: '100%', position: 'relative' }} ref={wrapperRef}/>
    );
}