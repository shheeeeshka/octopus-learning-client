import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";

import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/Router/AppRouter";

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;