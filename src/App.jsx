import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Scan from './pages/Scan';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { getCurrentUser } from './services/auth';

const PrivateRoute = ({ children }) => {
  return getCurrentUser() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/scan" element={
            <PrivateRoute>
              <Scan />
            </PrivateRoute>
          } />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
