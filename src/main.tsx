// import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./context/auth";
import "./index.css";
// import React from "react";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import React from "react";

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Retry failed queries twice
      staleTime: 5 * 60 * 1000, // Default stale time of 5 minutes
    },
  },
});

// Create a new router instance with auth context
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  context: {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    auth: undefined!, // Will be set by AuthProvider
    queryClient, // Pass QueryClient to routes if needed
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <AuthProvider>
      {/* <RouterProvider router={router} /> */}
      <InnerApp/>
    </AuthProvider>
   
  );
}
// biome-ignore lint/style/noNonNullAssertion: <explanation>
const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

// Render the app
// const rootElement = document.getElementById("root");
// if (rootElement && !rootElement.innerHTML) {
//   const root = ReactDOM.createRoot(rootElement);
//   root.render(
//     <StrictMode>
//       <QueryClientProvider client={queryClient}>
//         <AuthProvider>
//           <RouterProvider router={router} />
//         </AuthProvider>
//       </QueryClientProvider>
//     </StrictMode>
//   );
// }
