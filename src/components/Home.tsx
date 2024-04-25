import React from "react";
import { card } from "../../mock";
import Card from "./Cards";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-24">
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {Array.from({ length: 20 })
          .fill(card)
          .map((_card, index) => {
            return (
              <Link href="view" key={index}>
                <Card card={_card as any} />
              </Link>
            );
          })}
      </div>
    </div>
  );
}
