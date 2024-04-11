import { Navigate } from "react-router-dom";

const PublicRouter = ({ children, isAuthenticated, lastPath}) => {
    return !isAuthenticated
        ? children
        : <Navigate to={lastPath}/>
};

export default PublicRouter

