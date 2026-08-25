import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SelectionState {
  selectedServiceId: string | null;
  hoveredServiceId: string | null;
}

const initialState: SelectionState = {
  selectedServiceId: null,
  hoveredServiceId: null,
};

const selectionSlice = createSlice({
  name: "selection",
  initialState,
  reducers: {
    selectService(state, action: PayloadAction<string | null>) {
      state.selectedServiceId = action.payload;
    },

    hoverService(state, action: PayloadAction<string | null>) {
      state.hoveredServiceId = action.payload;
    },

    clearSelection(state) {
      state.selectedServiceId = null;
      state.hoveredServiceId = null;
    },
  },
});

export const { clearSelection, hoverService, selectService } =
  selectionSlice.actions;

export default selectionSlice.reducer;
