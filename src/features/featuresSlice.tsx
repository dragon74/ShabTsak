import { createSlice } from "@reduxjs/toolkit";

const initValue = {
    darkMode: false,

}

const featuresSlice = createSlice({
    name: "featuresSlice",
    initialState: initValue,
    reducers: {
        //darkMode 
        changeDarkMode: (state) => {
            state.darkMode = !(state.darkMode)
        }
    }
})

export const { changeDarkMode } = featuresSlice.actions;
export default featuresSlice.reducer;