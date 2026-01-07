import { createSlice } from "@reduxjs/toolkit";


const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => action.payload,
        removeUserFromFeed: (state, action) => {
            const newArray = state.filter(user => user._id !== action.payload)
            return newArray;
        },
        removeAllFeed: (state, action) => null,
    },
});

export default feedSlice.reducer;
export const { addFeed, removeUserFromFeed, removeAllFeed } = feedSlice.actions; 