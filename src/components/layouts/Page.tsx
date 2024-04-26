import React, { ComponentProps, ReactNode, useEffect, useState } from "react";
import Header from "../ui/Header";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Bot, SendIcon } from "lucide-react";
import { User } from "@supabase/supabase-js";

export default function Page({ children, props, user }: { children: ReactNode; props?: ComponentProps<"div">; user: User }) {
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
      <div
        className={`max-lg:w-full w-[28%] fixed mr-3 top-5 bottom-0 overflow-y-auto max-h-screen right-0 rounded-md ${isChatVisible ? "max-lg:!fixed max-lg:!backdrop-blur-md max-lg:!bg-black/20 max-lg:!inset-0 max-lg:-[9999999]" : "max-lg:!hidden"}`}
      >
        <div className="bg-muted-foreground/10 max-lg:bg-background max-lg:max-h-[80%] max-lg:absolute max-lg:bottom-0 max-lg:rounded-t-md max-lg:backdrop-blur-md h-full w-full relative py-5">
          <div className="flex items-center mx-5 gap-3 bg-background p-3 rounded-lg">
            Bonjour je suis votre assistant en histoire authentique de l&apos;Afrique. Posez-moi une question 🙂
          </div>
          <div className="flex h-fit items-start absolute bottom-0 right-0 left-0 mx-auto px-2 pb-2 gap-3">
            <Textarea className="w-full resize-none min-h-10 max-h-[200px] h-10 text-area" placeholder="Ecrit ta question ici..." />
            <Button className="">
              <SendIcon className="text-3xl w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
