import {Text, Button, Heading} from 'theme-ui'
import React, {useRef, useEffect} from 'react'
import {useSelector} from 'react-redux'

export const Table = () => {
    const emails = useSelector(state => state.emails)
    return (
        <div>
            <Heading className="section-header">Summary</Heading>
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
        </div>
    )
}
