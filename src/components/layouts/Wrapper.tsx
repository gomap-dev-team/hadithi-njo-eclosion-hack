import { ReactNode } from "react";

export default function Wrapper({ children }: { children: ReactNode }) {
  return <div className="xl:max-w-screen-xl lg:max-w-5xl py-8 mx-auto">{children}</div>;
}
