import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./assets/css/pages/login/login-1.css";
import "./assets/css/style.bundle.css";
import "./assets/css/themes/layout/header/base/light.css";
import "./assets/plugins/global/plugins.bundle.css";
import "./assets/css/themes/layout/header/menu/light.css";
import "./assets/css/themes/layout/brand/dark.css";
import "./assets/css/themes/layout/aside/dark.css";
import LoginUser from "./login";
import { Route, BrowserRouter } from "react-router-dom";

import "./index.scss"; // Standard version
import "./_assets/plugins/keenthemes-icons/font/ki.css";
import "socicon/css/socicon.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./_assets/plugins/flaticon/flaticon.css";
import "./_assets/plugins/flaticon2/flaticon.css";
import Home from "./home";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/" component={LoginUser} />
      <Route exact path="/home" component={Home} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
