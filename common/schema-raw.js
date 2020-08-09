/**
 * Exports shared schemas between client and server. Holds information specific to certain
 * universities.
 */
export const schools = {
  brown: 'BROWN', upenn: 'UPENN', harvard: 'HARVARD', percentProj: 'PERCENTAGE_PROJECT',
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
    id: 'first_name',
    question: 'First name',
    component: '',
  },
];

export const commonQuestions = [
  ...demographicQuestions,
  {
    id: '',
    question: '',
    component: '',
  },
];

export const brownQuestions = [

];

export const uPennQuestions = [

];

export const harvardQuestions = [

];
