import { Text, Button } from 'theme-ui'
import React, {useRef, useEffect} from 'react'
import {useSelector} from 'react-redux'

export const Table = () => {
    const emails = useSelector(state => state.emails)
    console.log(emails)
    return (
        <div className="table">
            <Text>
                Unsent: {emails.unsent}
            </Text>
            <Text>
                Sent: {emails.sent}
            </Text>
            <Text>
                In-progress: {emails.inprogress}
            </Text>
            <Text>
             Completed: {emails.completed}
            </Text>
            <Text>
             Total: {emails.total}
            </Text>
        </div>
    )
}

// import { Grid } from "gridjs";
// import "gridjs/dist/theme/mermaid.css";
// export const Table = () => {
//     const wrapperRef = useRef(null);
//     const state = useSelector(state => state)

//     const grid = new Grid({
//         columns: ['Unsent', 'Sent', 'In-progress', 'Completed', 'Total'],
//         fixedHeader: true,
//         authWidth: false,
//         data: [
//             [0,0,0,0,0]
//             // [state.emails.unsent, state.emails.sent, state.emails.inprogress, state.emails.completed, state.emails.total]
//         ]
//     });
  
//     useEffect(() => {
//         grid.render(wrapperRef.current);
//     });
  
//     return (
//         <div className="table" ref={wrapperRef}/>
//     );
// }