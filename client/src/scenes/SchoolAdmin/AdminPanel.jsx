import { SummaryTable } from '../../components/Table'
import React, { useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { CSVUpload, TestEmailUpload } from '../../components/CSVUpload'
import { getCounts, sendEmails, testSendEmails, triggerToast, getGeneralCounts, changeCloseDate, checkStatus } from '../../utils'
import { setCountsAction } from  '../../actions/email'
import { setGeneralCountsAction } from '../../actions/generalStatus'
import { Button, Flex, Heading, Divider } from 'theme-ui'
import {submissionStatus, defaultCloseDate} from '../../../../common/schema'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


export const SchoolAdminPanel = () => {
    const dispatch = useDispatch();
    const [freshData, setFreshData] = useState(false)
    // This can be populated with the current close date in the initial data store pull
    const [closeDate, setCloseDate] = useState(new Date()); 
    const session = useSelector(state => state.session)


    const sendEmailsFetch = (type, testEmails = false, emails = []) => {
        if (testEmails) {
            testSendEmails(session.school, type, emails)
                .then(res => {
                    if (!res.ok) throw Error(res.statusText)
                    else return res.json()
                }).then(res => {
                    triggerToast(res.message)
                }).catch(err => {
                    triggerToast(err)
                    console.error(err)
                })
        } else {
            sendEmails(session.school, type)
                .then(res => {
                    if (!res.ok) throw Error(res.statusText)
                    else return res.json()
                }).then(res => {
                    triggerToast(res.message)
                }).catch(err => {
                    triggerToast(err)
                    console.error(err)
                })
        }
    }

    // Fetch counts on first load and populate the store
    useEffect(() => {
        Promise.all([getCounts(session.school), getGeneralCounts(session.school)])
            .then(async res => {
                if (!res[0].ok) throw Error(res[0].statusText)
                else {
                    // TODO-Cleanup: is there a way to do this w/o awaiting?
                    const email = await res[0].json()
                    const general = await res[1].json()
                    return [email, general]
                }
            })
            .then(([emailCount, genCount]) => {
                // TODO-Cleanup: should this be one action?
                dispatch(setCountsAction(emailCount))
                dispatch(setGeneralCountsAction(genCount))
                setFreshData(true)
            })
            .catch(error => {
                console.error(error)
            });
    }, [freshData, dispatch, session.school])

    return(
        <div className="admin-container">
            <SummaryTable />
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
            
            <Heading mt='20px'>Set Survey Close Date</Heading>
            {`The survey is currently set to close this year on ${new Date(defaultCloseDate).toLocaleString()}.`}
            <div styles={{display: 'block'}}>
                <DatePicker
                    selected={closeDate}
                    onChange={date => setCloseDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                />
            </div>
            <Button mt='15px' mr='20px' onClick={() => {
                changeCloseDate({ closeDate: closeDate }, session.school)
                    .then(checkStatus)
                    .then(res => res.json())
                    .then(data => {
                        triggerToast(`Set close date successfully to ${new Date(data.closeDate).toLocaleString()}`)

                    })
                    .catch(err => console.error(err))
            }}>Set Close Date</Button>
            <Divider />
            <TestEmailUpload sendEmailsFetch={sendEmailsFetch} />
            <Divider />
        </div>)
}