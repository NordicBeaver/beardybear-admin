import React from 'react';
import styled from 'styled-components/macro';

const SidebarItem = styled.li`
  font-size: 1.2em;
  text-transform: uppercase;
  margin-bottom: 1em;
`;

export default function Sidebar() {
  return (
    <ul>
      <SidebarItem>Barbers</SidebarItem>
      <SidebarItem>Services</SidebarItem>
    </ul>
  );
}
