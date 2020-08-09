"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.harvardQuestions = exports.uPennQuestions = exports.brownQuestions = exports.commonQuestions = exports.demographicQuestions = exports.submissionStatus = exports.roles = exports.schools = void 0;

/**
 * Exports shared schemas between client and server. Holds information specific to certain
 * universities.
 */
var schools = ['BROWN', 'UPENN', 'HARVARD', 'PERCENTAGE_PROJECT'];
exports.schools = schools;
var roles = ['SCHOOL_ADMIN', 'PERCENTAGE_PROJECT_ADMIN'];
exports.roles = roles;
var submissionStatus = ['UNSENT', 'SENT', 'IN-PROGRESS', 'COMPLETED'];
exports.submissionStatus = submissionStatus;
var demographicQuestions = [{
  id: 'first_name',
  question: 'First name',
  component: ''
}];
exports.demographicQuestions = demographicQuestions;
var commonQuestions = [].concat(demographicQuestions, [{
  id: '',
  question: '',
  component: ''
}]);
exports.commonQuestions = commonQuestions;
var brownQuestions = [];
exports.brownQuestions = brownQuestions;
var uPennQuestions = [];
exports.uPennQuestions = uPennQuestions;
var harvardQuestions = [];
exports.harvardQuestions = harvardQuestions;
