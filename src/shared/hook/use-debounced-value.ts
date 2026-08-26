import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value: T, debounceTime = 350): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), debounceTime);
    return () => clearTimeout(timeout);
  }, [value, debounceTime]);

  return debounced;
}
