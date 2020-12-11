import escape from 'escape-html';

const formatSchool = (school) => {
    if (!['CMU', 'NYU', 'UMD', 'UIUC'].includes(school)) {
        return school.charAt(0).toUpperCase() + school.slice(1).toLowerCase();
    }
    return school;
};

// Note that this sends for a single user at a time; not in batch emails
export default (user, surveyUrl, school, senderEmail, unsubscribeUrl) => ({
    Destination: {
        ToAddresses: [user.email], // Email address/addresses that you want to send your email
    },
    Message: {
        Body: {
            Html: {
                // HTML Format of the email
                Charset: 'UTF-8',
                Data: `<!doctype html>
                Hi there, <br><br>
        
                Last chance to fill out the ${formatSchool(school)} computer science survey! The survey will be closing tomorrow, so be sure to fill it out today.

                Hearing about your unique experience is very important to us, and we'd appreciate your time in filling out this 5-minute survey.<br><br>

                Head on over to the survey at your unique url: ${escape(surveyUrl)}<br><br>
                
                Best,<br>
                The Percentage Project Team
                <br><br>
                If you'd like to opt out, please unsubscribe here: ${escape(unsubscribeUrl)}
                </html>
                `,
            },
            Text: {
                Charset: 'UTF-8',
                Data: `Hi there,

                Last chance to fill out the Brown computer science survey! The survey will be closing tomorrow, so be sure to fill it out today.

                Hearing about your unique experience is very important to us, and we'd appreciate your time in filling out this 5-minute survey.

                Head on over to the survey at your unique url: ${escape(surveyUrl)}
                
                Best,
                The Percentage Project Team
                
                If you'd like to opt out, please unsubscribe here: ${escape(unsubscribeUrl)}
                `,
            },
        },
        Subject: {
            Charset: 'UTF-8',
            Data: `Final Reminder: ${formatSchool(school)} Computer Science Survey`,
        },
    },
    Source: `The Percentage Project <${senderEmail}>`,
    ReplyToAddresses: [
        `The Percentage Project <${senderEmail}>`,
    ],
    ReturnPath: 'program@percentageproject.com',
});
