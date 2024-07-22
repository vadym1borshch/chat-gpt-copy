import { useState, useEffect, useCallback } from "react";

interface WindowSize {
  width: number;
  height: number;
  freeWidth: number;
  freeHeight: number;
}

const useWindowSize = (
  usedHeight: number = 0,
  usedWidth: number = 0,
): WindowSize => {
  const isClient = typeof window === "object";

  const getSize = useCallback(
    () => ({
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0,
      freeWidth: isClient ? window.innerWidth - usedWidth : 0,
      freeHeight: isClient ? window.innerHeight - usedHeight : 0,
    }),
    [isClient, usedHeight, usedWidth],
  );

  const [windowSize, setWindowSize] = useState<WindowSize>(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [getSize, isClient, usedHeight, usedWidth]);

  return windowSize;
};

export default useWindowSize;
