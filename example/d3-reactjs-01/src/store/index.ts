import { configureStore } from '@reduxjs/toolkit '
import globalSlice from './globalSlice'

const store = configureStore({
  reducer: {
    global_slice: globalSlice
  }
})

export default store