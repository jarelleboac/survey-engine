import React from 'react';
import { Survey } from './scenes/Survey'
import { SchoolAdminPanel } from './scenes/SchoolAdmin/AdminPanel'
import { PercentAdminPanel } from './scenes/PercentAdmin/AdminPanel'
import { roles } from '../../common/schema';

export const routes = [
    {
        authLevel: [],
        component: Survey,
        displayText: 'Survey',
        path: '/survey',
    },
    {
        authLevel: [roles.schoolAdmin],
        component: SchoolAdminPanel,
        displayText: 'Dashboard',
        path: '/schoolAdmin',
    },
    {
        authLevel: [roles.percentAdmin],
        component: PercentAdminPanel,
        displayText: 'Percentage Project Admin',
        path: '/percentAdmin',
    },
];