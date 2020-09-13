/** @jsx jsx */

import React, {useEffect, useState} from 'react';
import { Survey } from './scenes/Survey'
import { Login } from './scenes/Login'
import { Signup}  from './scenes/Signup'
import { SchoolAdminPanel } from './scenes/SchoolAdmin/AdminPanel'
import { PercentAdminPanel } from './scenes/PercentAdmin/AdminPanel'
import { Dashboard } from './scenes/Dashboard'
import { roles } from '../../common/schema';
import {useSelector, useDispatch} from 'react-redux'
import { jsx, Button} from 'theme-ui'
import {logoutAction, checkLoggedInAction} from './actions/session'


import {
    Switch,
    Route,
    Redirect,
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


export const PageSwitches = () => {
    const session = useSelector(state => state.session)
    return (
        <Switch>
            {routes.map(route => {
                return route.authLevel.includes(session.role) ? (
                    <Route key={route.path} path={route.path} render={() => <route.component />} />
                ) : null;
            })}
            <Route path="/login" component={Login} />
            {/* <Route path="/signup" component={Signup} /> */}
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/">
                {() => {
                    switch (session.role) {
                    case roles.schoolAdmin:
                        return <SchoolAdminPanel />;
                    case roles.percentAdmin:
                        return <PercentAdminPanel />;
                    default:
                        return <div className="default">Navigate to /login, /signup, or please use the survey link in your email to access your email.</div>;
                    }
                }}
            </Route>

        </Switch>)
}

const Frame = () => {
    
    const dispatch = useDispatch()
    
    if (window.location.pathname.startsWith('/login')) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="container">
            <div id="logo-container">
                <Link to="/">
                    <img src="logo.png" id="logo" alt="% project logo"/>
                </Link>
            </div>
            <header
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    variant: 'styles.header',
                }}
                className="header">
                <div sx={{ mx: 'auto' }} />
                <Link to="/" sx={{
                    variant: 'styles.navlink',
                    p: 2,
                }}>Data</Link>
                <Link to="/dashboard" sx={{
                    variant: 'styles.navlink',
                    p: 2,
                   
                }}>Dashboard</Link>
                <Button sx={{ marginRight: '20px'}} onClick={() => dispatch(logoutAction())}>Log out</Button>
            </header>
           

            <PageSwitches />
        </div>)
};




export const Routes = () => {
    const [ready, setReady] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {
        async function fetchData() {
            await dispatch(checkLoggedInAction())
            setReady(true)
        }
        fetchData()

    },[])
    
    const StateMachine = () => {
        const session = useSelector(state => state.session)
        if (!ready) return null;
        return session.userId && session.role && session.school ? 
            (
                <Frame />
            ) : (
                <Login />
            )
    }
    return(<StateMachine />)
}
