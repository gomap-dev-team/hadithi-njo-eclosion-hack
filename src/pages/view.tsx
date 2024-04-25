import Page from "@/components/layouts/Page";
import Video from "next-video";
import Card from "@/components/Cards";
import { card } from "../../mock";

export default function view() {
  return (
    <Page>
      <div className="min-w-[70%] flex flex-col gap-3 mt-24">
        <Video
          className="w-full"
          src="https://phgjxtbiosdiabkzmird.supabase.co/storage/v1/object/public/video%20%20test/The%20Speech%20that%20Got%20Patrice%20Lumumba%20Killed%20(1).mp4?t=2024-03-23T10%3A09%3A21.185Z"
        />
        <div className="flex flex-col bg-foreground/20 p-4 rounded-md">
          <h1 className="text-2xl font-bold border-b border-white/30 pb-4">Lumumba last speech</h1>
          <h3 className="text-sm text-muted-foreground mt-3 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quisquam libero maxime cum quae, distinctio ex possimus odit, eligendi tenetur quia architecto soluta
            quaerat corrupti impedit in sit placeat ut? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus quo, a nobis qui aliquid earum reiciendis nesciunt fugit
            asperiores, nostrum dicta debitis exercitationem ratione maxime, adipisci voluptatibus? At, omnis debitis?
          </h3>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-2xl font-bold">Contenue Similaire</h3>
        <div className="grid mt-8 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 })
            .fill(card)
            .map((_card, index) => {
              return <Card key={index} card={_card as any} />;
            })}
        </div>
      </div>
    </Page>
  );
}
