import { storyTimeline } from "@/lib/mockData";

export function StoryTimeline() {
  return (
    <section className="mx-auto mt-24 max-w-5xl px-6" id="story">
      <h2 className="text-3xl font-semibold text-center">菲利斯猫的太空传奇</h2>
      <p className="mt-3 text-center text-white/60">
        菲利斯猫（Félicette）是世界上第一只飞往太空并安全返航的猫，如今她的故事将以 Web3 方式续写。
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {storyTimeline.map((item) => (
          <div key={item.title} className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">{item.year}</p>
            <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-white/70">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}





