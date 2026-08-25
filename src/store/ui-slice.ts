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
