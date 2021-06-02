import React from "react";
import styled  from 'styled-components';

const SquaredWrapper =styled.div`
float: left;
box-sizing: border-box;
position: relative;
width: ${props => Math.round(10000 * props.marginValue)/1000}% ;
margin: ${props => props.marginValue}%;
border: ${props => !props.seat.isNull? "1px solid black": ""};
:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}
`
const SeatLabel = styled.label`
display: block;
position: absolute;
width: 100%;
height: 100% ;
background-color: ${props => !props.seat.reserved&&!props.seat.isNull? "#ddd":""};
background-color: ${props => props.seat.rec? "white":""};
background-color: ${props => props.seat.reserved? "#474747":""};
transition: all 0.5s ease;
}
`
const INP = styled.input`
&:checked + label{
background-color: #ff8a05;
}
`
function Seat(props) {
    let border = props.seat.isNull;
    let seat = props.seat;
    let checked = props.seat.selected || false;
    function handleSelect(event){
        const val = event.target.checked;
        props.handleSelect({cordx:seat.cords.x,cordy:seat.cords.y},val);
    }

    return (
        <SquaredWrapper seat={seat} reserved={props.seat.reserved} border={border} marginValue={props.marginValue}>
            {props.seat.rec && <INP onChange={(event)=>handleSelect(event)} id={seat.id} hidden checked={checked} name={seat.id} type="checkbox" />}
            <SeatLabel htmlFor={seat.id} seat={seat} border={border} marginValue={props.marginValue} >
            </SeatLabel>
       </SquaredWrapper>

    )
}
export default Seat