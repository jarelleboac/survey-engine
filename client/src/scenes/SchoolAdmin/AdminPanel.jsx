import { Table } from '../../components/Table'
import React, { useLayoutEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { CSVUpload } from '../../components/CSVUpload'
import { getCounts } from '../../utils'
import {setCountsAction} from  '../../actions/email'

export const SchoolAdminPanel = () => {
    const dispatch = useDispatch();
    const session = useSelector(state => state.session)

    // Fetch counts on first load and populate the store
    useLayoutEffect(() => {
        getCounts(session.school)
            .then(res => {
                if (!res.ok) throw Error(res.statusText)
                else return res.json()
            })
            .then(res => {
                dispatch(setCountsAction(res))
            })
            .catch(error => {
                console.error(error)
            });
    }, [])

    return(
        <div className="admin-container">
            <Table />
            <CSVUpload />
        </div>)
}