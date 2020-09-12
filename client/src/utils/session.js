export const signup = user => (
    fetch(`${process.env.REACT_APP_API_URL}/users/`, {
        method: "POST",
        body: JSON.stringify(user),
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        }
    })
);

export const login = user => (
    fetch(`${process.env.REACT_APP_API_URL}/session/`, {
        method: "POST",
        body: JSON.stringify(user),
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        }
    })
)
    

export const logout = () => (
    fetch(`${process.env.REACT_APP_API_URL}/session/`, { method: "DELETE", credentials: 'include', })
);

// export const checkLoggedIn = async () => {
//     const response = await fetch(`${process.env.REACT_APP_API_URL}/session/`, {credentials: 'include'});
//     const { user } = await response.json();
//     let preloadedState = {};
//     if (user) {
//         preloadedState = {
//             session: user
//         };
//     }
//     return preloadedState;
// };

export const checkLoggedIn = () => (
    fetch(`${process.env.REACT_APP_API_URL}/session/`, {credentials: 'include'}))