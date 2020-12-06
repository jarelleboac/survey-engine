import { Table } from '../../components/Table'
import { CreateUser } from '../../components/CreateUser'
import React, { useState } from 'react'
import { getMasterSurveyResponses, downloadJSON, getGeneralSurveyLinks, downloadSchoolResponse } from '../../utils'
import { Heading, Divider, Button, Select } from 'theme-ui'
import { schoolsArray } from '../../../../common/schema'

const SchoolSelector = ({setSelectedSchool}) => {
    return (
        <Select onChange={(e => { 
            setSelectedSchool(e.target.value) })}>
            {schoolsArray.map(school => (<option key={`${school}-option`}>{school}</option>))}
        </Select>)
}

export const PercentAdminPanel = () => {

    // Downloads survey responses for all school
    const downloadSurveyResponses = async () => {
        downloadJSON(getMasterSurveyResponses)
    }

    const [selectedSchool, setSelectedSchool] = useState('UNSET')

    return (
        <div className="admin-container">
            <Table />
            <CreateUser />
            <Divider />
            <Heading mt='20px'>Download All Responses [.json]</Heading>
            <Button mt='15px' mr='20px' onClick={() => {
                downloadSurveyResponses()
            }}>Download Responses (.json)</Button>
            <Heading mt='20px'>Download School Specific Responses [.json]</Heading>
            <SchoolSelector setSelectedSchool={setSelectedSchool} />
            <Button mt='15px' mr='20px' onClick={() => {
                downloadSchoolResponse(selectedSchool)
            }}>Download Individual School Response</Button>
            <Divider />

            <Heading mt='20px'>Get Generalized Links</Heading>
            <Button mt='15px' mr='20px' onClick={() => {
                getGeneralSurveyLinks()
                    .then(res => res.json())
                    .then(data => console.log(data))
                    .catch(err => console.error(err))
            }}>Log Generalized Links to Console</Button>
        </div>
    )
}