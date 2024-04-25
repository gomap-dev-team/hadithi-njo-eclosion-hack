import { Inter } from "next/font/google";
import Hero from "@/components/Hero";
import Home from "@/components/Home";
import Page from "@/components/layouts/Page";

const inter = Inter({ subsets: ["latin"] });

export default function home() {
  return (
    <main className={inter.className}>
      <Page>
        <Home />
      </Page>
    </main>
  );
}
