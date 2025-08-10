import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";

import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/Router/AppRouter";
import { useEffect } from "react";
import { API_URL } from "./utils/constants";

const App = () => {
  useEffect(() => {
    fetch(API_URL).catch(() => {});
  }, []);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
