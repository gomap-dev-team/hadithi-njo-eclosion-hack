import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const VIDEOS = "videos";

export const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadVideoData = (data: {
  videoUrl: string;
  videoCoverUrl: string;
  videoScript: string;
  videoSize: number;
  creator: string;
  videoDescription: string;
  videoTitle: string;
}) => {
  return supabase.from(VIDEOS).insert(data);
};

export const retreiveAllVideo = async () => {
  return await supabase.from(VIDEOS).select("*");
};

export const retreiveVideoByVideoUrl = async (videoUrl: string) => {
  return await supabase.from(VIDEOS).select("*").eq("videoUrl", videoUrl);
};

export const getUserVideos = async (userId: string) => {
  return await supabase.from(VIDEOS).select("*").eq("creator", userId);
};
