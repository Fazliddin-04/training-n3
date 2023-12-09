import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@emotion/react";
import theme from "@/theme";
import { store, persistor } from "@/store";

function Providers({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
}

export default Providers;
