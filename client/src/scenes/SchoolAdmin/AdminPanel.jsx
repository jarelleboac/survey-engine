import { Table } from '../../components/Table'
import {CSVUpload} from '../../components/CSVUpload'
import React from 'react'
export const SchoolAdminPanel = () => {
    return(
        <>
            <CSVUpload/>
            <Table />
        </>)
}