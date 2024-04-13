import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const PublicRouter = ({ children, lastPath}) => {
    const {id} = useSelector(state => state.auth);

    return !id
        ? children
        : <Navigate to={lastPath}/>
};

export default PublicRouter

