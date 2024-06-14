import { Navigate, useRoutes } from "react-router-dom";
import DashBoard from "../components/DashBoard";
import Login from "../components/Login";
import Register from "../components/Register";
import AuthGuard from "../Guards/AuthGuard";
import GoongMap from "../components/GoongMap";
import UploadImage from "../components/UploadImage";
import HeaderLayout from "../components/HeaderLayout";
import CloudTranslate from "../components/cloud-translate/CloudTranslate";
import AuthenticatedRoute from "../components/auth/AuthenticatedRoute";

function Routes() {
    return useRoutes([
        {
            path: "/",
            element: <Navigate to="dashboard" />,
        },
        {
            path: "/",
            children: [
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "register",
                    element: <Register />,
                },
                {
                    path: "dashboard",
                    element: (
                        <HeaderLayout>
                            <DashBoard />
                        </HeaderLayout>
                    ),
                },
            ],
        },
        {
            path: "/map",
            element: (
                <AuthGuard>
                    <GoongMap />
                </AuthGuard>
            ),
        },
        {
            path: "/uploadimage",
            element: (
                <AuthGuard>
                    <UploadImage />
                </AuthGuard>
            ),
        },
        {
            path: "/cloud-translate",
            children: [
                {
                    path: "translate",
                    element: (
                        <AuthenticatedRoute Element={CloudTranslate} Layout={HeaderLayout} />
                    ),
                },
            ],
        },
    ]);
}

export default Routes;
