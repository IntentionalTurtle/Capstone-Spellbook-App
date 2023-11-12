import { createSlice } from '@reduxjs/toolkit'

const rootSlice = createSlice({
    name: "root", //required
    initialState: { //required
        id: "id",
        url: "URL",
        name: "Name",
        level: "Level",
        casting_time: "Casting Time",
        duration: "Duration",
        classes: "Classes",
        desc: "Description"
    },
    reducers: {
        //action is submitted elsewhere - written to state.first
        chooseID: (state, action) => { state.id = action.payload},
        chooseURL: (state, action) => { state.url = action.payload},
        chooseName: (state, action) => { state.name = action.payload}, 
        chooseLevel: (state, action) => { state.level = action.payload},
        chooseCastingTime: (state, action) => { state.casting_time = action.payload},
        chooseDuration: (state, action) => { state.duration = action.payload},
        chooseClasses: (state, action) => { state.classes = action.payload},
        chooseDescription: (state, action) => { state.desc= action.payload},
              
    }
})

export const reducer = rootSlice.reducer;
export const { chooseID, chooseURL, chooseName, chooseLevel, chooseCastingTime, chooseDuration, chooseClasses, chooseDescription} = rootSlice.actions