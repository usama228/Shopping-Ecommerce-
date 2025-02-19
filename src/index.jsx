import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import * as serviceWorker from "./serviceWorker";
import App from "./app/App";
import { Provider } from "react-redux";
// third party style
import "perfect-scrollbar/css/perfect-scrollbar.css";
import store from "app/redux/store";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// for IE-11 support un-comment cssVars() and it's import in this file
// and in MatxTheme file

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
