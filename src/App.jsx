import './App.css'
import AppRoutes from '../appRoutes'
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import featuresSlice from "./features/featuresSlice"

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
