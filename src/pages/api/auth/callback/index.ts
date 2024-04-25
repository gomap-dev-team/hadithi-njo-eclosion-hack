import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

// THIS IS A HACK FOR SETTING UP USER SESSION
async function handler(req: any, res: any) {
  const session = req.body.session;

  const supabase = createPagesServerClient({ req, res });
  await supabase.auth.setSession({
    refresh_token: session.refresh_token,
    access_token: session.access_token,
  });
  return res.redirect("/");
}

export default handler;
