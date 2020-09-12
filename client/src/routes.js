import React from 'react';
import { Survey } from './scenes/Survey'
import Login from './scenes/Login'
import Signup from './scenes/Signup'
import { SchoolAdminPanel } from './scenes/SchoolAdmin/AdminPanel'
import { PercentAdminPanel } from './scenes/PercentAdmin/AdminPanel'
import { roles } from '../../common/schema';
import {useSelector, useDispatch} from 'react-redux'
import {jsx, Button} from 'theme-ui'
import {logout} from './actions/session'


import {
    Switch,
    Route,
    Redirect,
    Link
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


export const PageSwitches = () => {
    let currentUser = {userType: roles.schoolAdmin}
    return (
        <Switch>
            {routes.map(route => {
                return route.authLevel.includes(currentUser.userType) ? (
                    <Route key={route.path} path={route.path} render={() => <route.component />} />
                ) : null;
            })}
            <Route path="/login">
                <Login />
            </Route>
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
        </Switch>)
}

const Frame = () => {
    const session = useSelector(state => state.session)
    const dispatch = useDispatch()
    
    if (window.location.pathname.startsWith('/login')) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="container">
            <div id="logo-container">
                <img src="logo.png" id="logo" alt="% project logo"/>
            </div>
            <header
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    variant: 'styles.header',
                }}>
                <Link to='/'
                    sx={{
                        variant: 'styles.navlink',
                        p: 2,
                    }}>
    Hello
                </Link>
                <div sx={{ mx: 'auto' }} />
                <Link to='/blog'
                    sx={{
                        variant: 'styles.navlink',
                        p: 2,
                    }}>
    Blog
                </Link>
                <Link to='/about'
                    sx={{
                        variant: 'styles.navlink',
                        p: 2,
                    }}>
    About
                </Link>
                <Button onClick={() => dispatch(logout())}>Log out</Button>
            </header>
            <PageSwitches />


        </div>)
    // <ActionButtonContext.Provider value={{ ActionButton, update: setActionButton }}>
    //     <Layout onFocus={resetScroll} sidebar={menuOpen}>
    //         <div className="header">
    //             <SpaceBetweenRow>
    //                 <MenuIcon open={menuOpen} setOpen={setMenuOpen} />
    //                 <Title color={STRINGS.ACCENT_COLOR} margin="1.5rem 0rem 0rem">
    //                     <Switch>
    //                         {routes.map(route => {
    //                             return route.authLevel.includes(currentUser.userType) ? (
    //                                 <Route key={route.path} path={route.path} render={() => route.displayText} />
    //                             ) : null;
    //                         })}
    //                         <Route path="/">Dashboard</Route>
    //                     </Switch>
    //                 </Title>
    //                 {ActionButton || null}
    //             </SpaceBetweenRow>
    //             <Rectangle />
    //         </div>
    //         <Sidebar setMenuOpen={setMenuOpen} />
    //         <OverflowContainer className="content">
    //             <Suspense fallback={<div>Loading...</div>}>
    //                 <Switch>
    //                     {routes.map(route => {
    //                         return route.authLevel.includes(currentUser.userType) ? (
    //                             <Route key={route.path} path={route.path} render={() => <route.component />} />
    //                         ) : null;
    //                     })}
    //                     <Route path="/">
    //                         {() => {
    //                             switch (currentUser.userType) {
    //                             case UserType.Organizer:
    //                                 return <OrganizerDash />;
    //                             case UserType.Sponsor:
    //                                 return <SponsorDash />;
    //                             case UserType.Hacker:
    //                                 return <HackerDash />;
    //                             default:
    //                                 return <div>Dash not implemented for this user type.</div>;
    //                             }
    //                         }}
    //                     </Route>
    //                 </Switch>
    //             </Suspense>
    //         </OverflowContainer>
    //     </Layout>
    // </ActionButtonContext.Provider>
    
};


export const StateMachine = () => {
    const session = useSelector(state => state.session)
    return session.userId && session.role && session.school ? 
        (
            <Frame />
        ) : (
            <Login />
        )
}

export const Routes = () => {
    return(<StateMachine />)
}
