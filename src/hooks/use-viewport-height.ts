import { useEffect, useLayoutEffect, useState } from "react";

const useViewportHeight = () => {
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (window.visualViewport) {
      setHeight(window.visualViewport.height);
    }
  }, []);

  useEffect(() => {
    const updateViewportHeight = () => {
      const viewportHeight = window.visualViewport?.height;
      if (viewportHeight) {
        setHeight(viewportHeight);
      }
    };

    window.visualViewport?.addEventListener("resize", updateViewportHeight);
  }, []);

  return height;
};

export default useViewportHeight;
