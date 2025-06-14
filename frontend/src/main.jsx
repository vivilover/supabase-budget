import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";

const root = document.getElementById("root");

createRoot(root).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
