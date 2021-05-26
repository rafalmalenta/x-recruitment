import React from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { setChoice, showChoice} from '../features/userChoiceSlice'
import { fetchSeatsAsync} from "../features/seatsSlice";

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
            dispatch(fetchSeatsAsync());
            history.push("/pickseat");
        }

    }

    return (
        <form action="pickseat" name="pickseat">
            <label>
            Liczba miejsc <input name="count" type="text" />
            </label>
            <label>
                <input name="near" type="checkbox"/> Czy miejsca mają być obok siebie?
            </label>
            <button onClick={()=>goToSeats()} type="button">Wybierz miejsca</button>

        </form>
    )
}
export default Form