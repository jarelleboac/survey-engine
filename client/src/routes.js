import React from 'react';
import { Survey } from './scenes/Survey'
import Login from './scenes/Login'
import Signup from './scenes/Signup'
import { SchoolAdminPanel } from './scenes/SchoolAdmin/AdminPanel'
import { PercentAdminPanel } from './scenes/PercentAdmin/AdminPanel'
import { roles } from '../../common/schema';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

const AuthorizedRoute = () => {
    
}

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
        displayText: 'School Admin Dashboard',
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
                
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                {routes.map(route => {
                    // return route.authLevel.includes(currentUser.userType) ? (
                    //     <Route key={route.path} path={route.path} render={() => <route.component />} />
                    // ) : null;
                    return route.authLevel.includes(currentUser.userType) ? (
                        <Route key={route.path} path={route.path} render={() => <route.component />} />
                    ) : <Redirect to='/login' />;
                })}
                <Route path="/">
                    {() => {
                        switch (currentUser.userType) {
                        case roles.schoolAdmin:
                            return <SchoolAdminPanel />;
                        case roles.percentAdmin:
                            return <PercentAdminPanel />;
                        default:
                            return <div>Navigate to /login, /signup, or please use the survey link in your email to access your email.</div>;
                        }
                    }}
                </Route>
                
            </Switch>
        </Router>)
}