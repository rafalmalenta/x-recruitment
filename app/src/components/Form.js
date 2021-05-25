// import {fetchSeats} from "../features/fetchSeats";
// import cinemaHall from "../models/CinemaHall";
import React from "react";
function Form() {
    return (
        <form action="pickseat" name="pickseat">
            <label>
            Liczba miejsc <input type="number" />
            </label>
            <label>
                <input name="seatcount" type="checkbox"/> Czy miejsca mają być obok siebie?
            </label>
            <button type="submit">Wybierz miejsca</button>

        </form>
    )
}
export default Form