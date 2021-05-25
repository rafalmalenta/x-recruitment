import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    useLocation
} from "react-router-dom";

import './App.css';
import {fetchSeats} from './features/fetchSeats';
import cinemaHall from './models/CinemaHall'
function App() {

    fetchSeats().then(res=>{
        let cc = new cinemaHall(res);
        console.log(cc)
    });
    //console.log(a)
  return (
      <Router>
          <div className="App">
              Start
          </div>
          <Switch>
              <Route exact path="/">
                  <div >s</div>
              </Route>
              <Route path="/pickseat?">
                  <div >d</div>
              </Route>
              <Route path="/summary">
                  <div >e</div>
              </Route>
          </Switch>
      </Router>

  );
}

export default App;
