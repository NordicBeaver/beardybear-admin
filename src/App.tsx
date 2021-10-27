import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './AppContent';
import { AuthProvider } from './components/auth/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <AppContent></AppContent>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
