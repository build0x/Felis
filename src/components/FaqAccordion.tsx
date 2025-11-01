"use client";

import { useState } from "react";
import { faqItems } from "@/lib/mockData";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto mt-24 max-w-4xl px-6" id="faq">
      <h2 className="text-3xl font-semibold text-center">常见问题</h2>
      <p className="mt-3 text-center text-white/60">
        若有更多疑问，可加入社区与菲利斯猫团队取得联系。
      </p>

      <div className="mt-10 space-y-4">
        {faqItems.map((item, index) => {
          const isOpen = index === openIndex;
          return (
            <div
              key={item.question}
              className="rounded-2xl border border-white/15 bg-white/5 px-6 py-5 backdrop-blur transition"
            >
              <button
                className="flex w-full items-center justify-between text-left text-lg font-semibold"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <span className="text-xl text-sky-300">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && <p className="mt-3 text-sm leading-7 text-white/75">{item.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}


