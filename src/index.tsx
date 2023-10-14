import React from "react";
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux"; // Importe o Provider do React-Redux
import store from "./redux/store"; // Importe sua store Redux
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
