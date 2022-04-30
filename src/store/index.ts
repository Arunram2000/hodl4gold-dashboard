import { configureStore } from "@reduxjs/toolkit";

import { eventsApi } from "./services/eventsApi";
import { prizesApi } from "./services/prizesApi";

export default configureStore({
  reducer: {
    [eventsApi.reducerPath]: eventsApi.reducer,
    [prizesApi.reducerPath]: prizesApi.reducer,
  },
});
