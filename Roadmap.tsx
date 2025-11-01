import Image from "next/image";
import { roadmapItems } from "@/lib/mockData";
import { withBasePath } from "@/lib/basePath";

export function Roadmap() {
  return (
    <section className="mx-auto mt-24 max-w-6xl px-6" id="roadmap">
      <div className="grid gap-10 lg:grid-cols-[3fr,2fr] lg:items-center">
        <div>
          <h2 className="text-3xl font-semibold">菲利斯猫太空计划路线图</h2>
          <p className="mt-3 text-white/60">
            以菲利斯猫的太空精神为灵感，我们将陆续解锁去中心化交易、NFT 生态以及跨链扩展，打造面向未来的喵星计划。
          </p>

          <ol className="mt-10 space-y-6 border-l border-white/15 pl-6">
            {roadmapItems.map((item) => (
              <li key={item.title} className="relative">
                <span className="absolute -left-3 top-1.5 h-2.5 w-2.5 rounded-full bg-sky-400"></span>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/70">{item.content}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative hidden h-full min-h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 lg:block">
          <Image
            src={withBasePath("/assets/timeline-illustration.png")}
            alt="路线图插画"
            fill
            sizes="45vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}


