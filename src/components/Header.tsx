import React from 'react';
import styled from 'styled-components/macro';

const HeaderStyled = styled.div`
  padding: 1.4em 1.7em;
  border-bottom: 2px solid #ffe8b0;
`;

const Logo = styled.span`
  color: #ffe9b0;
  font-size: 1.3em;
`;

export default function Header() {
  return (
    <HeaderStyled>
      <Logo>BeardyBear</Logo>
    </HeaderStyled>
  );
}
