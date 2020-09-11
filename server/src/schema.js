/**
 * Exports shared schemas between client and server. Holds information specific to certain
 * universities.
 */
export const schools = {
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
export const schoolsArray = Object.values(schools);

// Defines roles that are particular to admins. Vanilla users have no roles.
export const roles = { unset: 'UNSET', schoolAdmin: 'SCHOOL_ADMIN', percentAdmin: 'PERCENTAGE_PROJECT_ADMIN' };
export const rolesArray = Object.values(roles);

export const submissionStatus = {
  unsent: 'UNSENT', sent: 'SENT', inProgress: 'IN-PROGRESS', completed: 'COMPLETED',
};
export const submissionStatusArray = Object.values(submissionStatus);

/**
 * Schema for questions. Note that the "type" field should be for Mongoose
 */
export const demographicQuestions = [
  {
    id: 'grade',
    question: 'What is your grade?',
    component: 'Checkbox',
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
    id: 'firstName',
    question: 'First name',
    component: '',
    required: true,
    type: String,
  },
  {
    id: 'lastName',
    question: 'Last name',
    component: '',
    required: true,
    type: String,
  },
  {
    id: 'ethnicity',
    question: 'What is your ethnicity?',
    component: 'Radio',
    options: ['American Indian or Alaskan Native',
      'Asian',
      'Black or African American',
      'Native Hawaiian or other Pacific Islander',
      'White',
      'Other',
      'Prefer not to say',
    ],
    required: true,
    type: String,
  },
];

// TODO: make this a function that can take custom params
export const commonQuestions = [
  ...demographicQuestions,
  {
    id: 'food',
    question: 'What is your favorite food?',
    component: '',
    required: true,
    type: String,
  },
];

/**
 * QUESTIONS SPECIFIC TO SCHOOLS
 *
 * Note: please make the ID field different from any other questions
 */
export const brownQuestions = [

];

export const uPennQuestions = [

];

export const harvardQuestions = [

];

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
