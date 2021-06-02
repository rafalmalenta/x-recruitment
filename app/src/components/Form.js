import React from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { setChoice } from '../features/userChoiceSlice'
import { fetchSeatsAsync} from "../features/seatsSlice";
import styled from "styled-components";
import checkImage from '../../src/check.png'
const FORM= styled.form`
position: relative;
max-width: 280px;
margin: 0 auto;
padding-top: 20%;
display: block;
label{
margin-top: 20px;
margin-bottom: 20px;
display: block;
width: 100%;
}
button{
background-color: white;
height: 3em;
width:100%;
border-radius: 0px 0px 0px 0px;
border: 1px solid black;
}
`
const TEXT = styled.input`
border-radius: 0px 0px 0px 0px;
border: 1px solid black;
max-width: 50%;
right: 0px;
position: absolute;
`
const CheckBox = styled.input`
appearance: none;
:after{    
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    border: 1px solid black;
}
:checked{
    :after {
        overflow: visible;
        border: 0px;       
        background-image :url(${checkImage});
        background-size: 16px 16px;
    }
}

`
function Form() {
    const dispatch = useDispatch();
    let history = useHistory();
    const goToSeats = ()=>{
        let inputValue = document.querySelector("input[name='count']").value;
        let reg = /^(?:[1-9]\d*|\d)$/;
        if(!reg.test(inputValue)){
            alert("proszę podaj liczbę całkowitą");
        }
        else {
            let near = document.querySelector("input[name='near']").checked ? true : false;
            dispatch(setChoice({count:inputValue,near}));
            dispatch(fetchSeatsAsync([inputValue,near]));
            history.push("/pickseat");
        }

    }

    return (
        <FORM action="pickseat" name="pickseat">
            <label>
            Liczba miejsc <TEXT name="count" type="text" />
            </label>
            <label>
                <CheckBox name="near" type="checkbox"/> Czy miejsca mają być obok siebie?
            </label>
            <button onClick={()=>goToSeats()} type="button">Wybierz miejsca</button>

        </FORM>
    )
}
export default Form