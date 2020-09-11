import { Table } from '../../components/Table'
import {CSVUpload} from '../../components/CSVUpload'
import React from 'react'
export const SchoolAdminPanel = () => {
    return(
        <div className="container">
            <div id="logo-container">
                <img src="logo.png" id="logo" alt="% project logo"/>
            </div>
            <CSVUpload/>
            <Table />
        </div>)
}