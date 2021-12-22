import React, { PropsWithChildren } from 'react';
import { ArrowDown, ArrowUp } from 'react-feather';
import styled from 'styled-components/macro';

const TableHeaderContent = styled.span<{ sortable?: boolean }>`
  cursor: ${(props) => (props.sortable === true ? 'pointer' : 'default')};
`;

export interface TableHeaderProps {
  sortable?: boolean;
  sortOrder?: 'asc' | 'desc';
  onClick?: () => void;
}

export default function TableHeader({ children, sortable, sortOrder, onClick }: PropsWithChildren<TableHeaderProps>) {
  const arrow = sortOrder ? sortOrder === 'asc' ? <ArrowDown></ArrowDown> : <ArrowUp></ArrowUp> : null;
  return (
    <th>
      <TableHeaderContent sortable={sortable} onClick={onClick}>
        {children} {arrow}
      </TableHeaderContent>
    </th>
  );
}
