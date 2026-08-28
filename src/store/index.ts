import { configureStore } from "@reduxjs/toolkit";
import { selectionReducer } from "./selection-slice";
import uiSlice from "./ui-slice";
import { filtersReducer } from "./filters-slice";
import { geoSlice } from "./geolocation-slice";
import { spatialFilterReduce } from "./spatial-filter-slice";

export const store = configureStore({
  reducer: {
    selection: selectionReducer,
    ui: uiSlice,
    geolocation: geoSlice,
    filters: filtersReducer,
    spatialFilter: spatialFilterReduce,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
