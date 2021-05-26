import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import './App.css';
import Form from "./components/Form";
import PickSeat from "./components/PickSeat";
function App () {
  return (
      <Router>
          <div className="App">
              Start
          </div>
          <Switch>
              <Route exact path="/">
                  <Form/>
              </Route>
              <Route path="/pickseat">
                  <PickSeat/>
              </Route>
              <Route path="/summary">
                  <div >e</div>
              </Route>
          </Switch>
      </Router>

  );
}

export default App;
