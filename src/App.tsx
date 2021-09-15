import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components/macro';
import BarbersPage from './components/BarbersPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const AppStyled = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr 3fr;
  background-color: #141414;
  color: #ffffff;
`;

const HeaderContainer = styled.div`
  grid-area: 1 / 1 / 2 / 3;
`;

const SidebarContainer = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  padding: 2em;
`;

const ContentContainer = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  padding: 2em;
`;

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppStyled>
        <HeaderContainer>
          <Header></Header>
        </HeaderContainer>
        <SidebarContainer>
          <Sidebar></Sidebar>
        </SidebarContainer>
        <ContentContainer>
          <BarbersPage></BarbersPage>
        </ContentContainer>
      </AppStyled>
    </QueryClientProvider>
  );
}

export default App;
