import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center font-mono uppercase tracking-wide border-2 border-foreground bg-background text-foreground focus:outline-none disabled:opacity-50 transition-none",
  {
    variants: {
      variant: {
        default: "active:bg-foreground active:text-background",
        destructive: "bg-destructive text-destructive-foreground border-destructive active:bg-destructive-foreground active:text-destructive",
        outline: "border-foreground bg-background active:bg-foreground active:text-background",
        secondary: "border-muted bg-muted text-foreground active:bg-foreground active:text-background",
        ghost: "border-0 underline hover:bg-foreground hover:text-background",
        link: "border-0 underline p-0",
      },
      size: {
        default: "px-4 py-2 text-sm",
        sm: "px-3 py-1 text-xs",
        lg: "px-6 py-3 text-base",
        icon: "w-10 h-10 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
