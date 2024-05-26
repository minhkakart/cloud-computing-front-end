import { useRoutes } from "react-router-dom";
import DashBoard from "../components/DashBoard";
import Login from "../components/Login";
import Register from "../components/Register";
import AuthGuard from "../Guards/AuthGuard";

function Routes() {
    return useRoutes([
        {
            path: "/",
            children: [
                {
                    path: "/",
                    element: (
                        <AuthGuard>
                            <DashBoard />
                        </AuthGuard>
                    )
                }
            ]
        },
        {
            path: '/auth',
            children: [
                {
                    path: 'login',
                    element: <Login />
                },
                {
                    path: 'register',
                    element: <Register />
                }
            ]
        }
    ]);
}

export default Routes;