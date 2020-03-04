import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './Pages/Login';

const App: React.FC = () => {
    return (
      <div>
        <BrowserRouter>
            <Switch>
              <Route path="/login" exact component={ LoginPage } />
            </Switch>
        </BrowserRouter>
      </div>
    )
}


export default App;