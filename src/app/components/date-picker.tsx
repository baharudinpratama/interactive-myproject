import { extendVariants, DatePicker } from "@heroui/react";

const MyDatePicker = extendVariants(DatePicker, {
  slots: {
    calendarContent: "data-[slot=cell]:data-[selected=true]:bg-yellow"
  }
});

export default MyDatePicker;
