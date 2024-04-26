import React, { useEffect, useState } from "react";
import { card } from "../../mock";
import Card from "./Cards";
import Link from "next/link";
import { retreiveAllVideo } from "@/lib/supabase";

export default function Home() {
  const [siteVideos, setVideos] = useState<any>([]);

  useEffect(() => {
    async function getVideos() {
      const { data, error } = await retreiveAllVideo();
      if (!error) setVideos(data);
    }
    getVideos();
  }, []);

  return (
    <div className="mt-24">
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {siteVideos.length >= 1 &&
          siteVideos.map((_card: typeof card) => {
            return (
              <Link href={_card.videoUrl} key={_card.id}>
                <Card card={_card as any} />
              </Link>
            );
          })}
      </div>
    </div>
  );
}
