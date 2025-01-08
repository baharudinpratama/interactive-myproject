import {addIcon} from "@iconify-icon/react";

export const registerIcons = () => {
  addIcon("solar:record-circle-fill-linear", {
    body: '<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="currentColor" stroke="currentColor" stroke-width="1.5"/>',
    width: 24,
    height: 24,
  });
}
