import { forwardRef, type ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
    base: 'flex items-center justify-center gap-2 rounded-2xl text-3xl font-bold tracking-wide leading-relaxed transition-colors duration-300',
    variants: {
        variant: {
            primary: 'bg-blue-600 text-white hover:bg-blue-700',
            danger: 'bg-red-600 text-white hover:bg-red-700',
            neutral: 'bg-gray-200 text-gray-900',
        },
        size: {
            default: 'px-4 py-2.5',
            sm: 'px-3 py-1.5',
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'default',
    },

})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {


        return (
            <button
                {...props}
                ref={ref}
                className={button({ variant, size, className })}
            />
        )
    }
)

Button.displayName = 'Button'