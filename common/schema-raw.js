/**
 * Exports shared schemas between client and server. Holds information specific to certain
 * universities.
 */
export const schools = {
  brown: 'BROWN', uPenn: 'UPENN', harvard: 'HARVARD', percentProj: 'PERCENTAGE_PROJECT',
};
export const schoolsArray = Object.values(schools);

export const roles = { schoolAdmin: 'SCHOOL_ADMIN', percentAdmin: 'PERCENTAGE_PROJECT_ADMIN' };
export const rolesArray = Object.values(roles);

export const submissionStatus = {
  unsent: 'UNSENT', sent: 'SENT', inProgress: 'IN-PROGRESS', completed: 'COMPLETED',
};
export const submissionStatusArray = Object.values(submissionStatus);

export const demographicQuestions = [
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
];

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
 * Note: please make the ID field different
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
