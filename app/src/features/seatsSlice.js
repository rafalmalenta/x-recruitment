import { createAsyncThunk, createSlice }  from '@reduxjs/toolkit';
import { fetchSeats } from './fetchSeats';
import CinemaHall from "../models/CinemaHall";
import PickHelper from "../services/PickHelper";

const initialState = {
    longestRow: 0,
    status: 'idle',
    seats: [],
    preRegisteredSeats: [],
};

export const fetchSeatsAsync = createAsyncThunk(
    'seatsStore/fetchSeats',
    async () => {
        const response = await fetchSeats();
        let Hall = new CinemaHall(response);
        Hall.fillArrayWithNullSeats();
        //console.log(Hall);
        return [Hall.seats,Hall.longestRow];
    }
);

export const seatsSlice = createSlice({
    name: 'seatsState',
    initialState,
    reducers: {
        registerSeats: (state, action) => {
            //     będe podawał w payloadzie tablice koordynatow dla wszystkich rejestrowanych miejsc
            //     w formie [[x],[y]],[[x],[y]], ...
            //     action.payload.forEach(cord =>{
            //         let index = findIndexOfSeatWithCords([cord[0],cord[1],]);
            //         state.seats[index[0]][index[1]].reserved += true ;
            //     });
            // },
        },
        prepareStateToMatchUserCondition: (state, action) => {
            let helper = new PickHelper(action.payload.count, action.payload.near, state.seats);
            state.seats = helper.initializeForUserChoice();
        },
        handleSelection: (state, action) => {
            state.seats[action.payload.x][action.payload.y].selected = true;
        }
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
export const { registerSeat,prepareStateToMatchUserCondition } = seatsSlice.actions;

export const showSeats = (state) => {
    return state.seats;
}

export default seatsSlice.reducer;
