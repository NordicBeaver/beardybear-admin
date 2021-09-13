import React from 'react';
import styled from 'styled-components/macro';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const AppStyled = styled.div`
  background-color: #141414;
  color: #ffffff;
`;

function App() {
  return (
    <AppStyled>
      <Header></Header>
      <Sidebar></Sidebar>
    </AppStyled>
  );
}

export default App;
