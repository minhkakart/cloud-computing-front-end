import { useState } from "react";
import { useGlobalState } from "../global";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [, dispatch] = useGlobalState();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigator = useNavigate();

    const handleLogin = () => {
      dispatch({ type: "LOGIN", payload: {user: email, token: 'token'} });
      navigator('/');
    };

    return (
        <div className="container min-vh-100">
            <h1>Login</h1>
            <form>
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
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
