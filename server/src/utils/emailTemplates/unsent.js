import escape from 'escape-html';

// Note that this sends for a single user at a time; not in batch emails
export default (user, surveyUrl, senderEmail) => ({
    Destination: {
        ToAddresses: [user.email], // Email address/addresses that you want to send your email
    },
    Message: {
        Body: {
            Html: {
                // HTML Format of the email
                Charset: 'UTF-8',
                Data: `<!doctype html>Hello!<br><br>
				
				We're reaching out to give you your unique survey link for The Percentage Project.<br><br>

				Head on over to the survey at your unique url: ${escape(surveyUrl)}<br><br>
				
				Best,<br>
				The Percentage Project Team
				</html>
				`,
            },
            Text: {
                Charset: 'UTF-8',
                Data: `Hello!
				
				We're reaching out to give you your unique survey link for The Percentage Project.

				Head on over to the survey at your unique url: ${escape(surveyUrl)}
				
				Best,
				The Percentage Project Team
				`,
            },
        },
        Subject: {
            Charset: 'UTF-8',
            Data: 'Survey from The Percentage Project',
        },
    },
    Source: `The Percentage Project <${senderEmail}>`,
    ReplyToAddresses: [
        `The Percentage Project <${senderEmail}>`,
    ],
});
