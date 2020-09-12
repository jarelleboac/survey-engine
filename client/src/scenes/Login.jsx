import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginAction } from "../actions/session";
const mapStateToProps = ({ errors }) => ({
    errors
});

const Login = ({ errors, login }) => {
    const dispatch = useDispatch()
    const handleSubmit = e => {
        e.preventDefault();
        const user = {
            email: e.target[0].value,
            password: e.target[1].value,
        };
        dispatch(loginAction(user));
    }
    return (
        <>
            <h1>Login</h1>
            <p>{errors}</p>
            <form onSubmit={handleSubmit}>
                <label>
          Email:
                    <input type="email" name="email" />
                </label>
                <label>
          Password:
                    <input type="password" name="password" />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <Link to="/signup">Signup</Link>
        </>
    );
};

export default connect(
    mapStateToProps,
)(Login);