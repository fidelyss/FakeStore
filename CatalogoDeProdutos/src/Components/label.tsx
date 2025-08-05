import { forwardRef, type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type LabelProps = ComponentProps<"label">;

export const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  return (
    <label
      {...props}
      ref={ref}
      className={twMerge(
        "text-sm font-medium text-zinc-300 mb-1 block",
        props.className
      )}
    />
  );
});

Label.displayName = "Label";