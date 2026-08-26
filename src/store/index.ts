import { configureStore } from "@reduxjs/toolkit";
import { selectionReducer } from "./selection-slice";
import uiSlice from "./ui-slice";
import geoSlice from "./geo-slice";

export const store = configureStore({
  reducer: {
    selection: selectionReducer,
    ui: uiSlice,
    geo: geoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
