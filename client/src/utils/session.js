export const signup = user => (
    fetch(`${process.env.REACT_APP_API_URL}/user/`, {
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


export const checkLoggedIn = () => (
    fetch(`${process.env.REACT_APP_API_URL}/session/`, {credentials: 'include'}))

export const resetPassword = user => (
    fetch(`${process.env.REACT_APP_API_URL}/user/reset`, {
        method: "POST",
        body: JSON.stringify(user),
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        }
    })
)

export const createUser = user => (
    fetch(`${process.env.REACT_APP_API_URL}/user/`, {
        method: "POST",
        body: JSON.stringify(user),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json',
            credentials: 'include',
            Authorization: `${localStorage.jwtToken}`,
            withCredentials: true, }
    })
)