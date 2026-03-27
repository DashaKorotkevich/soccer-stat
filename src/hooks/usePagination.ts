// src/hooks/usePagination.ts
import { useState, useMemo, useEffect } from 'react';

export const usePagination = (items: any[], itemsPerPage: number, searchQuery: string) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Фильтрация по поиску (если есть поисковый запрос)
  const filteredItems = useMemo(() => {
    if (!searchQuery) {
      return items;
    }
    
    const query = searchQuery.toLowerCase();
    return items.filter(item => 
      item.name?.toLowerCase().includes(query) ||
      item.area?.name?.toLowerCase().includes(query) ||
      item.code?.toLowerCase().includes(query)
    );
  }, [items, searchQuery]);

  // Расчет пагинации
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  // Сброс на первую страницу при изменении поиска
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return {
    currentPage,
    totalPages,
    currentItems,
    setCurrentPage,
    totalItems: filteredItems.length
  };
};