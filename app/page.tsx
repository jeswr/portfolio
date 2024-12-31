import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { Image } from "@nextui-org/image";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <div>
          Jesse Wright, is a researcher, software engineer, and open-source advocate dedicated to advancing user-centric web technologies. As the Solid Lead at the Open Data Institute (ODI), Jesse plays a pivotal role in steering the governance and community engagement for the Solid project, an initiative founded by Sir Tim Berners-Lee to revolutionize personal data storage and sharing. Solid empowers individuals to retain control of their data through decentralized personal online data stores (pods), promoting data portability, privacy, and ethical data practices.
        </div>
        <br/>
        <div>
          Alongside his work with the ODI, Jesse is pursuing a DPhil at the University of Oxford in the EWADA group, led by Sir Tim Berners-Lee and Nigel Shadbolt. His academic research focuses on building personal AI agents using the Semantic Web Stack, enabling legally enforceable, machine-readable contracts for data sharing and fostering trustworthy, autonomous systems on the web.
        </div>
      </div>
    </section>
  );
}
