// @refresh reload
import { Show, Suspense, createSignal } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Link,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import {Index} from "./routes";
import { Toaster } from "solid-toast";

export const [model_open, set_model_open] = createSignal(false)
export default function Root() {
  return (
    <Html lang="en" class="bg-[url(/img/bg.jpg)] bg-cover bg-repeat-round p-16 bg-fixed">
      <Head>
        <Link rel="preconnect" href="https://fonts.googleapis.com" />
        <Link rel="preconnect" href="https://fonts.gstatic.com" />
        <Link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
        <Title>OPTC Legends Checklist</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
              <Toaster/>
              <Index />
          </ErrorBoundary>
        </Suspense>
        <Scripts />
          
        <script async defer src="https://buttons.github.io/buttons.js"></script>
      </Body>
    </Html>
  );
}
