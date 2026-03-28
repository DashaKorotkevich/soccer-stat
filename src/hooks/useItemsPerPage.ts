import { useState, useEffect } from 'react';

export const PAGINATION_PRESETS = {
  CARDS: { mobile: 4, tablet: 8, desktop: 9 },
  LIST: { mobile: 10, tablet: 15, desktop: 20 },
} as const;

export type PaginationPreset = keyof typeof PAGINATION_PRESETS;

export const useItemsPerPage = (preset: PaginationPreset = 'CARDS') => {
  const config = PAGINATION_PRESETS[preset];
  const [itemsPerPage, setItemsPerPage] = useState<number>(config.desktop);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;

      let newValue: number;
      if (width < 768) {
        newValue = config.mobile;
      } else if (width < 1024) {
        newValue = config.tablet;
      } else {
        newValue = config.desktop;
      }

      setItemsPerPage(newValue);
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, [config.mobile, config.tablet, config.desktop]);

  return itemsPerPage;
};
