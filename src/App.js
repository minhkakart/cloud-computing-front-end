import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useGlobalState } from './global';
import Routes from './route/Routes';


function App() {

  const [state, ] = useGlobalState();

  console.log(state);

  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
