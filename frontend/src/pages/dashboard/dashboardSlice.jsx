import { createSlice } from '@reduxjs/toolkit'

const pageContent = {
    'Front page': [
        { id: 'Content', value: true},
        { id: 'Content1', value: false},
    ],
    'Switch 1': [
        { id: 'Content', value: false},
        { id: 'Content1', value: true},
    ],
}

export const contentsSlice = createSlice({
    name: 'contentsController',
    initialState: {
        // isContentShown: 0
        // isContentShown: false,
        isContent1Shown: false,
    },
    reducers: {
        toSwitch1: (state) => {
            // state.isContentShown = 1;
            state.isContent1Shown = true;
            // state.isContentShown = pageContent["Switch 1"][0].value;
            // state.isContent1Shown = pageContent["Switch 1"][0].value;
        },
    }
})

// Action creators are generated for each case reducer function
export const { toSwitch1 } = contentsSlice.actions

export const selectController = (state) => state.contentsController.isContent1Shown

export default contentsSlice.reducer