import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import AppointmentsPage from './components/appointments/AppointmentsPage';
import NewAppointmentPage from './components/appointments/NewAppointmentPage';
import { useAuth } from './components/auth/AuthContext';
import LoginFormPage from './components/auth/LoginFormPage';
import BarberPage from './components/barbers/BarberPage';
import BarbersPage from './components/barbers/BarbersPage';
import NewBarberPage from './components/barbers/NewBarberPage';
import BarberServicePage from './components/barberServices/BarberServicePage';
import BarberServicesPage from './components/barberServices/BarberServicesPage';
import NewBarberServicePage from './components/barberServices/NewBarberServicePage';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import NewUserPage from './components/users/NewUserPage';
import UsersPage from './components/users/UsersPage';

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

const FullPageContainer = styled.div`
  grid-area: 2 / 1 / 3 / 3;
`;

export default function AppContent() {
  const auth = useAuth()!;
  const history = useHistory();

  if (auth.token == null) {
    history.push('/login');
  }

  return (
    <AppStyled>
      <HeaderContainer>
        <Header></Header>
      </HeaderContainer>

      <Switch>
        <Route path="/login">
          <FullPageContainer>
            <LoginFormPage></LoginFormPage>
          </FullPageContainer>
        </Route>
        <Route>
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
              <Route path="/users/new">
                <NewUserPage></NewUserPage>
              </Route>
              <Route path="/users">
                <UsersPage></UsersPage>
              </Route>
            </Switch>
          </ContentContainer>
        </Route>
      </Switch>
    </AppStyled>
  );
}
