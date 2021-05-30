import React from "react";
import  styled  from 'styled-components';
import { useHistory } from "react-router-dom";
import { setChoice, showChoice} from '../features/userChoiceSlice'
import { fetchSeatsAsync} from "../features/seatsSlice";
const Wrapper =styled.div`
display: inline-block;
float: left;
box-sizing: border-box;
width: ${props => Math.floor(10000 * props.paddingV)/1000}vw ;
margin: ${props => props.paddingV}vw;
height: ${props => Math.round(10000 * props.paddingV)/1000}vw ;
border: ${props => !props.seat.isNull? "1px solid black": ""};
`
const SeatWrapper = styled.label`
display: block;
position: relative;
width: 100%;
height: 100% ;
background-color: ${props => !props.seat.reserved&&!props.seat.isNull? "#ccc":""};
background-color: ${props => props.seat.rec? "white":""};
background-color: ${props => props.seat.reserved? "#222":""};
transition: all 1s ease;
}
`
const INP = styled.input`
&:checked + label{
background-color: yellow;
}
`
function Seat(props) {
    let border = props.seat.isNull;
    let seat = props.seat;
    let checked = props.seat.selected || false;
    function handleSelect(event){
        const val = event.target.checked;
        props.handleSelect({cordx:seat.cords.x,cordy:seat.cords.y},val);
        // console.log("cal",seat.rec)
    }

    return (
        <Wrapper seat={seat} reserved={props.seat.reserved} border={border} paddingV={props.paddingV}>
            {props.seat.rec && <INP onChange={(event)=>handleSelect(event)} id={seat.id} hidden checked={checked} name="seat" type="checkbox" />}
            <SeatWrapper htmlFor={seat.id} seat={seat} reserved={props.seat.reserved} border={border} paddingV={props.paddingV} >

                {/*{props.seat.cords.x}*/}
                {/*{props.seat.cords.y}*/}
                {/*{String(props.seat.reserved)}*/}
                {/*{String(props.seat.isNull)}*/}
            </SeatWrapper>
            {String(seat.rec)}
            {/*{String(seat.selected)}*/}
       </Wrapper>

    )
}
export default Seat