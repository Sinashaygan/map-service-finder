import { DrawnShape, SpatialFilterState } from "@/features/service-finder/model/type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: SpatialFilterState = {
  drawnShape: null,
  isShapeFilterEnabled: false,
};

export const spatialFilterSlice = createSlice({
  name: "spatialFilter",
  initialState,
  reducers: {
    setDrawnShape(state, action: PayloadAction<DrawnShape>) {
      state.drawnShape = action.payload;
      state.isShapeFilterEnabled = true;
    },
    clearDrawnShape(state) {
      state.drawnShape = null;
      state.isShapeFilterEnabled = false;
    },
    toggleShapeFilter(state) {
      state.isShapeFilterEnabled = !state.isShapeFilterEnabled;
    },
  },
});

export const { setDrawnShape, clearDrawnShape, toggleShapeFilter } =
  spatialFilterSlice.actions;

export default spatialFilterSlice.reducer;
