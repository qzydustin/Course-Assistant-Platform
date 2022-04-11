import { createSlice } from '@reduxjs/toolkit'

const pageContent = {
    'Front page': [
        { id: 'Content', value: true },
        { id: 'Content1', value: false },
        { id: 'CreatCourse', value: false },
        { id: 'SearchCourse', value: false },
    ],
    'Switch 1': [
        { id: 'Content', value: false},
        { id: 'Content1', value: true},
        { id: 'CreatCourse', value: false },
        { id: 'SearchCourse', value: false },
    ],
    'Create Course': [
        { id: 'Content', value: false},
        { id: 'Content1', value: false},
        { id: 'CreateCourse', value: true },
        { id: 'SearchCourse', value: false },
    ],
    'Course Enroll': [
        { id: 'Content', value: false},
        { id: 'Content1', value: false},
        { id: 'CreatCourse', value: false },
        { id: 'SearchCourse', value: true },
    ],
}

export const contentsSlice = createSlice({
    name: 'contentsController',
    initialState: {
        isContentShown: false,
        isContent1Shown: false,
        isCreateCourseShown: false,
        isSearchCourseShown: false,
    },
    reducers: {
        toFrontPage: (state) => {
            state.isContentShown = pageContent["Front page"][0].value;
            state.isContent1Shown = pageContent["Front page"][1].value;
            state.isCreateCourseShown = pageContent["Front page"][2].value;
            state.isSearchCourseShown = pageContent["Front page"][3].value;
        },
        toSwitch1: (state) => {
            state.isContentShown = pageContent["Switch 1"][0].value;
            state.isContent1Shown = pageContent["Switch 1"][1].value;
            state.isCreateCourseShown = pageContent["Switch 1"][2].value;
            state.isSearchCourseShown = pageContent["Switch 1"][3].value;
        },
        toCreateCourse: (state) => {
            state.isContentShown = pageContent["Create Course"][0].value;
            state.isContent1Shown = pageContent["Create Course"][1].value;
            state.isCreateCourseShown = pageContent["Create Course"][2].value;
            state.isSearchCourseShown = pageContent["Create Course"][3].value;
        },
        toCourseEnroll: (state) => {
            state.isContentShown = pageContent["Course Enroll"][0].value;
            state.isContent1Shown = pageContent["Course Enroll"][1].value;
            state.isCreateCourseShown = pageContent["Course Enroll"][2].value;
            state.isSearchCourseShown = pageContent["Course Enroll"][3].value;
        },
    }
})

// Action creators are generated for each case reducer function
export const { toFrontPage, toSwitch1, toCreateCourse, toCourseEnroll } = contentsSlice.actions

// export const selectController = (state) => state.contentsController.isContent1Shown

export default contentsSlice.reducer