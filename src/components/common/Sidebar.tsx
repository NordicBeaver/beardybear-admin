import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

const SidebarItem = styled.li`
  font-size: 1.2em;
  text-transform: uppercase;
  margin-bottom: 1em;
`;

export default function Sidebar() {
  return (
    <ul>
      <SidebarItem>
        <Link to="/barbers">Barbers</Link>
      </SidebarItem>
      <SidebarItem>
        <Link to="/services">Services</Link>
      </SidebarItem>
      <SidebarItem>
        <Link to="/appointments">Appointments</Link>
      </SidebarItem>
    </ul>
  );
}
