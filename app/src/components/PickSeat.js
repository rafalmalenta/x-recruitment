import React  from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { setChoice, showChoice} from '../features/userChoiceSlice'
import { showSeats,select, deselect } from "../features/seatsSlice";
import PickHelper from "../services/PickHelper";
import Seat from "./Seat";
import styled from "styled-components";
const MapKey = styled.div`
display: block;
z-index: 10;
bottom: 0;
position: fixed;
width: 100%;
background-color: white;
`
const Tile = styled.div`
display: inline-block;
positiom: relative;
width: ${props => Math.round(10000 * props.padding)/1000}vw ;
height: ${props => Math.round(10000 * props.padding)/1000}vw ;
background-color: ${props => props.coloree};
`
function PickSeat() {
    let seatCount = useSelector(showChoice).count;
    let near = useSelector(showChoice).near;
    let fetchStatus = useSelector(showSeats).status;
    let seatsArray = useSelector(showSeats).seats;
    let longestRow = useSelector(showSeats).longestRow;
    const dispatch = useDispatch();

    const helper = new PickHelper(seatCount,near,seatsArray,longestRow);
    helper.fillArrayWithNullSeats();
    helper.initializeForUserChoice(seatCount,near);
    helper.setRecommendedSeats();


    function handleSelect({cordx,cordy},value){
        if(value == true ){
            if(helper.picksLeft>0)
                dispatch(select({x:cordx,y:cordy}));
            else alert("zarezerwowałeś wszystkie miejsca");
        }
        else{
            dispatch(deselect({x:cordx,y:cordy}));
        }
    }
    let paddingPercent = Math.floor(100/(12 * longestRow)*100)/100;
    let SeatList = helper.seatsMatrix.map(row=>row.map((seat)=>{
       return <Seat handleSelect={handleSelect} paddingV={paddingPercent} key={seat.id} seat={seat} />
    }))

    return (
        <div width="100%">
            {SeatList}
            <MapKey>
                <Tile padding={paddingPercent} coloree={"orange"}></Tile>
                <span>miejsca dostepne</span>
            </MapKey>
        </div>
    )
}
export default PickSeat