/* eslint-disable jsx-a11y/anchor-is-valid */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import ErrorBoundaryWrapper from "./components/common/reusable/ErrorBoundaryWrapper";
import StartupScreen from "./containers/StartupScreen";
import i18n from "./i18n/config";
const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}

      <ErrorBoundaryWrapper>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }}
        />
        <StartupScreen />
      </ErrorBoundaryWrapper>
    </QueryClientProvider>
  );
};

export default App;
