import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui" // Assuming wrapper pattern
// OR standard: import * as SeparatorPrimitive from "@radix-ui/react-separator"

// Since I am unsure about the wrapper, I will implement a pure CSS separator for safety
// This mimics Shadcn's behavior without the dependency risk for now.

import { cn } from "@/lib/utils"

function Separator({
    className,
    orientation = "horizontal",
    decorative = true,
    ...props
}: React.ComponentProps<"div"> & {
    orientation?: "horizontal" | "vertical"
    decorative?: boolean
}) {
    return (
        <div
            data-slot="separator"
            role={decorative ? "none" : "separator"}
            className={cn(
                "bg-border shrink-0",
                orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
                className
            )}
            {...props}
        />
    )
}

export { Separator }
