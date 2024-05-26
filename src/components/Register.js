import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(true);

    const navigator = useNavigate();

    const handleRegister = () => {
        navigator("/auth/login");
    };

    return (
        <div className="container min-vh-100">
            <h1>Register</h1>
            <form>
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Password"
                        />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirm-password" className="form-label">
                        Confirm password
                    </label>
                    <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setIsConfirmed(e.target.value === password);
                        }}
                        className={clsx('form-control', {
                            border: isConfirmed,
                            'border-danger': !isConfirmed
                        })}
                        placeholder="Confirm Password"
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleRegister}
                    disabled={!isConfirmed || email === '' || password === '' || confirmPassword === ''}
                    >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Register;
