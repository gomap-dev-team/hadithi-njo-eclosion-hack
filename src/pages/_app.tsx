import { ThemeProvider } from "@/components/layouts/ThemeProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="dark">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
