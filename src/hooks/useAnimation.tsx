import { useEffect, useState } from 'react';

const useAnimation = (isOpen: boolean, duration: number) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), duration);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return { isVisible };
};

export default useAnimation;
