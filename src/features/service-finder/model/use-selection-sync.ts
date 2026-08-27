"use client";

import { useEffect } from "react";
import type { Service } from "@/entities/service/model/types";
import { clearSelection } from "@/store/selection-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

/**
 * Clears the current map/list selection when the selected service
 * falls out of the filtered result set (e.g. a new category filter
 * removes the currently-selected marker). Prevents FlyToSelected from
 * silently targeting a hidden marker.
 */
export function useSelectionSync(services: Service[], isPending: boolean) {
  const dispatch = useAppDispatch();
  const selectedServiceId = useAppSelector(
    (state) => state.selection.selectedServiceId,
  );

  useEffect(() => {
    if (isPending || !selectedServiceId) return;
    const stillVisible = services.some((s) => s.id === selectedServiceId);
    if (!stillVisible) dispatch(clearSelection());
  }, [dispatch, isPending, selectedServiceId, services]);
}
