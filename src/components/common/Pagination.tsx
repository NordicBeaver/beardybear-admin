import React from 'react';
import styled from 'styled-components/macro';

const PaginationList = styled.ul`
  display: flex;
  gap: 1em;
`;

const PageButtonStyled = styled.button<{ isActive: boolean }>`
  background-color: ${(props) => (props.isActive ? '#ffffff' : 'transparent')};
  color: ${(props) => (props.isActive ? '#141414' : '#ffffff')};
  border: 1px solid #ffffff;
  min-width: 2em;
  min-height: 2em;
  cursor: ${(props) => (props.isActive ? 'default' : 'pointer')};
  font-size: 1em;
`;

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
        <PageButtonStyled isActive={pagenum === currentPage} onClick={() => onPageChange?.(pagenum)}>
          {pagenum}
        </PageButtonStyled>
      </li>
    );
  }

  const pages: JSX.Element[] = [];

  if (currentPage <= 2) {
    for (let i = 1; i < currentPage; i++) {
      pages.push(PageButton(i));
    }
  } else {
    pages.push(PageButton(1));
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

  return <PaginationList>{pages}</PaginationList>;
}
