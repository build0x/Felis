"use client";

import Image from "next/image";
import { PRESALE_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "@/lib/constants";
import { CopyAddress } from "@/components/CopyAddress";

export function NavBar() {
  return (
    <header className="w-full py-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/logo-badge.png"
            height={48}
            width={48}
            alt="菲利斯猫 Logo"
            className="rounded-full border border-white/20"
            priority
          />
          <div>
            <p className="text-lg font-semibold tracking-wide">菲利斯猫预售</p>
            <p className="text-sm text-white/60">Felis Cat Token Presale</p>
          </div>
        </div>
        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <a href="#presale" className="transition hover:text-white">
            预售
          </a>
          <a href="#story" className="transition hover:text-white">
            太空故事
          </a>
          <a href="#roadmap" className="transition hover:text-white">
            路线图
          </a>
          <a href="#faq" className="transition hover:text-white">
            FAQ
          </a>
          <a href="#security" className="transition hover:text-white">
            安全
          </a>
        </nav>
        <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-3">
          <CopyAddress
            address={PRESALE_ADDRESS}
            displayText="复制预售地址"
            variant="pill"
          />
          <CopyAddress
            address={TOKEN_CONTRACT_ADDRESS}
            displayText="复制代币合约"
            variant="pill"
          />
        </div>
      </div>
    </header>
  );
}

