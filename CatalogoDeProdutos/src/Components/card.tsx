import { forwardRef, type ComponentProps } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const card = tv({
  base: 'rounded-xl shadow-lg p-6 transition-all duration-300',
  variants: {
    variant: {
      neutral: 'bg-white text-gray-900',
      primary: 'bg-blue-50 text-blue-900 border border-blue-200',
      danger: 'bg-red-50 text-red-900 border border-red-200',
    },
    size: {
      sm: 'w-full max-w-xs h-auto',
      md: 'w-full max-w-sm h-auto',
      lg: 'w-full max-w-md h-auto',
    },
  },
  defaultVariants: {
    variant: 'neutral',
    size: 'md',
  },
});

type CardProps = ComponentProps<'div'> & VariantProps<typeof card>;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={card({ variant, size, className })}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';