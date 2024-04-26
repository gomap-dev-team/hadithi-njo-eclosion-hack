import { Inter } from "next/font/google";
import Hero from "@/components/Hero";
import Home from "@/components/Home";
import Page from "@/components/layouts/Page";
import { GetServerSidePropsContext } from "next";
import { User, createPagesServerClient } from "@supabase/auth-helpers-nextjs";

const inter = Inter({ subsets: ["latin"] });

export default function home({ user }: { user: User }) {
  return (
    <main className={inter.className}>
      <Page user={user}>
        <Home />
      </Page>
    </main>
  );
}
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const supabase = createPagesServerClient(ctx);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };

  return {
    props: {
      user,
    },
  };
}
