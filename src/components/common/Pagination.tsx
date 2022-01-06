import React from 'react';

function PageSkip() {
  return <li>...</li>;
}

export interface PaginationProps {
  pagesCount: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
}
export default function Pagination({ pagesCount, currentPage, onPageChange }: PaginationProps) {
  function PageButton(pagenum: number) {
    return (
      <li>
        <button onClick={() => onPageChange?.(pagenum)}>{pagenum}</button>
      </li>
    );
  }

  const pages: JSX.Element[] = [];

  if (currentPage <= 2) {
    for (let i = 1; i < currentPage; i++) {
      pages.push(PageButton(i));
    }
  } else {
    pages.push(PageButton(0));
    pages.push(PageSkip());
    pages.push(PageButton(currentPage - 1));
  }

  pages.push(PageButton(currentPage));

  if (currentPage >= pagesCount - 2) {
    for (let i = currentPage + 1; i <= pagesCount; i++) {
      pages.push(PageButton(i));
    }
  } else {
    pages.push(PageButton(currentPage + 1));
    pages.push(PageSkip());
    pages.push(PageButton(pagesCount));
  }

  return <ul>{pages}</ul>;
}
