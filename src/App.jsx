import './App.css'
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import featuresSlice from "./features/featuresSlice"
import AppRoutes from './appRoutes';


export const myStore = configureStore({
  reducer: {
    //  for darkMode and favorites
    featuresSlice,
  }
})

function App() {
  return (
    <Provider store={myStore}>
      <AppRoutes />
    </Provider>
  )
}

export default App
