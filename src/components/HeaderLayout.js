import { Link } from "react-router-dom";
import { useGlobalState } from "../global";

function HeaderLayout({ children }) {
    const [state] = useGlobalState();

    return (
        <div className="d-flex flex-column">
            <div className="header bg-primary text-white mb-5">
                <div className="container d-flex flex-row justify-content-between align-items-center">
                    <h1>Cloud Computing</h1>
                    {state.user ? (
                        <button type="button" className="btn btn-outline-light">{state.user}</button>
                    ) : (
                        <div>
                            <Link to="/login" className="text-white text-decoration-none btn btn-danger me-2">
                                Login
                            </Link>
                            <Link to="/register" className="text-white text-decoration-none btn btn-outline-info">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="container-sm">{children}</div>
        </div>
    );
}

export default HeaderLayout;
