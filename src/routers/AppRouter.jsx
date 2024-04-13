import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";
import DashboardPage from "../features/Dashboard/DashboardPage";
import LoginPage from "../features/Auth/LoginPage";

const AppRouter = () => {

    const lastPath = () => {
        return "/dashboard"
    };

    return (
        <BrowserRouter>
            <Routes>

                {/* redirecto to /login route */}
                <Route path="/login" element={
                    <PublicRouter lastPath={lastPath()}>
                        <LoginPage/>
                    </PublicRouter>
                }/>

                {/* redirect to all other routes */}
                <Route path="/*" element={
                    <PrivateRouter>
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