import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { setChoice, showChoice} from '../features/userChoiceSlice'
import {fetchSeatsAsync, showSeats, prepareStateToMatchUserCondition} from "../features/seatsSlice";

import Seat from "./Seat";
function PickSeat() {
    let seatCount = useSelector(showChoice).count;
    let near = useSelector(showChoice).near;
    let fetchStatus = useSelector(showSeats).status;
    let seatsArray = useSelector(showSeats).seats;
    let longestRow = useSelector(showSeats).longestRow;
    const dispatch = useDispatch();
    console.log(seatsArray);

    // useEffect(()=>{
    //     if (fetchStatus === "finished")
    //         dispatch(prepareStateToMatchUserCondition({near:near,count:seatCount}));
    // },[fetchStatus])
    let paddingPercent = Math.floor(100/(12 * longestRow)*100)/100;
    let SeatList = seatsArray.map(row=>row.map((seat)=>{
       return <Seat paddingV={paddingPercent} key={seat.id} seat={seat} />
    }))

    return (
        <div width="100%">
            {SeatList}
        </div>
    )
}
export default PickSeat