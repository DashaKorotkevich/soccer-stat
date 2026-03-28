// src/hooks/usePagination.ts
import { useState, useMemo, useEffect } from 'react';
import { League, Team, Match } from '@/types';

export type SearchableItem = League | Team | Match;

export const usePagination = <T extends SearchableItem>(
  items: T[],
  itemsPerPage: number,
  searchQuery: string
) => {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;

    const query = searchQuery.toLowerCase();
    return items.filter((item) => {
      // Для League
      if ('name' in item && item.name?.toLowerCase().includes(query)) return true;
      if ('area' in item && item.area?.name?.toLowerCase().includes(query)) return true;
      if ('code' in item && item.code?.toLowerCase().includes(query)) return true;

      // Для Team
      if ('crest' in item && item.name?.toLowerCase().includes(query)) return true;

      // Для Match
      if ('homeTeam' in item && item.homeTeam?.name?.toLowerCase().includes(query)) return true;
      if ('awayTeam' in item && item.awayTeam?.name?.toLowerCase().includes(query)) return true;

      return false;
    });
  }, [items, searchQuery]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return {
    currentPage,
    totalPages,
    currentItems,
    setCurrentPage,
    totalItems: filteredItems.length,
  };
};
