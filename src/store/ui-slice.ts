import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ViewMode = "map" | "list";

interface UiState {
  viewMode: ViewMode;
  isDetailsPanelOpen: boolean;
  isFilterPanelOpen: boolean;
}

const initialState: UiState = {
  viewMode: "map",
  isDetailsPanelOpen: false,
  isFilterPanelOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setViewMode(state, action: PayloadAction<ViewMode>) {
      state.viewMode = action.payload;
    },

    toggleDetailsPanel(state) {
      state.isDetailsPanelOpen = !state.isDetailsPanelOpen;
    },

    toggleFilterPanel(state) {
      state.isFilterPanelOpen = !state.isFilterPanelOpen;
    },
  },
});

export const { setViewMode, toggleDetailsPanel, toggleFilterPanel } =
  uiSlice.actions;

export default uiSlice.reducer;
