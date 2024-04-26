import { ThemeProvider } from "@/components/layouts/ThemeProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="dark">
      <NextNProgress />
      <Toaster />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
