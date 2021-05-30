import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import './App.css';
import Form from "./components/Form";
import PickSeat from "./components/PickSeat";
import Summary from "./components/Summary";
function App () {
  return (
      <Router>
          <Switch>
              <Route exact path="/">
                  <Form/>
              </Route>
              <Route path="/pickseat">
                  <PickSeat/>
              </Route>
              <Route path="/summary">
                  <Summary/>
              </Route>
          </Switch>
      </Router>

  );
}

export default App;
