import { MessageCircle, Plus, UserIcon } from "lucide-react";
import SearchIcon from "./icons/SearchIcon";
import { Menubar, MenubarMenu, MenubarTrigger } from "./menubar";
import { useRouter } from "next/router";
import { User } from "@supabase/supabase-js";

export default function Header({ onChatIconClicked, isChatOpened, user }: { onChatIconClicked: () => void; isChatOpened: boolean; user: User }) {
  const router = useRouter();
  const MessageSwitch = () => {
    if (isChatOpened) return <Plus onClick={onChatIconClicked} role="button" className="cursor-pointer rotate-45 max-lg:block hidden" />;
    return <MessageCircle onClick={onChatIconClicked} role="button" className="cursor-pointer max-lg:block hidden" />;
  };

  return (
    <div className="flex justify-between backdrop-blur-md  items-center z-50 fixed xl:w-[70%] w-full top-0 left-0 right-0 py-5 px-5">
      <h1 onClick={() => router.push("/")} className="font-extrabold text-accent-foreground">
        Hadithi-njo
      </h1>
      <Menubar className="min-w-1/4 hidden md:flex">
        <MenubarMenu>
          <MenubarTrigger className="w-full inline-flex justify-center">Home</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="w-full inline-flex justify-center">Show</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="w-full inline-flex justify-center">Support</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="w-full inline-flex justify-center">Subscription</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
      <div className="gap-3 items-center text-accent-foreground hidden md:flex">
        <MessageSwitch />
        <SearchIcon className="cursor-pointer" />
        {user && (
          <p className="bg-white text-black py-2 w-fit px-3 flex gap-2 items-center cursor-pointer justify-center rounded-md text-xs">
            <UserIcon className="w-5 h-5" />
            {user.email?.split("@")[0]}
          </p>
        )}
      </div>
      <div className="text-accent-foreground flex items-center gap-2 bg-primary-foreground border-primary rounded-md p-2 md:hidden">
        <MessageSwitch />
        {user && <UserIcon />}
      </div>
    </div>
  );
}
