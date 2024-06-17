import { useState } from "react";
import { useGlobalState } from "../global";
import { Link, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import axios from "axios";
import clsx from "clsx";
import styles from "./scss/login-register.module.scss";

const Login = () => {
    const [, dispatch] = useGlobalState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ show: false, message: "" });

    const toggleShowError = () => setError({ show: !error.show, message: "" });

    const navigator = useNavigate();

    const handleLogin = () => {
        setLoading(true);
        axios
            .get(process.env.REACT_APP_API_DOMAIN + "/api/csrf-cookie")
            .then(() => {
                axios
                    .post(process.env.REACT_APP_API_DOMAIN + "/api/login", {
                        email: email,
                        password: password,
                    })
                    .then((res) => {
                        console.log(res.data);
                        dispatch({
                            type: "LOGIN",
                            payload: {
                                user: res.data.username,
                                token: res.data.access_token,
                            },
                        });
                        navigator("/");
                    })
                    .catch((error) => {
                        console.log(error);
                        setError({
                            show: true,
                            message: error.message,
                        });
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                setError({ show: true, message: error.message });
            });
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-secondary-subtle">
            <div className={clsx(styles.wrapper, "flex-column", "rounded-4")}>
                <h1>Login</h1>
                <form className="w-100 p-sm-5">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Password"
                        />
                    </div>
                    <div className="d-flex flex-row justify-content-between align-items-end">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleLogin}
                            disabled={
                                email === "" ||
                                RegExp(
                                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
                                ).test(email) === false ||
                                password === ""
                            }>
                            Login
                        </button>
                        <div>
                            Don't have account?{" "}
                            <Link to="/register" className="fw-bold">
                                Register
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
            {loading && (
                <div className={clsx(styles.loading)}>
                    <ReactLoading
                        type={"cylon"}
                        color={"#000"}
                        height={"20%"}
                        width={"20%"}
                    />
                </div>
            )}
            <ToastContainer
                className="p-3"
                position="bottom-end"
                style={{ zIndex: 1 }}>
                <Toast
                    bg="danger"
                    show={error.show}
                    onClose={toggleShowError}
                    delay={3000}
                    autohide>
                    <Toast.Header>
                        <strong className="me-auto">Error</strong>
                        <small>Now</small>
                    </Toast.Header>
                    <Toast.Body  className="text-white">{error.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default Login;
