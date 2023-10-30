import React from 'react';
import AppRoutes from './appRoutes';
import ErrorBoundary from './services/errorBoundary ';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAuth } from "./hooks/useAuth.jsx";
import { AuthContext } from './context/AuthContext';
import featuresSlice from "./features/featuresSlice"
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import './App.css';

const queryClient = new QueryClient();
const myStore = configureStore({
  reducer: {
    //  for darkMode and favorites
    featuresSlice,
  }
})

function App() {
    const [user, setUser] = React.useState();
    const {_user, ...auth} = useAuth();

    return (
        <AuthContext.Provider value={{...auth, user, setUser}}>
            <Provider store={myStore}>
                <QueryClientProvider client={queryClient}>
                    {/* Wrap the AppRoutes component with the ErrorBoundary */}
                    <ErrorBoundary fallback={<p>Something went wrong</p>}>
                        <AppRoutes/>
                    </ErrorBoundary>
                </QueryClientProvider>
            </Provider>
        </AuthContext.Provider>
    );
}


export default App;
