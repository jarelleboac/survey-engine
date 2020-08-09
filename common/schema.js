/**
 * Exports shared schemas between client and server. Holds information specific to certain
 * universities.
 */

export const schools = ['BROWN', 'UPENN', 'HARVARD', 'PERCENTAGE_PROJECT'];

export const roles = ['SCHOOL_ADMIN', 'PERCENTAGE_PROJECT_ADMIN'];

export const submissionStatus = ['UNSENT', 'SENT', 'IN-PROGRESS', 'COMPLETED'];

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
