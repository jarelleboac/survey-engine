import React from 'react'
import {Switch, Redirect, Route, Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {jsx} from 'theme-ui'

const Frame = () => {
    const session = useSelector(state => state.session)
    
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
            </header>



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

export default Frame;