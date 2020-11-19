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
                Oops! <br><br>
				
				Sorry about that! We sent you the wrong link in our previous email.<br><br>
                
                Here is the actual link to your survey: ${escape(surveyUrl)}<br><br>
				
				Best,<br>
                The Percentage Project Team
                <br><br>
                If you'd like to opt out, please unsubscribe here: ${escape(unsubscribeUrl)}
				</html>
				`,
            },
            Text: {
                Charset: 'UTF-8',
                Data: `Oops!
				
				Sorry about that! We sent you the wrong link in our previous email.
                
                Here is the actual link to your survey: ${escape(surveyUrl)}
				
				Best,
                The Percentage Project Team
                
                If you'd like to opt out, please unsubscribe here: ${escape(unsubscribeUrl)}
				`,
            },
        },
        Subject: {
            Charset: 'UTF-8',
            Data: `Reminder: ${formatSchool(school)} Computer Science Survey`,
        },
    },
    Source: `The Percentage Project <${senderEmail}>`,
    ReplyToAddresses: [
        `The Percentage Project <${senderEmail}>`,
    ],
});
