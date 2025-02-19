"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import store from "../store/store";
import AuthGuard from "./components/AuthGuard";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={baselightTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Provider store={store}>
            <AuthGuard>
              {children}
              <Toaster position={'top-center'} toastOptions={{ className: 'react-hot-toast' }} />
            </AuthGuard>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
