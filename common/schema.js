/**
 * Exports shared schemas between client and server. Holds information specific to certain
 * universities.
 */
const schools = {
  unset: 'UNSET',
  brown: 'BROWN',
  penn: 'PENN',
  harvard: 'HARVARD',
  drexel: 'DREXEL',
  duke: 'DUKE',
  rutgers: 'RUTGERS',
  cmu: 'CMU',
  columbia: 'COLUMBIA',
  nyu: 'NYU',
  uiuc: 'UIUC',
  vanderbilt: 'VANDERBILT',
  percentProj: 'PERCENTAGE_PROJECT',
};
const schoolsArray = Object.values(schools);

// Defines roles that are particular to admins. Vanilla users have no roles.
const roles = { unset: 'UNSET', schoolAdmin: 'SCHOOL_ADMIN', percentAdmin: 'PERCENTAGE_PROJECT_ADMIN' };
const rolesArray = Object.values(roles);

const submissionStatus = {
  unsent: 'UNSENT', sent: 'SENT', inProgress: 'IN-PROGRESS', completed: 'COMPLETED',
};
const submissionStatusArray = Object.values(submissionStatus);

/**
 * Schema for questions. Note that the "type" field should be for Mongoose
 */
const demographicQuestions = [
  {
    id: 'grade',
    question: 'What is your grade?',
    component: 'Radio',
    options: ['Freshman',
      'Sophomore',
      'Junior',
      'Senior',
      'Super Senior',
      'Graduate'],
    required: true,
    type: String,
  },
  {
    id: 'major',
    question: 'Please select which fits you the best. If you are in a dual degree program, please select based on your affiliation with SEAS or CIS in the College.',
    component: 'MultiCheckbox',
    options: [
      'CIS Major in SEAS (including NETS, DMD)',
      'CIS Major in College',
      'ESE Major in SEAS (including EE, CMPE, SE)',
      'CIS Minor in SEAS (including NETS, DMD)',
      'CIS Minor in College',
      'ESE Minor in SEAS (including EE, CMPE, SE)',
      'Other (please specify)',
    ],
    required: true,
    type: [String],
  },
  {
    id: 'studyingFeeling',
    question: 'Check all of the following that apply to you:',
    component: 'MultiCheckbox',
    options: [
      'I feel intimidated studying Computer Science and related fields.',
      'I feel pressure at Penn to find internships, job opportunities, extracurricular activities', 'I have been/felt judged or micro-aggressed by someone.',
    ],
    required: true,
    type: [String],
  },
  {
    id: 'ethnicity',
    question: 'What is your ethnicity?',
    component: 'MultiCheckbox',
    options: ['American Indian or Alaskan Native',
      'Asian',
      'Black or African American',
      'Native Hawaiian or other Pacific Islander',
      'White',
      'Other',
      'Prefer not to say',
    ],
    required: true,
    type: [String],
  },
];

// TODO: make this a function that can take custom params
const commonQuestions = [
  ...demographicQuestions,
  // {
  //   id: 'food',
  //   question: 'What is your favorite food?',
  //   component: '',
  //   required: true,
  //   type: String,
  // },
];

/**
 * QUESTIONS SPECIFIC TO SCHOOLS
 *
 * The easiest overload is to instead modify the fields after nanoing on it, and then
 *
 * Note: please make the ID field different from any other questions
 */
const brownQuestions = [
];

const pennQuestions = [

];

const drexelQuestions = [

];

const dukeQuestions = [

];

const rutgersQuestions = [

];

const columbiaQuestions = [

];

const cmuQuestions = [

];

const uiucQuestions = [

];

const nyuQuestions = [

];

const harvardQuestions = [

];

const vanderbiltQuestions = [

];

const schoolToQuestion = {};
schoolToQuestion[schools.brown] = brownQuestions;
schoolToQuestion[schools.penn] = pennQuestions;
schoolToQuestion[schools.harvard] = harvardQuestions;
schoolToQuestion[schools.vanderbilt] = vanderbiltQuestions;

export {
  schools, schoolsArray, roles, rolesArray, submissionStatus, submissionStatusArray,
  demographicQuestions, commonQuestions,
  brownQuestions, pennQuestions, harvardQuestions, vanderbiltQuestions,
  drexelQuestions, dukeQuestions, rutgersQuestions,
  columbiaQuestions, cmuQuestions, uiucQuestions, nyuQuestions,
};

// /**
//  * Builds an object mapping the school dict to the different questions. Actually probably don't need to use this yet
//  */
// const mapSchoolsToQuestions = () => {
//   const schoolsToQuestions = {};
//   // Specify the string here since you can't directly specify keys as values from another object :(
//   schoolsToQuestions[schools.brown] = brownQuestions;
//   schoolsToQuestions[schools.uPenn] = uPennQuestions;
//   schoolsToQuestions[schools.harvard] = harvardQuestions;

//   return schoolsToQuestions;
// };
// export const schoolsToQuestions = mapSchoolsToQuestions();
