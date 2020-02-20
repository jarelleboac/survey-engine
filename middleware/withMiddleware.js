import withDatabase from "./withDatabase";
import withSession from "./withSession";

// centralize our middleware into a global middleware
const middleware = handler => withDatabase(withSession(handler));

export default middleware;
