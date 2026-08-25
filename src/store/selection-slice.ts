interface SelectionState {
  selectedServiceId: string | null;
  hoveredServiceId: string | null;
}

const inialState: SelectionState = {
  selectedServiceId: null,
  hoveredServiceId: null,
};
