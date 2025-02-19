import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { MatxTheme } from "./components";
import SettingsProvider from "./contexts/SettingsContext";
// ROUTES
import routes from "./routes";
// FAKE SERVER
import "../fake-db";
import { ProvideAuth } from "./contexts/AuthContext";

export default function App() {
  const content = useRoutes(routes);

  return (
    <ProvideAuth >
    <SettingsProvider>
      <MatxTheme>
        <CssBaseline />
        {content}
      </MatxTheme>
    </SettingsProvider>
    </ProvideAuth>
  );
}
