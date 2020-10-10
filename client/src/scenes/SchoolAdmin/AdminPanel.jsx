import { Table } from '../../components/Table'
import React, { useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { CSVUpload } from '../../components/CSVUpload'
import { getCounts, sendEmails, getSurveyResponses } from '../../utils'
import {setCountsAction} from  '../../actions/email'
import { Button, Flex, Heading, Divider } from 'theme-ui'
import {submissionStatus} from '../../../../common/schema'


export const SchoolAdminPanel = () => {
    const dispatch = useDispatch();
    const [freshData, setFreshData] = useState(false)
    const session = useSelector(state => state.session)


    const sendEmailsFetch = (type) => {
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

    // Downloads survey responses for a single school
    const downloadSurveyResponses = async () => {

        getSurveyResponses(session.school)
            .then(res => {
                if (!res.ok) throw Error(res.statusText)
                else return res.json()
            }).then(res => {
                // Create a temp link for downloading
                const downloadLink = document.createElement("a");
                const jsonString = JSON.stringify(res)
                const file = new Blob([jsonString], { type: "application/json" });
                downloadLink.href = URL.createObjectURL(file);
                downloadLink.download = "responses.json";
                document.body.appendChild(downloadLink)
                downloadLink.click();
                document.body.removeChild(downloadLink)
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
            <Divider />
            <CSVUpload setFreshData={setFreshData} />
            <Divider />
            <Heading mt='20px'>Send Surveys</Heading>
            <Flex>
                <Button mt='15px' mr='20px' onClick={() => {
                    sendEmailsFetch(submissionStatus.unsent)
                }}>Send to Unsent</Button>
                <Button mt='15px' mr='20px' onClick={() => {
                    sendEmailsFetch(submissionStatus.sent)
                }}>Send Reminders</Button>
            </Flex>
            <Divider />
            <Heading mt='20px'>Download Responses</Heading>
            <Button mt='15px' mr='20px' onClick={() => {
                downloadSurveyResponses()
            }}>Download Responses (.json)</Button>
        </div>)
}