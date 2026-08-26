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
    setSelectedService(state, action: PayloadAction<string | null>) {
      state.selectedServiceId = action.payload;
    },

    setHoveredService(state, action: PayloadAction<string | null>) {
      state.hoveredServiceId = action.payload;
    },

    clearSelection(state) {
      state.selectedServiceId = null;
      state.hoveredServiceId = null;
    },
  },
});

export const { clearSelection, setHoveredService, setSelectedService } =
  selectionSlice.actions;

export const selectionReducer = selectionSlice.reducer;
export default selectionReducer;
