// src/App.js

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import AppRouter from './AppRouter';
import ErrorBoundary from './ErrorBoundary';
import { UserProvider } from './utils/UserContext';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const App = () => (
  <Router>
    <AuthProvider>
      <ErrorBoundary>
        <UserProvider>
          <AppRouter />
        </UserProvider>
      </ErrorBoundary>
    </AuthProvider>
  </Router>
);

export default App;
