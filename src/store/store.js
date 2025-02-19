// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import storeAuth from './Auth'
import storeCompany from './Company'


export const store = configureStore({
    reducer: {
        storeAuth,
        storeCompany
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export default store