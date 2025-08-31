
import {  Routes, Route, Navigate } from "react-router-dom";
import { useState, type JSX } from "react";
import "./App.css";
import Layout from "./components/Layout";
import UserManagement from "./page/userManagement";
import Login from './page/login'

import {useAuth} from "./hooks/useAuth"



interface ProtectedRouteProps {
  children: JSX.Element;
  isAuthenticated: boolean;
  onLogut:()=>void
}
function ProtectedRoute({ children, isAuthenticated,onLogut }: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
  <Layout onLogout={onLogut}>
   {children}
  </Layout>
  )
  
}

function App() {
  const auth = useAuth();

  return (
    
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login onLogin={auth.login} />} />

        {/* Protected Routes */}
        <Route
          path="/users"
          element={
            <ProtectedRoute onLogut={auth.logout} isAuthenticated={auth.isAuthenticated}>
              <UserManagement />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    
  );
}


export default App
