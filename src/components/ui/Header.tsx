import { MessageCircle, Plus } from "lucide-react";
import Wrapper from "../layouts/Wrapper";
import BellIcon from "./icons/BellIcon";
import MenuIcon from "./icons/MenuIcon";
import SearchIcon from "./icons/SearchIcon";
import { Menubar, MenubarMenu, MenubarTrigger } from "./menubar";
import { useRouter } from "next/router";

export default function Header({ onChatIconClicked, isChatOpened }: { onChatIconClicked: () => void; isChatOpened: boolean }) {
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
        <BellIcon className="cursor-pointer" />
      </div>
      <div className="text-accent-foreground flex items-center gap-2 bg-primary-foreground border-primary rounded-md p-2 md:hidden">
        <MessageSwitch />
        <MenuIcon />
      </div>
    </div>
  );
}
