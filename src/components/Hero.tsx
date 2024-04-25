import Image from "next/image";
import Section from "./layouts/Page";

export default function Hero() {
  return (
    <div>
      <div className="relative h-[40rem] w-full">
        <Image src="/images/cover.jpg" alt="cover" fill className="object-cover" />
        <div className="bg-gradient-to-b from-black via-black/40 fixed top-0 left-0 right-0 w-full h-full z-20" />
      </div>
      {/* <Section>
        <h1>hero</h1>
      </Section> */}
    </div>
  );
}
