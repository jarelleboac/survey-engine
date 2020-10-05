import { Table } from '../../components/Table'
import React, { useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { CSVUpload } from '../../components/CSVUpload'
import { getCounts, sendEmails} from '../../utils'
import {setCountsAction} from  '../../actions/email'
import { Button } from 'theme-ui'
import {submissionStatus} from '../../../../common/schema'


export const SchoolAdminPanel = () => {
    const dispatch = useDispatch();
    const [freshData, setFreshData] = useState(false)
    const session = useSelector(state => state.session)


    const sendEmailsFetch = (type) => {
        console.log(session.school)
        sendEmails(session.school, type)
            .then(res => {
                if (!res.ok) throw Error(res.statusText)
                else return res.json()
            }).then(res => {
                console.log(res)
            }).catch(err => {
                console.error(err)
            })
    }

    // Fetch counts on first load and populate the store
    useEffect(() => {
        getCounts(session.school)
            .then(res => {
                if (!res.ok) throw Error(res.statusText)
                else return res.json()
            })
            .then(res => {
                dispatch(setCountsAction(res))
                setFreshData(true)
            })
            .catch(error => {
                console.error(error)
            });
    }, [freshData])

    return(
        <div className="admin-container">
            <Table />
            <CSVUpload setFreshData={setFreshData} />
            <Button sx={{ marginRight: '20px'}} onClick={() => {
                sendEmailsFetch(submissionStatus.unsent)
            }}>Send unsent</Button>
        </div>)
}