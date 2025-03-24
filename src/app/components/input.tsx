import { Input, InputProps } from "@heroui/input";

export default function MyInput(props: InputProps) {
  return (
    <Input
      {...props}
      labelPlacement="outside"
      classNames={{
        base: [
          "text-base",
          "bg-transparent",
          "group-data-[has-label=true]:mt-[27px]",
          "opacity-100",
        ],
        label: [
          "text-grey-dark-active",
          "group-data-[invalid=true]:!text-grey-dark-active",
          "group-data-[disabled=true]:!text-grey-light-active",
        ],
        input: [
          "text-grey-dark-active",
          "placeholder:text-grey-light-active",
          "group-data-[invalid=true]:!text-grey-dark-active",
          "group-data-[disabled=true]:!text-grey-light-active",
        ],
        inputWrapper: [
          "h-[46px]",
          "p-[14px]",
          "bg-transparent",
          "rounded-[8px]",
          "border border-grey-light-active",
          "group-data-[hover=true]:bg-transparent",
          "group-data-[focus=true]:bg-transparent group-data-[focus=true]:border-grey-dark-active",
          "group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-transparent",
          "group-data-[invalid=true]:!border-red-active group-data-[invalid=true]:!bg-red-light-hover",
          "group-data-[disabled=true]:!bg-white-light-active",
          "shadow-none",
        ],
        errorMessage: [
          "text-[12px] text-red-active",
        ],
        helperWrapper: [
          "p-0 pt-[2px]",
        ],
      }}
    />
  );
}
