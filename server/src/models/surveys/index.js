import { BrownSurvey } from './BrownSurvey';
import { PennSurvey } from './PennSurvey';
import { DrexelSurvey } from './DrexelSurvey';
import { DukeSurvey } from './DukeSurvey';
import { RutgersSurvey } from './RutgersSurvey';
import { ColumbiaSurvey } from './ColumbiaSurvey';
import { CmuSurvey } from './CmuSurvey';
import { UiucSurvey } from './UiucSurvey';
import { NyuSurvey } from './NyuSurvey';
import { VanderbiltSurvey } from './VanderbiltSurvey';
import { HarvardSurvey } from './HarvardSurvey';
import SurveyCommon from './SurveyCommon';
import { schools } from '../../schema';

/**
 * Builds an object mapping the school dict to the different questions
 */
const mapSchoolsToQuestionSchemas = () => {
    const dict = {};
    // Specify mapping programmatically since syntax prevents direct key setting
    dict[schools.brown] = BrownSurvey;
    dict[schools.penn] = PennSurvey;
    dict[schools.harvard] = HarvardSurvey;
    dict[schools.drexel] = DrexelSurvey;
    dict[schools.duke] = DukeSurvey;
    dict[schools.rutgers] = RutgersSurvey;
    dict[schools.cmu] = CmuSurvey;
    dict[schools.columbia] = ColumbiaSurvey;
    dict[schools.nyu] = NyuSurvey;
    dict[schools.uiuc] = UiucSurvey;
    dict[schools.vanderbilt] = VanderbiltSurvey;
    return dict;
};
const schoolsToQuestionSchemas = mapSchoolsToQuestionSchemas();

export default {
    SurveyCommon,
    BrownSurvey,
    PennSurvey,
    DukeSurvey,
    DrexelSurvey,
    RutgersSurvey,
    ColumbiaSurvey,
    CmuSurvey,
    UiucSurvey,
    NyuSurvey,
    HarvardSurvey,
    VanderbiltSurvey,
    schoolsToQuestionSchemas,
};
