import React, { useEffect } from "react";

const useAutofill = (
  onAutofill: () => void,
  isActive: boolean,
  focused: boolean
) => {
  useEffect(() => {
    if (!isActive || !focused) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault();
        onAutofill();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onAutofill, isActive]);
};

export default useAutofill;
