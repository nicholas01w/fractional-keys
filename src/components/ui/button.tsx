import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

export function buttonStyles(variant: ButtonProps['variant']) {
  return cn(
    'inline-flex items-center justify-center rounded-xl px-5 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    variant === 'primary' &&
      'bg-brand-500 text-white hover:bg-brand-400 focus-visible:outline-brand-200',
    variant === 'secondary' &&
      'border border-white/20 bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white/40',
    variant === 'ghost' &&
      'text-white/80 hover:text-white focus-visible:outline-white/40'
  );
}

export function Button({
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonStyles(variant), className)}
      {...props}
    />
  );
}
