"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { BarChart3, Users, Rocket, TrendingUp } from "lucide-react";
import { latestTransactions, mockStats } from "@/lib/mockData";

export function MockStats() {
  return (
    <section className="relative mx-auto mt-16 max-w-6xl px-6" id="stats">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/assets/stats-bg.png"
            alt="数据展示背景"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"></div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="grid gap-6 sm:grid-cols-2">
          <StatCard icon={<BarChart3 className="h-6 w-6 text-sky-300" />} label="累计私募额度" value={`${mockStats.totalRaised.toFixed(2)} BNB`} />
          <StatCard icon={<Users className="h-6 w-6 text-purple-300" />} label="预售参与地址" value={`${mockStats.participants.toLocaleString()}`} />
          <StatCard icon={<Rocket className="h-6 w-6 text-emerald-300" />} label="售出比例" value={`${mockStats.soldPercentage}%`} />
          <StatCard icon={<TrendingUp className="h-6 w-6 text-pink-300" />} label="人均认购" value={`${mockStats.avgContribution.toFixed(2)} BNB`} />
        </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 backdrop-blur">
            <p className="text-sm text-white/60">近期链上交易</p>
            <ul className="mt-4 space-y-4 text-sm">
              {latestTransactions.map((tx) => (
                <li key={tx.address} className="flex items-center justify-between text-white/80">
                  <span className="font-mono">{tx.address}</span>
                  <div className="text-right">
                    <p>{tx.amount} BNB</p>
                    <p className="text-xs text-white/50">{tx.timestamp}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur">
      <div>{icon}</div>
      <p className="mt-3 text-sm text-white/60">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

