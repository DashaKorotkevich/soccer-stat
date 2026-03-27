// src/hooks/useItemsPerPage.ts
import { useState, useEffect } from 'react';

interface ItemsPerPageConfig {
  mobile: number;    // < 768px
  tablet: number;    // 768px - 1024px
  desktop: number;   // > 1024px
}

const DEFAULT_CONFIG: ItemsPerPageConfig = {
  mobile: 4,
  tablet: 8,
  desktop: 9
};

export const useItemsPerPage = (config: ItemsPerPageConfig = DEFAULT_CONFIG) => {
  const [itemsPerPage, setItemsPerPage] = useState(config.desktop);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
        setItemsPerPage(config.mobile);
      } else if (width < 1024) {
        setItemsPerPage(config.tablet);
      } else {
        setItemsPerPage(config.desktop);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, [config.mobile, config.tablet, config.desktop]);

  return itemsPerPage;
};