import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit"
import rootReducer from "./rootReducer";

const listenerMiddlewareInstance = createListenerMiddleware({
  onError: () => console.error,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddlewareInstance.middleware),
});

export { store };