import Header from "@/components/ui/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase, uploadVideoData } from "@/lib/supabase";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";
import { uuid } from "uuidv4";

export default function Profile({ user }: { user: User }) {
  const [photoCoverPreview, setPhotoCoverPreview] = useState("");
  const [videoLoading, setIsVideoLoadingLoading] = useState(false);
  const [coverLoading, setIsCoverLoading] = useState(false);
  const [videoData, setVideoData] = useState({
    videoUrl: "",
    videoCoverUrl: "",
    videoScript: "",
    videoSize: 0,
    creator: "",
    videoDescription: "",
    videoTitle: "",
  });

  const videoHanlder = async (e: any) => {
    setIsVideoLoadingLoading(true);
    const { data, error } = await supabase.storage.from("videos").upload(`videos/${uuid()}-${e[0].path}`, e[0]);
    if (!error) {
      setVideoData((prev) => ({ ...prev, videoUrl: data.path, videoSize: e[0].size }));
    }
    console.log(e);
    setIsVideoLoadingLoading(false);
  };

  const videoCoverHandler = async (e: any) => {
    setIsCoverLoading(true);
    const { data, error } = await supabase.storage.from("videos").upload(`covers/${uuid()}-${e[0].path}`, e[0]);
    if (!error) {
      setVideoData((prev) => ({ ...prev, videoCoverUrl: data.path }));
    }
    console.log(e);
    setIsCoverLoading(false);
  };

  const disabled = !user.id || !videoData.videoCoverUrl || !videoData.videoScript || !videoData.videoUrl || !videoData.videoDescription || !videoData.videoTitle;

  const onPublish = async () => {
    console.log(videoData);
    if (disabled) {
      return toast.error("Les donnees ne sont pas completes");
    }

    const { error } = await uploadVideoData({ ...videoData, creator: user.id });
    if (!error) toast.success("Video publiee");
  };

  return (
    <div>
      <Header isChatOpened={false} user={user} shouldCenter onChatIconClicked={() => null} />
      <div className="flex max-md:flex-col justify-center gap-9 px-5 w-full mx-auto mt-32">
        <div>
          <Dropzone accept={{ "video/*": [".mp4", ".webm"] }} onDrop={videoHanlder}>
            {({ getRootProps, getInputProps }) => (
              <section className="p-20 border cursor-pointer border-dashed rounded-md flex items-center justify-center w-full">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className="text-center">{videoLoading ? "Chargement en cours..." : "Veuillez poser votre video ici"}</p>
                </div>
              </section>
            )}
          </Dropzone>

          <Dropzone
            accept={{
              "image/*": [".png", ".gif", ".jpeg", ".jpg"],
            }}
            onDrop={videoCoverHandler}
          >
            {({ getRootProps, getInputProps }) => (
              <section className="p-20 mt-20 border cursor-pointer border-dashed rounded-md flex items-center justify-center">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className="text-center">{coverLoading ? "Chargement en cours..." : "Veuillez poser votre photo de couverture ici"}</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div className="w-full md:w-[30rem] space-y-4">
          <Input onChange={(e) => setVideoData((prev) => ({ ...prev, videoTitle: e.target.value }))} placeholder="Titre de la video" />
          <Input onChange={(e) => setVideoData((prev) => ({ ...prev, videoDescription: e.target.value }))} placeholder="Description de la video" />
          <p className="mt-20 pb-2">Script de la video ici</p>
          <Textarea placeholder="Script de la video" onChange={(e) => setVideoData((prev) => ({ ...prev, videoScript: e.target.value }))} />
          <Button disabled={disabled} onClick={onPublish} className="mt-5 w-full">
            Publier
          </Button>
        </div>
      </div>
    </div>
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

  return {
    props: {
      user,
    },
  };
}
