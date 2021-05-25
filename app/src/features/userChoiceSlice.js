import { createSlice }  from '@reduxjs/toolkit';

const initialState = {
    count: null,
    near: null,
};

export const userChoiceSlice = createSlice({
    name: 'userChoiceState',
    initialState,
    reducers: {
        setChoice: (state, action) => {
            state.count = action.payload.count;
            state.near = action.payload.near;
        },
    },

});
export const { setChoice } = userChoiceSlice.actions;

export const showChoice = (state) => {
    return state.userChoice;
}

export default userChoiceSlice.reducer;
