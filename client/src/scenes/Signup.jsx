import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signupAction } from "../actions/session";

const mapStateToProps = ({ errors }) => ({
    errors
});
const mapDispatchToProps = dispatch => ({
    signupAction: user => dispatch(signupAction(user))
});

export const Signup = ({ errors, signupAction }) => {
    const handleSubmit = e => {
        e.preventDefault();
        const user = {
            email: e.target[0].value,
            password: e.target[1].value
        };
        signupAction(user);
    };
    return (
        <>
            <h1>Signup</h1>
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
            <Link to="/login">Login</Link>
        </>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);