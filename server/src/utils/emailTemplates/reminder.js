import escape from 'escape-html';
import {
    formatSchool, makeEmailTableRows, websiteUrl, staticImageUrl, joinText,
} from '.';

/* eslint no-tabs: ["error", { allowIndentationTabs: true }] */

// Note that this sends for a single user at a time; not in batch emails
export default (user, surveyUrl, school, senderEmail, unsubscribeUrl) => {
    /**
     * Pretty ugly for now, but can potentially allow for better extension in the future so there aren't other files such as brownReminder.js
     */

    const title = 'Reminder for the Percentage Project Survey';

    const greeting = 'Hi there,';

    const bodyPart1 = 'Just a quick reminder to fill out your survey! This will allow us to understand the current state of students from all backgrounds and follow metrics from year to year.';

    const bodyPart2 = 'Hearing about your unique experience is very important to us, and we\'d appreciate your time in filling out this 5-minute survey.';

    const bodyPart3 = 'Hearing about your unique experience is very important to us, and we\'d appreciate your time in filling out this 5-minute survey.';

    const bodyPart4 = `Head on over to the survey at your unique url: ${escape(surveyUrl)}`;

    const signOff1 = 'Best,';

    const signOff2 = 'The Percentage Project Team';

    const optOutText = `If you'd like to opt out, please unsubscribe here: ${escape(unsubscribeUrl)}`;

    const tableBody = makeEmailTableRows(greeting, bodyPart1, bodyPart2, bodyPart3, bodyPart4, signOff1, signOff2, optOutText);

    const allText = joinText(greeting, bodyPart1, bodyPart2, bodyPart3, signOff1, signOff2, optOutText);

    return ({
        Destination: {
            ToAddresses: [user.email], // Email address/addresses that you want to send your email
        },
        Message: {
            Body: {
                Html: {
                // HTML Format of the email
                    Charset: 'UTF-8',
                    Data: `
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><br><br>
  <head>
    <title> ${title} </title>
    <!--[if !mso]>
<!-- -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--
	<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
      #outlook a {
        padding: 0;
      }

      .ReadMsgBody {
        width: 100%;
      }

      .ExternalClass {
        width: 100%;
      }

      .ExternalClass * {
        line-height: 100%;
      }

      body {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      table,
      td {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }

      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }

      p {
        display: block;
        margin: 13px 0;
      }
    </style>
    <!--[if !mso]>
			<!-->
    <style type="text/css">
      @media only screen and (max-width:480px) {
        @-ms-viewport {
          width: 320px;
        }

        @viewport {
          width: 320px;
        }
      }
    </style>
    <!--
			<![endif]-->
    <!--[if mso]>
			<xml>
				<o:OfficeDocumentSettings>
					<o:AllowPNG/>
					<o:PixelsPerInch>96</o:PixelsPerInch>
				</o:OfficeDocumentSettings>
			</xml>
			<![endif]-->
    <!--[if lte mso 11]>
			<style type="text/css">
									.outlook-group-fix { width:100% !important; }
								</style>
			<![endif]-->
    <style type="text/css">
      @media only screen and (min-width:480px) {
        .mj-column-per-100 {
          width: 100% !important;
          max-width: 100%;
        }
      }
    </style>
    <style type="text/css">
      @media only screen and (max-width:480px) {
        table.full-width-mobile {
          width: 100% !important;
        }

        td.full-width-mobile {
          width: auto !important;
        }
      }
    </style>
  </head>
  <body style="background-color:#E7E7E7;">
    <div style="background-color:#E7E7E7;">
      <!--[if mso | IE]>
				<table
								 align="center" border="0" cellpadding="0" cellspacing="0" class="hide_on_mobile-outlook" style="width:600px;" width="600"
							>
					<tr>
						<td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
							<![endif]-->
      <div class="hide_on_mobile" style="Margin:0px auto;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                <!--[if mso | IE]>
												<table role="presentation" border="0" cellpadding="0" cellspacing="0">
													<tr></tr>
												</table>
												<![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--[if mso | IE]>
						</td>
					</tr>
				</table>
				<table
								 align="center" border="0" cellpadding="0" cellspacing="0" class="body-section-outlook" style="width:600px;" width="600"
							>
					<tr>
						<td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
							<![endif]-->
      <div class="body-section" style="-webkit-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); -moz-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); background: #ffffff; background-color: #ffffff; Margin: 0px auto; border-radius: 8px; max-width: 600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-radius:8px;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                <!--[if mso | IE]>
												<table role="presentation" border="0" cellpadding="0" cellspacing="0">
													<tr>
														<td
												 class="" width="600px"
											>
															<table
								 align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
							>
																<tr>
																	<td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
																		<![endif]-->
                <div style="background:#ffffff;background-color:#ffffff;Margin:0px auto;max-width:600px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                    <tbody>
                      <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;padding-left:40px;padding-right:40px;text-align:center;vertical-align:top;">
                          <!--[if mso | IE]>
																							<table role="presentation" border="0" cellpadding="0" cellspacing="0">
																								<tr>
																									<td
											 class="" style="vertical-align:top;width:520px;"
										>
																										<![endif]-->
                          <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                              <tr>
                                <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                    <tbody>
                                      <tr>
                                        <td style="width:520px;">
                                          <center>
                                            <a href="${escape(websiteUrl)}" target="_blank">
                                              <img alt="" height="auto" src="${escape(staticImageUrl)}" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:30%;" width="520">
                                            </a>
                                          </center>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </div>
                          <!--[if mso | IE]>
																										</td>
																									</tr>
																								</table>
																								<![endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
														<tr>
															<td
												 class="" width="600px"
											>
																<table
								 align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
							>
																	<tr>
																		<td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
																			<![endif]-->
                <div style="background:#ffffff;background-color:#ffffff;Margin:0px auto;border-radius:8px;max-width:600px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-radius:8px;">
                    <tbody>
                      <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;padding-left:15px;padding-right:15px;text-align:center;vertical-align:top;">
                          <!--[if mso | IE]>
																								<table role="presentation" border="0" cellpadding="0" cellspacing="0">
																									<tr>
																										<td
											 class="" style="vertical-align:top;width:570px;"
										>
																											<![endif]-->
                          <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                              ${tableBody}
                            </table>
                          </div>
                          <!--[if mso | IE]>
																										</td>
																									</tr>
																								</table>
																								<![endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
													<![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--[if mso | IE]>
							</td>
						</tr>
					</table>
					<![endif]-->
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td>
              <!--[if mso | IE]>
									<table
								 align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
							>
										<tr>
											<td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
												<![endif]-->
              <div style="Margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                        <!--[if mso | IE]>
																	<table role="presentation" border="0" cellpadding="0" cellspacing="0">
																		<tr>
																			<td
												 class="" width="600px"
											>
																				<table
								 align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
							>
																					<tr>
																						<td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
																							<![endif]-->
                        <div style="Margin:0px auto;max-width:600px;">
                          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                            <tbody>
                              <tr>
                                <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                  <!--[if mso | IE]>
																												<table role="presentation" border="0" cellpadding="0" cellspacing="0">
																													<tr>
																														<td
											 class="" style="vertical-align:top;width:600px;"
										>
																															<![endif]-->
                                  <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                      <tbody>
                                        <tr>
                                          <td style="vertical-align:top;padding:0;">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                                              <tr>
                                                <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
                                                  <!--[if mso | IE]>
																																							<table
								 align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
							>
																																								<tr>
																																									<td>
																																										<![endif]-->
                                                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                                </td>
                                                <td>
                                                  <![endif]-->
																																											<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;"></table>
																																											<!--[if mso | IE]>
                                                </td>
                                              </tr>
                                            </table>
                                            <![endif]-->
																																							</td>
																																						</tr>
																																						<tr>
																																							<td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
																																								<div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:11px;font-weight:400;line-height:16px;text-align:center;color:#445566;"> &copy; 2021 Percentage Project, All Rights Reserved. </div>
																																							</td>
																																						</tr>
																																					</table>
																																				</td>
																																			</tr>
																																		</tbody>
																																	</table>
																																</div>
																																<!--[if mso | IE]>
                                          </td>
                                        </tr>
                                    </table>
                                    <![endif]-->
																												</td>
																											</tr>
																										</tbody>
																									</table>
																								</div>
																								<!--[if mso | IE]>
                                </td>
                              </tr>
                          </table>
                      </td>
                    </tr>
                    <tr>
                      <td class="" width="600px">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600">
                          <tr>
                            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                              <![endif]-->
																								<div style="Margin:0px auto;max-width:600px;">
																									<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
																										<tbody>
																											<tr>
																												<td style="direction:ltr;font-size:0px;padding:20px 0;padding-top:0;text-align:center;vertical-align:top;">
																													<!--[if mso | IE]>
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td class="" style="width:600px;">
                                    <![endif]-->
																																<div class="mj-column-per-100 outlook-group-fix" style="font-size:0;line-height:0;text-align:left;display:inline-block;width:100%;direction:ltr;">
																																	<!--[if mso | IE]>
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                      <tr>
                                        <td style="vertical-align:top;width:600px;">
                                          <![endif]-->
																																				<div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
																																					<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
																																						<tbody>
																																							<tr>
																																								<td style="vertical-align:top;padding-right:0;"></td>
																																							</tr>
																																						</tbody>
																																					</table>
																																				</div>
																																				<!--[if mso | IE]>
                                        </td>
                                      </tr>
                                    </table>
                                    <![endif]-->
																																</div>
																																<!--[if mso | IE]>
                                  </td>
                                </tr>
                              </table>
                              <![endif]-->
																												</td>
																											</tr>
																										</tbody>
																									</table>
																								</div>
																								<!--[if mso | IE]>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                </table>
                <![endif]-->
																	</td>
																</tr>
															</tbody>
														</table>
													</div>
													<!--[if mso | IE]>
            </td>
          </tr>
      </table>
      <![endif]-->
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</body>
			</html>`,
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: `${allText}`,
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
        ReturnPath: 'program@percentageproject.com',
    });
};
