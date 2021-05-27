import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { setChoice, showChoice} from '../features/userChoiceSlice'
import {fetchSeatsAsync, showSeats} from "../features/seatsSlice";
import PickHelper from "../services/PickHelper";

function PickSeat() {
    let seatCount = useSelector(showChoice).count;
    let near = useSelector(showChoice).near;
    let fetchStatus = useSelector(showSeats).status;
    let seatsArray = [...useSelector(showSeats).seats];
    let longestRow = useSelector(showSeats).longestRow;
    let [hallState, setHallState] = useState([]);
    let helper = new PickHelper(seatCount,near,seatsArray);
    helper.initializeForUserChoice();
    let [seats,setSeats] = useState([]);
    useEffect(()=>{
        setSeats(helper.seatsMatrix)
    },[fetchStatus])

    return (
        <div>
        </div>
    )
}
export default PickSeat