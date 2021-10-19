import {Text, Button, Heading} from 'theme-ui'
import React, {useRef, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { defaultCloseDate } from "../../../common/schema"


export const SummaryTable = () => {
    const date = defaultCloseDate;
    const emails = useSelector(state => state.emails)
    const genCount = useSelector(state => state.generalStatus)
    const total = emails.total + genCount.count
    return (
        <div>
            <Heading className="section-header">Summary</Heading>
            <div className="table">
                <Text>
                    The survey is currently set to close this year on {new Date(date).toLocaleString()}.
                </Text>
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
                    Completed via General: {genCount.count}
                </Text>
                <Text sx={{fontWeight: 'bold'}}>
                 Total: {total}
                </Text>
            </div>
        </div>
    )
}
