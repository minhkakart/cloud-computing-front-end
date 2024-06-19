import { useState } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import axios from "axios";
import clsx from "clsx";
import styles from "./scss/login-register.module.scss";
import MessageModal from "./MessageModal";

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ show: false, message: "" });
    const toggleShowError = () => setError({ show: !error.show, message: "" });

    const [Name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        try {
            await axios.get(
                process.env.REACT_APP_API_DOMAIN + "/api/csrf-cookie"
            );

            const register = await axios.post(
                process.env.REACT_APP_API_DOMAIN + "/api/register",
                {
                    name: Name,
                    email: email,
                    password: password,
                }
            );

            if (register.status === 200) {
                setIsRegistered(true);
            } else {
                throw new Error("Failed to register. Please try again later.");
            }
            
        } catch (error) {
            setError({ show: true, message: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-secondary-subtle">
            <div className={clsx(styles.wrapper, "flex-column", "rounded-4")}>
                <h1>Register</h1>
                <form className="w-100 p-sm-5">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Display name
                        </label>
                        <input
                            type="name"
                            name="name"
                            id="name"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            placeholder="Display name"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
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
                            autoComplete="on"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Password"
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="confirm-password"
                            className="form-label">
                            Confirm password
                        </label>
                        <input
                            type="password"
                            name="confirm-password"
                            id="confirm-password"
                            autoComplete="on"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setIsConfirmed(e.target.value === password);
                            }}
                            className={clsx("form-control", {
                                border: isConfirmed,
                                "border-danger": !isConfirmed,
                            })}
                            placeholder="Confirm Password"
                        />
                    </div>
                    <div className="d-flex flex-row justify-content-between align-items-end">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleRegister}
                            disabled={
                                !isConfirmed ||
                                Name === "" ||
                                email === "" ||
                                RegExp(
                                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
                                ).test(email) === false ||
                                password === "" ||
                                confirmPassword === ""
                            }>
                            Register
                        </button>
                        <div>
                            Already have account?{" "}
                            <Link to="/login" className="fw-bold">
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
            <MessageModal
                message="You have successfully registered! Please confirm your email before login."
                show={isRegistered}
                link="/login"
            />
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
                    <Toast.Body className="text-white">
                        {error.message}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default Register;
