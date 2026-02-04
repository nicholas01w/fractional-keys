'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export type AccordionItem = {
  title: string;
  content: string;
};

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.title}
            className="rounded-xl border border-white/10 bg-white/5"
          >
            <button
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              type="button"
            >
              <span>{item.title}</span>
              <span className="text-white/50">{isOpen ? '−' : '+'}</span>
            </button>
            <div
              className={cn(
                'overflow-hidden px-4 text-sm text-white/70 transition-all',
                isOpen ? 'max-h-40 pb-4' : 'max-h-0'
              )}
            >
              <p>{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
