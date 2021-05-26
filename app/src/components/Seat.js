import React from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { setChoice, showChoice} from '../features/userChoiceSlice'
import { fetchSeatsAsync} from "../features/seatsSlice";

function Seat(props) {

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
export default Seat