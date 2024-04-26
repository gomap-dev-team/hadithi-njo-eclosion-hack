import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const VIDEOS = "videos";

export const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadVideoData = (data: { videoUrl: string; videoCoverUrl: string; videoScript: string; videoSize: number; creator: string }) => {
  return supabase.from(VIDEOS).insert(data);
};
