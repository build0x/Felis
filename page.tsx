import Image from "next/image";
import { NavBar } from "@/components/NavBar";
import { CountdownTimer } from "@/components/CountdownTimer";
import { ContributionWidget } from "@/components/ContributionWidget";
import { FeatureSteps } from "@/components/FeatureSteps";
import { MockStats } from "@/components/MockStats";
import { StoryTimeline } from "@/components/StoryTimeline";
import { Roadmap } from "@/components/Roadmap";
import { FaqAccordion } from "@/components/FaqAccordion";
import { SecurityBanner } from "@/components/SecurityBanner";
import { Footer } from "@/components/Footer";
import {
  LAUNCH_TIME,
  MIN_CONTRIBUTION,
  MAX_CONTRIBUTION,
  TOKEN_NAME,
  PRESALE_ADDRESS,
  TOKEN_CONTRACT_ADDRESS,
} from "@/lib/constants";
import { CopyAddress } from "@/components/CopyAddress";
import { withBasePath } from "@/lib/basePath";

const launchTimeDisplay = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: "Asia/Shanghai",
}).format(LAUNCH_TIME);

export default function Home() {
  return (
    <div className="relative">
      <NavBar />

      <main className="relative mx-auto mt-10 flex max-w-6xl flex-col gap-20 px-6 pb-16">
        <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.35em] text-sky-300">
              Felis Cat Orbit
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
              {TOKEN_NAME} 预售开启
              <span className="block text-white/70 text-2xl sm:text-3xl">纪念第一只上太空的猫，点燃 Web3 喵势力</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-white/70">
              菲利斯猫（Félicette）在 1963 年的亚轨道飞行中安全返航，如今她的勇敢精神将透过链上预售再次启航。预售额度单笔 {MIN_CONTRIBUTION}-{MAX_CONTRIBUTION} BNB。
            </p>

            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
              <CountdownTimer />
              <div className="text-sm text-white/60 space-y-1">
                <p>上线时间（UTC+8）：{launchTimeDisplay}</p>
                <p>
                  预售地址：
                  <CopyAddress
                    address={PRESALE_ADDRESS}
                    displayText={PRESALE_ADDRESS}
                    variant="inline"
                    className="ml-1"
                  />
                </p>
                <p>
                  代币合约：
                  <CopyAddress
                    address={TOKEN_CONTRACT_ADDRESS}
                    displayText={TOKEN_CONTRACT_ADDRESS}
                    variant="inline"
                    className="ml-1"
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[48px] bg-sky-500/15 blur-3xl"></div>
              <div className="overflow-hidden rounded-[32px] border border-white/15 bg-white/10 shadow-2xl shadow-sky-500/10 backdrop-blur">
                <Image
                  src={withBasePath("/assets/hero-bg.png")}
                  alt="菲利斯猫太空主视觉"
                  width={960}
                  height={540}
                  className="block h-auto w-full"
                  priority
                />
              </div>
            </div>
            <ContributionWidget />
          </div>
        </section>

        <MockStats />
        <FeatureSteps />
        <StoryTimeline />
        <Roadmap />
        <FaqAccordion />
        <SecurityBanner />
      </main>

      <Footer />
    </div>
  );
}
