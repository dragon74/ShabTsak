import React from 'react';
import AppRoutes from './appRoutes';
import ErrorBoundary from './services/errorBoundary ';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAuth } from "./hooks/useAuth.jsx";
import { AuthContext } from './context/AuthContext';
import './App.css';

const queryClient = new QueryClient();

function App() {
    /*
    While user state is undefined, the protected route will not render its children
    Instead, it will render null until user is set as null or a user object.
    */
    const [user, setUser] = React.useState(undefined);
    const { _user, ...auth } = useAuth();

    return (
        <AuthContext.Provider value={{...auth, user, setUser}}>
            <QueryClientProvider client={queryClient}>
                <ErrorBoundary fallback={<p>Something went wrong</p>}>
                    <AppRoutes/>
                </ErrorBoundary>
            </QueryClientProvider>
        </AuthContext.Provider>
    );
}


export default App;
