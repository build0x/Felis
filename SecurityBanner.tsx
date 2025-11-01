import Image from "next/image";
import { PRESALE_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "@/lib/constants";
import { CopyAddress } from "@/components/CopyAddress";
import { withBasePath } from "@/lib/basePath";

export function SecurityBanner() {
  return (
    <section className="mx-auto mt-24 max-w-5xl px-6" id="security">
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5">
        <div className="absolute inset-0 opacity-60">
          <Image src={withBasePath("/assets/security-banner.png")} alt="安全公告" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="relative z-10 space-y-4 px-8 py-10 backdrop-blur">
          <h2 className="text-2xl font-semibold">安全提醒与透明度声明</h2>
          <ul className="space-y-2 text-sm text-white/75">
            <li>• 页面展示的统计数据为真实数据，链上交易需以区块链浏览器为准。</li>
            <li>
              • 请确认预售转账目标地址为
              <CopyAddress
                address={PRESALE_ADDRESS}
                displayText={PRESALE_ADDRESS}
                variant="inline"
                className="ml-1"
              />
              。
            </li>
            <li>
              • 代币合约地址：
              <CopyAddress
                address={TOKEN_CONTRACT_ADDRESS}
                displayText={TOKEN_CONTRACT_ADDRESS}
                variant="inline"
                className="ml-1"
              />
              。
            </li>
            <li>• 谨防钓鱼链接与假冒客服，官方资讯仅以官网及社群公告为准。</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

