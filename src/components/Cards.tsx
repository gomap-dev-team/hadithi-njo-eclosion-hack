import React from "react";
import { card as TCard } from "../../mock";
import Image from "next/image";
import { SUPABASE_URL } from "@/lib/utils";

export default function Card({ card }: { card: typeof TCard }) {
  return (
    <div className="p-4 h-fit w-full rounded-md bg-muted-foreground/10 cursor-pointer">
      <div className="relative w-full min-w-44 h-44 rounded-md">
        <Image src={SUPABASE_URL + card.videoCoverUrl} alt={card.videoTitle} className="object-cover rounded-md" fill />
      </div>
      <div className="flex flex-col mt-3 gap-2">
        <h3 className="font-bold text-sm">{card.videoTitle}</h3>
        <p className="line-clamp-1 text-xs">{card.videoDescription}</p>
      </div>
    </div>
  );
}
