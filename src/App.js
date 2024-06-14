import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./route/Routes";
import { useEffect } from "react";
import axios from "axios";

function App() {
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.defaults.withXSRFToken = true;
    }, []);

    return (
        <Router>
            <Routes />
        </Router>
    );
}

export default App;
