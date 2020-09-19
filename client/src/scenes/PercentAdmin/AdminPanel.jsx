import { Table } from '../../components/Table'
import { CreateUser } from '../../components/CreateUser'
import React from 'react'
export const PercentAdminPanel = () => {
    return (
        <div className="admin-container">
            <Table />
            <CreateUser />
        </div>
    )
}