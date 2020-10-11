import { Table } from '../../components/Table'
import { CreateUser } from '../../components/CreateUser'
import React from 'react'
import {getMasterSurveyResponses, downloadJSON} from '../../utils'
import {Heading, Divider, Button} from 'theme-ui'

export const PercentAdminPanel = () => {

    // Downloads survey responses for a single school
    const downloadSurveyResponses = async () => {
        downloadJSON(getMasterSurveyResponses)
    }

    return (
        <div className="admin-container">
            <Table />
            <CreateUser />
            <Divider />
            <Heading mt='20px'>Download Responses</Heading>
            <Button mt='15px' mr='20px' onClick={() => {
                downloadSurveyResponses()
            }}>Download Responses (.json)</Button>
        </div>
    )
}