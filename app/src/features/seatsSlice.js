import { createAsyncThunk, createSlice }  from '@reduxjs/toolkit';
import { fetchSeats } from './fetchSeats';

const initialState = {
    status: 'idle',
    seats: [],
};

export const fetchSeatsAsync = createAsyncThunk(
    'seatsStore/fetchSeats',
    async () => {
        console.log("rr")
        const response = await fetchSeats();
        // The value we return becomes the `fulfilled` action payload
        await console.log("rr",response)
        return response;
    }
);

export const seatsSlice = createSlice({
    name: 'seatsState',
    initialState,
    reducers: {
        registerSeat: (state, action) => {
            state.seats[action.payload[0]][action.payload[1]].reserved += true ;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSeatsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSeatsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.seats = action.payload;
            })
            .addCase(fetchSeatsAsync.rejected,(state, action) =>{
                state.status = 'failed';
                state.seats = [];
            });
    },
});
export const { registerSeat } = seatsSlice.actions;

export const showSeats = (state) => {
    console.log("akk",state);
    return state.seats;
}

export default seatsSlice.reducer;
