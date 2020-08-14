import React from 'react';
import { Survey } from './scenes/Survey'
import { SchoolAdminPanel } from './scenes/SchoolAdmin/AdminPanel'
import { PercentAdminPanel } from './scenes/PercentAdmin/AdminPanel'
import { roles } from '../../common/schema';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export const routes = [
    {
        authLevel: [roles.schoolAdmin, roles.percentAdmin],
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

export const PageRouter = () => {
    let currentUser = {userType: roles.schoolAdmin}
    return (
        <Router>
            <Switch>
                {routes.map(route => {
                    // return route.authLevel.includes(currentUser.userType) ? (
                    //     <Route key={route.path} path={route.path} render={() => <route.component />} />
                    // ) : null;
                    return route.authLevel.includes(currentUser.userType) ? (
                        <Route key={route.path} path={route.path} render={() => <route.component />} />
                    ) : null;
                })}
                <Route path="/">
                    {() => {
                        switch (currentUser.userType) {
                        case roles.schoolAdmin:
                            return <SchoolAdminPanel />;
                        case roles.percentAdmin:
                            return <PercentAdminPanel />;
                        default:
                            return <div>Please use the survey link in your email.</div>;
                        }
                    }}
                </Route>
            </Switch>
        </Router>)
}