import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Toast({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/80',
        className
      )}
      {...props}
    />
  );
}
