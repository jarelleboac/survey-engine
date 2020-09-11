import BrownSurvey from './BrownSurvey';
import SurveyCommon from './SurveyCommon';
import { schools } from '../../schema';

/**
 * Builds an object mapping the school dict to the different questions
 */
const mapSchoolsToQuestionSchemas = () => {
    const dict = {};
    // Specify mapping programmatically since syntax prevents direct key setting
    dict[schools.brown] = BrownSurvey;

    return dict;
};
const schoolsToQuestionSchemas = mapSchoolsToQuestionSchemas();

export default { SurveyCommon, BrownSurvey, schoolsToQuestionSchemas };
