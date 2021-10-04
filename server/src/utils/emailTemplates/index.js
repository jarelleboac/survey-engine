import escape from 'escape-html';

export const makeEmailRow = (text) => (`<tr>
        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
            <div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:24px;text-align:left;color:#637381;"> ${escape(text)}</div>
        </td>
    </tr>`);

export const formatSchool = (school) => {
    if (!['CMU', 'NYU', 'UMD', 'UIUC'].includes(school)) {
        return school.charAt(0).toUpperCase() + school.slice(1).toLowerCase();
    }
    return school;
};

export const websiteUrl = 'https://percentageproject.com/';

export const staticImageUrl = 'https://percentage-project-static.s3.us-east-2.amazonaws.com/logo.png';

export const makeEmailTableRows = (...vals) => {
    let output = '';
    for (let i = 0; i < vals.length; i += 1) {
        output += makeEmailRow(vals[i]);
    }
    return (output);
};

export const joinText = (...vals) => (vals.join(' '));
