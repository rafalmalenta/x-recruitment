import { createAsyncThunk, createSlice }  from '@reduxjs/toolkit';
import { fetchSeats } from './fetchSeats';
import CinemaHall from "../models/CinemaHall";

const initialState = {
    longestRow: 0,
    status: 'idle',
    seats: [],
    registered: [],
};

export const fetchSeatsAsync = createAsyncThunk(
    'seatsStore/fetchSeats',
    async (userChoice) => {
        const response = await fetchSeats();
        let Hall = new CinemaHall(response);
        return [Hall.seatsMatrix, Hall.longestRow];
    }
);

export const seatsSlice = createSlice({
    name: 'seatsState',
    initialState,
    reducers: {
        registerSeats: (state, action) => {
           let selected = [];
           state.seats.forEach(row=>{
               row.forEach(seat=>{
                   if (seat.selected === true){
                       selected.push({...seat});
                       seat.reserved = true;
                       seat.selected = false;
                   }
               })
           })
        state.registered = selected;
        },
        select: (state, action) => {
            state.seats[action.payload.x][action.payload.y].selected = true;
        },
        deselect: (state, action) => {
            state.seats[action.payload.x][action.payload.y].selected = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSeatsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSeatsAsync.fulfilled, (state, action) => {

                state.status = 'finished';
                state.seats = action.payload[0];
                state.longestRow = action.payload[1];
            })
            .addCase(fetchSeatsAsync.rejected,(state, action) =>{
                state.status = 'failed';
                state.seats = [];
            });
    },
});
export const { registerSeats,select,deselect} = seatsSlice.actions;

export const showSeats = (state) => {
    return state.seats;
}
// export const showRegistered = (state) => {
//     return state.registered;
// }

export default seatsSlice.reducer;
