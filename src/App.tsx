import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './Pages/Login';
import HomePage from './Pages/Home';

const App: React.FC = () => {
    return (
      <div>
        <BrowserRouter>
            <Switch>
              <Route path="/" exact component={ HomePage } />
              <Route path="/login" exact component={ LoginPage } />
            </Switch>
        </BrowserRouter>
      </div>
    )
}


export default App;