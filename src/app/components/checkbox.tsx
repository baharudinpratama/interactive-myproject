import { extendVariants, Checkbox } from "@heroui/react";

const MyCheckbox = extendVariants(Checkbox, {
  variants: {
    color: {
      yellow: {
        wrapper: [
          "text-white",
          "after:bg-yellow after:text-white",
          "group-data-[focus-visible=true]:ring-yellow",
        ],
      },
    },
    radius: {
      default: {
        wrapper: [
          "rounded-[4px]",
          "before:rounded-[4px]",
          "after:rounded-[4px]",
        ],
      },
    }
  },
  defaultVariants: {
    radius: "default",
    // disableAnimation: "true",
  },
});

export default MyCheckbox;
