import { extendVariants, Button } from "@heroui/react";

const MyButton = extendVariants(Button, {
  variants: {
    variant: {
      bordered: "border"
    },
    size: {
      sm: "h-[30px]",
      md: "h-[36px]",
      lg: "h-[42px]",
    },
    color: {
      default: "",
      yellow: "",
    },
    radius: {
      default: "rounded-[8px]",
    }
  },
  defaultVariants: {
    size: "md",
    variant: "solid",
    color: "default",
    // fullWidth: "false",
    radius: "default",
    // disableAnimation: "true",
    // disableRipple: "true",
  },
  compoundVariants: [
    {
      class: [
        "p-[8px]",
        "data-[hover=true]:!opacity-100",
      ],
    },
    {
      variant: "solid",
      color: "yellow",
      class: [
        "bg-yellow-400 text-grey-dark-active",
        "data-[focus-visible=true]:outline-yellow-400",
        "data-[hover=true]:bg-yellow-600 data-[hover=true]:text-grey-dark-active",
        "data-[disabled=true]:text-opacity-100 data-[disabled=true]:text-yellow-500",
      ],
    },
    {
      variant: "bordered",
      color: "default",
      class: [
        "border-grey-active text-grey-dark-active",
        "data-[focus-visible=true]:outline-grey-dark-active",
      ],
    },
    {
      variant: "bordered",
      color: "yellow",
      class: [
        "border-yellow-500 text-yellow-500",
        "data-[focus-visible=true]:outline-yellow-500",
        "data-[hover=true]:border-yellow-600 data-[hover=true]:text-yellow-600",
      ],
    },
  ],
});

export default MyButton;
