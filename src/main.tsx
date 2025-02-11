import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import ErrorBoundary from "./components/error-boundary";
import "./index.css";

window.onerror = function (message, source, lineno, colno, error) {
  console.error("Global error:", {
    message,
    source,
    lineno,
    colno,
    error,
  });
  return true; // Prevents the default white screen
};

window.addEventListener("unhandledrejection", function (event) {
  console.error("Unhandled promise rejection:", event.reason);
  event.preventDefault();
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
