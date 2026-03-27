// src/hooks/useItemsPerPage.ts
import { useState, useEffect } from 'react';

export const useItemsPerPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState(9);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
        // Телефон: 4 карточки
        setItemsPerPage(4);
      } else if (width < 1024) {
        // Планшет: 8 карточек
        setItemsPerPage(8);
      } else {
        // Десктоп: 9 карточек
        setItemsPerPage(9);
      }
    };

    updateItemsPerPage();
    
    window.addEventListener('resize', updateItemsPerPage);
    
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  return itemsPerPage;
};