
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-set-red to-set-red-light text-white shadow-md shadow-set-red/25 hover:shadow-lg hover:shadow-set-red/30 hover:-translate-y-0.5 active:translate-y-0 border-0",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0",
        secondary: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        glass: "bg-white/80 backdrop-blur-xl border border-white/20 shadow-md hover:shadow-lg text-gray-800 hover:-translate-y-0.5 active:translate-y-0",
        primary: "bg-gradient-to-r from-set-red to-set-red-light text-white shadow-md shadow-set-red/25 hover:shadow-lg hover:shadow-set-red/30 hover:-translate-y-0.5 active:translate-y-0 border-0",
        ios: "bg-white shadow-[0_5px_15px_rgba(0,0,0,0.05)] border border-gray-100 text-gray-700 hover:bg-gray-50 hover:-translate-y-0.5 active:translate-y-0",
        "ios-primary": "bg-gradient-to-r from-set-red to-set-red-light text-white shadow-[0_5px_15px_rgba(225,69,83,0.25)] hover:shadow-[0_8px_20px_rgba(225,69,83,0.3)] hover:-translate-y-0.5 active:translate-y-0 border-0",
        purple: "bg-gradient-to-r from-set-purple to-set-purple-light text-white shadow-md shadow-set-purple/25 hover:shadow-lg hover:shadow-set-purple/30 hover:-translate-y-0.5 active:translate-y-0 border-0",
        green: "bg-gradient-to-r from-set-green to-set-green-light text-white shadow-md shadow-set-green/25 hover:shadow-lg hover:shadow-set-green/30 hover:-translate-y-0.5 active:translate-y-0 border-0",
        blue: "bg-gradient-to-r from-set-blue to-set-blue-light text-white shadow-md shadow-set-blue/25 hover:shadow-lg hover:shadow-set-blue/30 hover:-translate-y-0.5 active:translate-y-0 border-0",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-10 rounded-xl px-4 py-2 text-xs",
        lg: "h-12 rounded-2xl px-8 py-3",
        icon: "h-11 w-11 rounded-full",
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
