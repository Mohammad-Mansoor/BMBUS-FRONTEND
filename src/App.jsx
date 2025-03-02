import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import Layout from "./layouts/components/layout"; // Your sidebar layout
import { Provider } from "react-redux";
import store from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NetworkListener from "./utils/networkListener";
import { ToastContainer } from "react-toastify";

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        retry: 2,
        refetchOnMount: true,
        refetchOnReconnect: true,
      },
      mutations: {
        retry: 2,
      },
    },
  });

  return (
    <Router>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <ToastContainer
                position="top-right" // Position of the toast
                autoClose={3000} // Time in milliseconds before the toast auto-closes
                hideProgressBar={false} // Show/hide the progress bar
                newestOnTop={false} // Display new toasts on top
                closeOnClick // Close the toast when clicked
                rtl={false} // Right-to-left support
                pauseOnFocusLoss // Pause toast when the window loses focus
                draggable // Allow dragging the toast
                pauseOnHover // Pause the timer when hovering over the toast
                theme="light" // Theme options: 'light', 'dark', 'colored'
                limit={3} // Limit the number of toasts shown at the same time
              />
              <NetworkListener />
              <Routes>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </Provider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Suspense>
      </Layout>
    </Router>
  );
}
