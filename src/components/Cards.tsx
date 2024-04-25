import React from "react";
import { card as TCard } from "../../mock";
import Image from "next/image";

export default function Card({ card }: { card: typeof TCard }) {
  return (
    <div className="p-4 h-fit w-fit rounded-md bg-muted-foreground/10 cursor-pointer">
      <div className="relative w-full h-44 rounded-md">
        <Image src={card.image} alt={card.name} className="object-cover rounded-md" fill />
      </div>
      <div className="flex flex-col mt-3 gap-2">
        <h3 className="font-bold text-sm">{card.name}</h3>
        <p className="line-clamp-1 text-xs">{card.description}</p>
      </div>
    </div>
  );
}
