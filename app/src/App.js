import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import {fetchSeats} from './features/fetchSeats';
import cinemaHall from './models/CinemaHall'
import Form from "./components/Form";
import {showChoice} from "./features/userChoiceSlice";
import {showSeats} from "./features/seatsSlice";

function App () {
    console.log("render");
    console.log(useSelector(showSeats))
    fetchSeats().then(res=>{
        //let cc = new cinemaHall(res);
        console.log("cc")
    });
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
                  <div >ddsad</div>
              </Route>
              <Route path="/summary">
                  <div >e</div>
              </Route>
          </Switch>
      </Router>

  );
}

export default App;
