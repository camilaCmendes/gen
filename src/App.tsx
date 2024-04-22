import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { defaultTheme } from "./styles/themes/default";
import "./styles/global.css";
import { AuthContextProvider } from "./contexts/authContext";
import { ToastProvider } from "./contexts/toastContext";

export function App() {
  return (
    <MUIThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <AuthContextProvider>
          <ToastProvider>
            <Router />
          </ToastProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </MUIThemeProvider>
  );
}
