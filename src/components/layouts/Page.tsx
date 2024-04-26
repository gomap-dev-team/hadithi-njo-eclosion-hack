import React, { ComponentProps, ReactNode, useEffect, useState } from "react";
import Header from "../ui/Header";
import { User } from "@supabase/supabase-js";
import Chat from "../Chat";

export default function Page({ children, props, user, context = "" }: { children: ReactNode; props?: ComponentProps<"div">; user: User; context?: string }) {
  const [isChatVisible, setIsChatVisible] = useState(false);

  useEffect(() => {
    if (isChatVisible) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isChatVisible]);

  return (
    <div className={`flex overflow-hidden ${props?.className}`} {...props}>
      <div className="xl:max-w-[70%] max-lg:w-full w-[70%] lg:max-w-5xl pb-8 pl-5 pr-5">
        <Header isChatOpened={isChatVisible} user={user} onChatIconClicked={() => setIsChatVisible(!isChatVisible)} />
        {children}
      </div>
      <Chat context={context} isChatVisible={isChatVisible} />
    </div>
  );
}
