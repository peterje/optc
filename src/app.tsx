import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, ErrorBoundary } from "solid-js";
import { Toaster } from "solid-toast";
import "./app.css";

export default function App() {
  return (
    <Router
      root={props => (
        <>
          <Suspense>
            <ErrorBoundary fallback={err => <div class="error">An error occurred: {err.toString()}</div>}>
              {props.children}
            </ErrorBoundary>
          </Suspense>
          <Toaster />
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
