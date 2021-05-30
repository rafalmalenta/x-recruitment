import React from "react";
import styled  from 'styled-components';
import { showSeats} from "../features/seatsSlice";
import {useSelector} from "react-redux";

const Wrapper = styled.div`
margin-left: 20px;
>*{
    margin-top: 30px;
    margin-bottom: 30px;
}
`
const List = styled.ul`
font-size: 22px;
`

function Summary(props) {
    let registered = useSelector(showSeats).registered;
    const LIST= registered.map((seat,index)=>{
        return <li key={index}>rząd {seat.cords.x}, miejsce {seat.cords.y} ({seat.id})</li>
    })
    return(
        <Wrapper>
            <h2>Twoja rezerwacja przebiegła pomyślnie</h2>
            <List>Wybrałeś miejsca:
                {LIST}
            </List>
            <h2>Dziękujemy! W razie problemów prosimy o kontakt z działem administracji.</h2>
        </Wrapper>
    )
}

export default Summary;