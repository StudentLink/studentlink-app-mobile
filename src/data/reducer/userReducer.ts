import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: null,
        username: null,
        password: null,
        email: null,
        localisations: [],
        schoolId: null,
    },
    reducers: {
        updateUser: (state, action) => ({
            ...state,
            ...action.payload
        })
    },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;