import { combineReducers } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";
import userSlice from "./userSlice";

export default combineReducers({
    home: homeSlice,
    auth: userSlice
})