import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const HADITHI_NJO_USER = "hadithi-njo-user";

function Signup() {
  const [needToSignIn, setNeedToSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userAuthData, setUserAuthData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const onAuthInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserAuthData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // useLayoutEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const user = localStorage.getItem(HADITHI_NJO_USER);
  //     setNeedToSignIn(!!user);
  //   }
  // }, []);

  const onSignup = async () => {
    try {
      setIsLoading(true);
      const user = await supabase.auth.signUp({
        email: userAuthData.email,
        password: userAuthData.password,
      });

      if (user.data) {
        window.localStorage.setItem(HADITHI_NJO_USER, JSON.stringify(user.data));
        router.replace("/login");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSignin = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userAuthData.email,
        password: userAuthData.password,
      });

      if (error) throw error;
      if (data) {
        await fetch("/api/auth/callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session: data.session,
          }),
        });
        console.log({ data });
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lg:flex flex-row h-svh w-full max-lg:px-5">
      <div className="relative max-lg:fixed inset-0 w-full h-full">
        <Image src="/african-design.gif" alt="african desing login" fill className="object-cover w-full opacity-30" />
      </div>
      <div className="w-1/2 max-lg:w-full relative h-full">
        <div className="flex flex-col gap-3 bg-white/50 backdrop-blur-lg lg:-ml-20 absolute -translate-y-1/2 top-1/2 w-full p-10 rounded-lg">
          <Input onChange={onAuthInputChange} placeholder="Email" required type="email" name="email" className="" />
          <Input type="password" onChange={onAuthInputChange} required placeholder="Mot de passe" name="password" />
          <Button onClick={onSignup}>{isLoading ? "En cours" : "Creer un compte"}</Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
