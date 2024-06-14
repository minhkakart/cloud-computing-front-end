import { Fragment } from "react";
import { useGlobalState } from "../global";
import { Navigate } from "react-router-dom";

function AuthGuard({ children }){
    const [state]  = useGlobalState();
    const isAuthenticated = state.user !== null && state.token !== null;

    if(isAuthenticated){
        return <Fragment>{children}</Fragment>;
    } else {
        return <Navigate to="/login" />;
    }

}

export default AuthGuard;