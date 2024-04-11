import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children, isAuthenticated }) => {
    return isAuthenticated
        ? children
        : <Navigate to="/login"/>
};


export default PrivateRouter;