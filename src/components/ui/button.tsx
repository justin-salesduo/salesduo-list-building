import * as React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-cta text-white hover:bg-cta-hover shadow-sm hover:shadow-md',
        secondary:
          'bg-surface text-text-primary border-2 border-border hover:border-accent hover:bg-background',
        ghost: 'hover:bg-surface hover:text-text-primary',
        link: 'text-text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 px-8 py-3',
        sm: 'h-10 px-6 py-2 text-sm',
        lg: 'h-14 px-10 py-4 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
