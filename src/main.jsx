import "./index.css";
import App from "./App.jsx";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AuthContextProvider } from "./context/AuthContext.jsx";
import { EducationContextProvider } from "./context/EducationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <EducationContextProvider>
        <App />
      </EducationContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);