import escape from 'escape-html';

// Note that this sends for a single user at a time; not in batch emails
export default (user, surveyUrl, senderEmail, unsubscribeUrl) => ({
    Destination: {
        ToAddresses: [user.email], // Email address/addresses that you want to send your email
    },
    Message: {
        Body: {
            Html: {
                // HTML Format of the email
                Charset: 'UTF-8',
                Data: `<!doctype html>
                Hello!<br><br>
				
				Just a quick reminder to fill out your survey! We're reaching out to give you your unique survey link for The Percentage Project.<br><br>

				Head on over to the survey at your unique url: ${escape(surveyUrl)}<br><br>
				
				Best,<br>
                The Percentage Project Team
                <br><br>
                If you'd like to unsubscribe, please visit here: ${escape(unsubscribeUrl)}
				</html>
				`,
            },
            Text: {
                Charset: 'UTF-8',
                Data: `Hello!
				
				Just a quick reminder to fill out your survey! We're reaching out to give you your unique survey link for The Percentage Project.

				Head on over to the survey at your unique url: ${escape(surveyUrl)}
				
				Best,
                The Percentage Project Team
                
                If you'd like to unsubscribe, please visit here: ${escape(unsubscribeUrl)}
				`,
            },
        },
        Subject: {
            Charset: 'UTF-8',
            Data: 'Survey from the Percentage Project',
        },
    },
    Source: `The Percentage Project <${senderEmail}>`,
    ReplyToAddresses: [
        `The Percentage Project <${senderEmail}>`,
    ],
});
