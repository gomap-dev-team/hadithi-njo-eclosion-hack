import Page from "@/components/layouts/Page";
import Video from "next-video";
import Card from "@/components/Cards";
import { card } from "../../../mock";
import { GetServerSidePropsContext } from "next";
import { User, createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { SUPABASE_URL } from "@/lib/utils";
import { getUserVideos, retreiveVideoByVideoUrl } from "@/lib/supabase";

export default function View({ user, video, usersVideo }: { user: User; video: typeof card; usersVideo: Array<typeof card> }) {
  return (
    <Page
      user={user}
      context={`
      Title: ${video.videoTitle}
      Description: ${video.videoDescription}
      
      ${video.videoScript}
    `}
    >
      <div className="min-w-[70%] flex flex-col gap-3 mt-24">
        <Video className="w-full" src={SUPABASE_URL + video.videoUrl} />
        <div className="flex flex-col bg-foreground/20 p-4 rounded-md">
          <h1 className="text-2xl font-bold border-b border-white/30 pb-4">{video.videoTitle}</h1>
          <h3 className="text-sm text-muted-foreground mt-3 ">{video.videoDescription}</h3>
        </div>
      </div>
      {usersVideo.length > 0 && (
        <div className="mt-10">
          <h3 className="text-2xl font-bold">Contenue Similaire</h3>
          <div className="grid mt-8 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {usersVideo.map((_card, index) => {
              return <Card key={index} card={_card as any} />;
            })}
          </div>
        </div>
      )}
    </Page>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const supabase = createPagesServerClient(ctx);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };

  const videoPath = "videos/" + ctx.params?.hash;
  const { data, error } = await retreiveVideoByVideoUrl(videoPath);
  if (error)
    return {
      redirect: {
        destination: "/",
      },
    };

  const { data: usersVideo } = await getUserVideos(user.id);

  return {
    props: {
      user,
      video: data[0],
      usersVideo: usersVideo ? usersVideo.filter((v) => v.videoUrl !== videoPath) : [],
    },
  };
}
