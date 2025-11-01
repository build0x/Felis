"use client";

import { useEffect, useState } from "react";
import { LAUNCH_TIME } from "@/lib/constants";

const calcDiff = () => {
  const now = Date.now();
  const target = LAUNCH_TIME.getTime();
  const diff = Math.max(target - now, 0);

  return {
    total: diff,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  } as const;
};

export const useCountdown = () => {
  const [time, setTime] = useState(calcDiff());

  useEffect(() => {
    const timer = window.setInterval(() => setTime(calcDiff()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return time;
};





