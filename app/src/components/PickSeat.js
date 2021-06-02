import React  from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { showChoice } from '../features/userChoiceSlice'
import {showSeats, select, deselect, registerSeats} from "../features/seatsSlice";
import Seat from "./Seat";
import styled from "styled-components";
import HelperInitializer from "../services/HelperInitializer";

const GigaButton = styled.div`
box-sizing: border-box;
border: 1px solid black;
position: relative;
right: ${props => 100-(14 * 12 * Math.round(10000 * props.margin)/10000)}%;
float: right;
display: flex;
align-items: center;
justify-content: center;
height: ${props => 10 * props.margin}vh;
margin: ${props => 1 * props.margin}%;
width: ${props =>  (46 * props.margin)}%;
`
const ViewWrapper = styled.div`
position: relative;
float: left;
margin-left: ${props => 2 * props.margin}%;
margin-right: ${props => 2 * props.margin}%;
width: ${props => 100 - (4 * props.margin)}%;
`
const CinemaWrapper =styled.div`
float: left;
width: 100%;
margin-bottom: 120px;
`
const MapKey = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
z-index: 10;
bottom: 0;
position: fixed;
margin-right: ${props => 2 * props.margin}%;
background-color: white;
width: ${props => 100 - (4 * props.margin)}%;

`
const Tile = styled.div`
box-sizing: border-box;
float: left;
display: inline-block;
position: relative;
margin: ${props => Math.round(10000 * props.padding)/10000}%;
width: ${props => Math.round(10000 * props.padding)/1000}% ;
background-color: ${props => props.BGcolor};
border: 1px solid black;
:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

`
function PickSeat() {
    let seatCount = useSelector(showChoice).count;
    let near = useSelector(showChoice).near;
    let seatsArray = useSelector(showSeats).seats;
    let longestRow = useSelector(showSeats).longestRow;
    const dispatch = useDispatch();
    let history = useHistory();

    const initializer = new HelperInitializer(seatCount,near,seatsArray,longestRow);
    const helper = initializer.initializeForUserChoice(seatCount,near);
    helper.setRecommendedSeats();


    function handleSelect({cordx,cordy},value){
        if(value === true ){
            if(helper.picksLeft>0)
                dispatch(select({x:cordx,y:cordy}));
            else alert("zarezerwowałeś wszystkie miejsca");
        }
        else{
            dispatch(deselect({x:cordx,y:cordy}));
        }
    }

    let marginPercent = Math.floor(100/(12 * longestRow)*100)/100;
    let SeatList = helper.seatsMatrix.map(row=>row.map((seat)=>{
       return <Seat handleSelect={handleSelect} marginValue={marginPercent} key={seat.id} seat={seat} />
    }))
    function goToSummary(){
        if(helper.picksLeft === 0){
            dispatch(registerSeats())
            history.push("/summary");
        }
        else alert("nie wybrałeś wszystkich miejsc")
    }
    return (
        <ViewWrapper margin={marginPercent} >
            <CinemaWrapper margin={marginPercent} width="100%">
                {SeatList}
            </CinemaWrapper>
            <MapKey margin={marginPercent}>
                <Tile padding={marginPercent} BGcolor={"white"}></Tile>
                <span>Miejsca dostepne</span>
                <Tile padding={marginPercent} BGcolor={"#474747"}></Tile>
                <span>Miejsca zarezerwowane</span>
                <Tile padding={marginPercent} BGcolor={"#ff8a05"}></Tile>
                <span>Twój wybór</span>
                <GigaButton onClick={()=>goToSummary()} margin={marginPercent}>Rezerwuj</GigaButton>
            </MapKey>
        </ViewWrapper>
    )
}
export default PickSeat