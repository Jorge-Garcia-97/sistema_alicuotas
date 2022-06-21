import React from "react";
import { AppRouter } from "./routes/AppRouter";
import { Provider } from "react-redux";
import { store } from "./reducer/store";

export const SagAPP = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
