import './App.css';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from 'react-query';
import featuresSlice from "./features/featuresSlice"
import AppRoutes from './appRoutes';
import ErrorBoundary from './services/errorBoundary ';

// Create a client
const queryClient = new QueryClient();

const myStore = configureStore({
  reducer: {
    //  for darkMode and favorites
    featuresSlice,
  }
})

function App() {
  return (
    <Provider store={myStore}>
      <QueryClientProvider client={queryClient} >
        {/* Wrap the AppRoutes component with the ErrorBoundary */}
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <AppRoutes />
        </ErrorBoundary>
      </QueryClientProvider>
    </Provider>
  )
}

export default App;
