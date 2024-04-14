import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const PrivateRouter = ({ children }) => {
    const {id} = useSelector(state => state.auth);

    return true
        ? children
        : <Navigate to="/login"/>
};


export default PrivateRouter;