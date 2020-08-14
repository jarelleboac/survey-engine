"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.harvardQuestions = exports.uPennQuestions = exports.brownQuestions = exports.commonQuestions = exports.demographicQuestions = exports.submissionStatusArray = exports.submissionStatus = exports.rolesArray = exports.roles = exports.schoolsArray = exports.schools = void 0;

/**
 * Exports shared schemas between client and server. Holds information specific to certain
 * universities.
 */
var schools = {
  brown: 'BROWN',
  uPenn: 'UPENN',
  harvard: 'HARVARD',
  percentProj: 'PERCENTAGE_PROJECT'
};
exports.schools = schools;
var schoolsArray = Object.values(schools);
exports.schoolsArray = schoolsArray;
var roles = {
  schoolAdmin: 'SCHOOL_ADMIN',
  percentAdmin: 'PERCENTAGE_PROJECT_ADMIN'
};
exports.roles = roles;
var rolesArray = Object.values(roles);
exports.rolesArray = rolesArray;
var submissionStatus = {
  unsent: 'UNSENT',
  sent: 'SENT',
  inProgress: 'IN-PROGRESS',
  completed: 'COMPLETED'
};
exports.submissionStatus = submissionStatus;
var submissionStatusArray = Object.values(submissionStatus);
/**
 * Schema for questions. Note that the "type" field should be for Mongoose
 */

exports.submissionStatusArray = submissionStatusArray;
var demographicQuestions = [{
  id: 'grade',
  question: 'What is your grade?',
  component: 'Checkbox',
  options: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Super Senior', 'Graduate'],
  required: true,
  type: String
}, {
  id: 'firstName',
  question: 'First name',
  component: '',
  required: true,
  type: String
}, {
  id: 'lastName',
  question: 'Last name',
  component: '',
  required: true,
  type: String
}];
exports.demographicQuestions = demographicQuestions;
var commonQuestions = [].concat(demographicQuestions, [{
  id: 'food',
  question: 'What is your favorite food?',
  component: '',
  required: true,
  type: String
}]);
/**
 * QUESTIONS SPECIFIC TO SCHOOLS
 *
 * Note: please make the ID field different
 */

exports.commonQuestions = commonQuestions;
var brownQuestions = [];
exports.brownQuestions = brownQuestions;
var uPennQuestions = [];
exports.uPennQuestions = uPennQuestions;
var harvardQuestions = []; // /**
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

exports.harvardQuestions = harvardQuestions;
