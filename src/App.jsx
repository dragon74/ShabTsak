import React from 'react';
import AppRoutes from './appRoutes'
import { useAuth } from "./hooks/useAuth.jsx";
import { AuthContext } from './context/AuthContext';
import './App.css'
function App() {
  const [user, setUser] = React.useState();
  const { _user, ...auth } = useAuth();

  return (
      <AuthContext.Provider value={{ ...auth, user, setUser }}>
        <AppRoutes />
      </AuthContext.Provider>
  );
}

export default App;
