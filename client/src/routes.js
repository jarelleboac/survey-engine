/** @jsx jsx */

import {useEffect, useState} from 'react';
import { Survey } from './scenes/Survey'
import { Login } from './scenes/Login'
// import { Signup}  from './scenes/Signup'
import { SchoolAdminPanel } from './scenes/SchoolAdmin/AdminPanel'
import { PercentAdminPanel } from './scenes/PercentAdmin/PercentAdminPanel'
import { Dashboard } from './scenes/Dashboard'
import { roles } from '../../common/schema';

import {useSelector, useDispatch} from 'react-redux'
import { jsx, Button } from 'theme-ui'
import {logoutAction, checkLoggedInAction} from './actions/session'
import {Heading} from 'theme-ui'

import {
    Switch,
    Route,
    Redirect,
    Link,
    useLocation
} from "react-router-dom";
import { capitalizeString } from './utils';


export const routes = [
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

// Auth spreading here
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
            <Route path="/survey" component={Survey} />
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

// FIXME: Once survey routes are done, this will need to be routing users to the survey
const Frame = () => {
    
    const dispatch = useDispatch()
    const session = useSelector(state => state.session)
    
    if (window.location.pathname.startsWith('/login')) {
        if (session.userId && session.role && session.school) {
            return <Redirect to="/dashboard" />;
        } else {
            return <Redirect to="/login" />;
        }
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
                <Heading>{capitalizeString(session.school)}</Heading>
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

/**
 * Version of the Survey component for external sight
 * 
 * @param {string} school – the school that this survey belongs to
 * @param {string} token – the UUID of the survey
 */
const WrappedSurvey = ({school, token}) => {
    const lowercaseSchool = capitalizeString(school)

    return(
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
                <Heading>Survey at {lowercaseSchool}</Heading>
            </header>
           

            <Survey school={school} token={token} />
        </div>)
}


export const Routes = () => {
    const [ready, setReady] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {
        async function fetchData() {
            // Check if there's a logged in user here
            await dispatch(checkLoggedInAction())
            setReady(true)
        }
        fetchData()

    },[dispatch])
    
    const StateMachine = () => {
        const query = useQuery();

        const token = query.get("token")
        const school = query.get("school")
        const session = useSelector(state => state.session)

        if (!ready) {
            return (<div className="default">Lost connection with the server. Please contact the % project.</div>)
        }
        
        if (session.userId && session.role && session.school) {
            return <Frame />
        } else if (token) {
            return <WrappedSurvey school={school} token={token}/>
        } else {
            return (<Login />)
        }
    }
    return(<StateMachine />)
}

// Handles grabbing location of the current route
export const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}