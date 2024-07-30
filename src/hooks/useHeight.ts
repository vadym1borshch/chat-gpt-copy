import { useState, useEffect } from 'react';

const useWindowHeight = (): number => {
  const [height, setHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);

    window.addEventListener('resize', handleResize);

    // Очищення обробника події при розмонтуванні компонента
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return height;
};

export default useWindowHeight;