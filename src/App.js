import Login from './Components/Login/Login';
import './App.css';
import Users from './Components/Users/Users'
import Orders from './Components/Orders/Orders';

import { Route, BrowserRouter as Router } from 'react-router-dom';
import Products from './Components/Products/Products';
function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={Login} />
        <Route exact path='/products' component={Products} />
        <Route exact path='/users' component={Users} />
        <Route exact path='/orders' component={Orders} />
      </div>
    </Router>
  );
}

export default App;
