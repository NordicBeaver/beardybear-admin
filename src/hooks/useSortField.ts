import { useState } from 'react';

type SortOrder = 'asc' | 'desc';

export function useSortField<FieldType>(initialField: FieldType, initialOrder: SortOrder = 'asc') {
  const [sortField, setSortField] = useState<FieldType>(initialField);
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialOrder);

  const updateSorting = (newSortField: FieldType) => {
    if (newSortField === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(newSortField);
      setSortOrder('asc');
    }
  };

  return { sortField, sortOrder, updateSorting };
}
