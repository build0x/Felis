"use client";

import { useCountdown } from "@/hooks/useCountdown";

export function CountdownTimer() {
  const { days, hours, minutes, seconds } = useCountdown();

  const segments = [
    { label: "天", value: days },
    { label: "小时", value: hours },
    { label: "分钟", value: minutes },
    { label: "秒", value: seconds },
  ];

  return (
    <div className="flex flex-wrap gap-3 text-2xl font-semibold text-white/90 sm:text-3xl">
      {segments.map(({ label, value }) => (
        <div
          key={label}
          className="flex min-w-[72px] flex-col items-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur"
        >
          <span>{value.toString().padStart(2, "0")}</span>
          <span className="mt-1 text-xs font-normal text-white/60">{label}</span>
        </div>
      ))}
    </div>
  );
}


