import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from "../reducers/authReducer";
import { uiReducer } from "../reducers/uiReducer";

const store = configureStore({
  reducer: {
    // Define a top-level state field named `auth`, handled by `authReducer`
    auth: authReducer,
    ui: uiReducer,
  }
})

export default store

