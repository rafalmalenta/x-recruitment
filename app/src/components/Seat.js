import React from "react";
import  styled  from 'styled-components';
import { useHistory } from "react-router-dom";
import { setChoice, showChoice} from '../features/userChoiceSlice'
import { fetchSeatsAsync} from "../features/seatsSlice";

const SeatWrapper = styled.label`
display: inline-block;
float: left;
box-sizing: border-box;
width: ${props => Math.floor(10000 * props.paddingV)/1000}vw ;
margin: ${props => props.paddingV}vw;
height: ${props => Math.round(10000 * props.paddingV)/1000}vw ;
border: ${props => !props.seat.isNull? "1px solid black": ""};
background-color: ${props => props.seat.reserved? "#222":""};
background-color: ${props => props.seat.meetUserCondition? "red":""};
`
function Seat(props) {
    let border = props.seat.isNull;
    let seat = props.seat;
    console.log(seat.meetUserCondition)
    return (

        <SeatWrapper seat={seat} reserved={props.seat.reserved} border={border} paddingV={props.paddingV}>
            {/*{props.seat.cords.x}*/}
            {/*{props.seat.cords.y}*/}
            {/*{String(props.seat.reserved)}*/}
            {/*{String(props.seat.isNull)}*/}
            {props.seat.meetUserCondition && <input type="checkbox"/>}
        </SeatWrapper>
    )
}
export default Seat