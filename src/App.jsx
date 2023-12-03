import React from "react";
import AppRoutes from "./AppRoutes";
import ErrorBoundary from "components/general_comps/ErrorBoundary.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from "./context/AuthContext";
import "./App.css";

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: Infinity } } });

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <AppRoutes />
        </ErrorBoundary>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
