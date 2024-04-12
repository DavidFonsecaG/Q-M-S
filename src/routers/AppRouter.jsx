import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";

const AppRouter = () => {

    const isAuthenticated = false;

    const lastPath = () => {
        return "/dashboard"
    };

    return (
        <BrowserRouter>
            <Routes>

                {/* redirecto to /login route */}
                <Route path="/login" element={
                    <PublicRouter isAuthenticated={isAuthenticated} lastPath={lastPath()}>
                        <LoginPage/>
                    </PublicRouter>
                }/>

                {/* redirect to all other routes */}
                <Route path="/*" element={
                    <PrivateRouter isAuthenticated={isAuthenticated}>
                        <Routes>
                            <Route path="/dashboard" element={<DashboardPage/>}/>
                            <Route path="*" element={<Navigate to={"/dashboard"}/>}/>
                        </Routes>
                    </PrivateRouter>
                }/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;