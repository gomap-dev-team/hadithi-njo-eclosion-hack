import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const login = () => {
  return (
    <div className="lg:flex flex-row h-svh w-full max-lg:px-5">
      <div className="relative max-lg:fixed inset-0 w-full h-full">
        <Image src="/african-design.gif" alt="african desing login" fill className="object-cover w-full opacity-30" />
      </div>
      <div className="w-1/2 max-lg:w-full relative h-full">
        <div className="flex flex-col gap-3 bg-white/50 backdrop-blur-lg lg:-ml-20 absolute -translate-y-1/2 top-1/2 w-full p-10 rounded-lg">
          <Input onChange={() => null} placeholder="Email" required type="email" name="email" className="" />
          <Input type="password" onChange={() => null} required placeholder="Mot de passe" name="password" />
          <Button>Se Connecter</Button>
        </div>
      </div>
    </div>
  );
};

export default login;
