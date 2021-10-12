import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components/macro';
import BarbersPage from './components/barbers/BarbersPage';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BarberServicesPage from './components/barberServices/BarberServicesPage';
import NewBarberPage from './components/barbers/NewBarberPage';
import BarberPage from './components/barbers/BarberPage';
import NewBarberServicePage from './components/barberServices/NewBarberServicePage';
import BarberServicePage from './components/barberServices/BarberServicePage';
import AppointmentsPage from './components/appointments/AppointmentsPage';
import NewAppointmentPage from './components/appointments/NewAppointmentPage';

const AppStyled = styled.div`
  min-height: 100vh;
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
      <Router>
        <AppStyled>
          <HeaderContainer>
            <Header></Header>
          </HeaderContainer>
          <SidebarContainer>
            <Sidebar></Sidebar>
          </SidebarContainer>
          <ContentContainer>
            <Switch>
              <Route path="/barbers/new">
                <NewBarberPage></NewBarberPage>
              </Route>
              <Route path="/barbers/:id">
                <BarberPage></BarberPage>
              </Route>
              <Route path="/barbers">
                <BarbersPage></BarbersPage>
              </Route>
              <Route path="/services/new">
                <NewBarberServicePage></NewBarberServicePage>
              </Route>
              <Route path="/services/:id">
                <BarberServicePage></BarberServicePage>
              </Route>
              <Route path="/services">
                <BarberServicesPage></BarberServicesPage>
              </Route>
              <Route path="/appointments/new">
                <NewAppointmentPage></NewAppointmentPage>
              </Route>
              <Route path="/appointments">
                <AppointmentsPage></AppointmentsPage>
              </Route>
            </Switch>
          </ContentContainer>
        </AppStyled>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
