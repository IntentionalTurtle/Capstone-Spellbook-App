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
        classes: "Classes"
    },
    reducers: {
        //action is submitted elsewhere - written to state.first
        chooseSpellID: (state, action) => { state.id = action.payload},
        chooseSpellURL: (state, action) => { state.url = action.payload},
        chooseSpellName: (state, action) => { state.name = action.payload}, 
        chooseSpellLevel: (state, action) => { state.level = action.payload},
        chooseSpellCastingTime: (state, action) => { state.casting_time = action.payload},
        chooseSpellDuration: (state, action) => { state.duration = action.payload},
        chooseSpellClasses: (state, action) => { state.classes = action.payload},
              
    }
})

export const reducer = rootSlice.reducer;
export const { chooseSpellID, chooseSpellURL, chooseSpellName, chooseSpellLevel, chooseSpellCastingTime, chooseSpellDuration, chooseSpellClasses} = rootSlice.actions