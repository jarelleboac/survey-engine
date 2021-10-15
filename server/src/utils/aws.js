import AWS from 'aws-sdk';
import { submissionStatus } from '../schema';
// IMPORT TEMPLATES HERE
import unsent from './emailTemplates/unsent';
import reminder from './emailTemplates/reminder';
import brownReminder from './emailTemplates/brownReminder';
import harvardReminder from './emailTemplates/harvardReminder';
import { formatSchool } from './emailTemplates';

const { AWS_REGION } = process.env;

if (AWS_REGION == null) {
    throw new Error('AWS_REGION not set');
}

AWS.config.update({ region: AWS_REGION });

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

export function sendStatusEmail(
    user, status, surveyUrl, school, senderEmail, unsubscribeUrl, isTestEmail = false,
) {
    // if (user.emailUnsubscribed) {
    //     logger.info('Skipping email to unsubscribed user', user);
    // }

    let email;

    let overrideTitle = '';
    if (isTestEmail) {
        switch (status) {
        case submissionStatus.sent:
            overrideTitle = `[TESTER EMAIL] Reminder: ${formatSchool(school)} Computer Science Survey`;
            email = reminder(user, surveyUrl, school, senderEmail, unsubscribeUrl, overrideTitle);
            break;
        case submissionStatus.unsent:
            overrideTitle = `[TESTER EMAIL] Invitation to the ${formatSchool(school)} Percentage Project Survey`;
            email = unsent(user, surveyUrl, school, senderEmail, unsubscribeUrl, overrideTitle);
            break;
        default:
            throw new Error(`Unimplemented test email for status "${status}" to user "${user.email}`);
        }
    }

    // Handles sending types of emails for each
    switch (status) {
    // case submissionStatus.completed:
    //     email = submitted(user);
    //     break;
    // case submissionStatus.inProgress:
    //     email = accepted(user);
    //     break;
    case submissionStatus.sent:
        if (school === 'BROWN') {
            email = brownReminder(user, surveyUrl, school, senderEmail, unsubscribeUrl);
        } else if (school === 'HARVARD' || school === 'PERCENTAGE_PROJECT') {
            email = harvardReminder(user, surveyUrl, school, senderEmail, unsubscribeUrl);
        } else {
            email = reminder(user, surveyUrl, school, senderEmail, unsubscribeUrl);
        }
        break;
    case submissionStatus.unsent:
        email = unsent(user, surveyUrl, school, senderEmail, unsubscribeUrl, overrideTitle);
        break;
    default:
        throw new Error(`Unimplemented email for status "${status}" to user "${user.email}`);
    }

    return ses
        .sendEmail(email)
        .promise();
}

export default { sendStatusEmail };
