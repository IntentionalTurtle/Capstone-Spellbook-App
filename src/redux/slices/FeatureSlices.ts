import { createSlice } from '@reduxjs/toolkit'

const rootSlice = createSlice({
    name: "root", //required
    initialState: { //required
        id: "id",
        url: "URL",
        name: "Name",
        level: "Level",
        classes: "Classes",
        desc: "Description"
    },
    reducers: {
        //action is submitted elsewhere - written to state.first
        chooseFeatureID: (state, action) => { state.id = action.payload},
        chooseFeatureURL: (state, action) => { state.url = action.payload},
        chooseFeatureName: (state, action) => { state.name = action.payload}, 
        chooseFeatureLevel: (state, action) => { state.level = action.payload},
        chooseFeatureClasses: (state, action) => { state.classes = action.payload},
        chooseFeatureDescription: (state, action) => { state.desc= action.payload},
              
    }
})

export const reducer = rootSlice.reducer;
export const { chooseFeatureID, chooseFeatureURL, chooseFeatureName, chooseFeatureLevel, chooseFeatureClasses, chooseFeatureDescription} = rootSlice.actions