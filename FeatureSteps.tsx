import Image from "next/image";

const steps = [
  {
    title: "连接钱包",
    description: "使用 MetaMask、OKX 或 Trust Wallet 连接至 BSC 主网。",
    image: "/assets/step-connect.png",
  },
  {
    title: "确认转账",
    description: "输入 0.05~1 BNB 金额，确认后在钱包完成签名。",
    image: "/assets/step-transfer.png",
  },
  {
    title: "等待上线",
    description: "参与预售以后代币会自动空投到预售地址，并通过官网及社群同步公示。",
    image: "/assets/step-wait.png",
  },
];

export function FeatureSteps() {
  return (
    <section className="mx-auto mt-16 max-w-6xl px-6" id="presale">
      <h2 className="text-3xl font-semibold">三步完成菲利斯猫认购</h2>
      <p className="mt-3 max-w-2xl text-white/60">
        数据展示均为真实数据，交易需以链上转账为准。记得切换到 BSC 主网，并在确认金额后完成钱包签名。
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <div key={step.title} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="relative h-40 w-full overflow-hidden rounded-2xl">
              <Image src={step.image} alt={step.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-sm text-white/70">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

