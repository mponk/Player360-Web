// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import "./index.css";

// 👇 import React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// bikin 1 client global
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* provide Auth first or after QueryClientProvider? urutannya bebas
       selama keduanya ng-wrap <App />.
       Kita pakai QueryClientProvider luar -> AuthProvider -> BrowserRouter */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
