import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./slices/SpellSlices";

const store = configureStore({
    reducer,
    devTools: true,
});

export default store;