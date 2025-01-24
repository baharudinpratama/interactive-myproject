import { addIcon } from "@iconify-icon/react";

export const registerIcons = () => {
  addIcon("solar:record-circle-filled-linear", {
    body: '<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="currentColor" stroke="currentColor" stroke-width="1.5"/>',
    width: 24,
    height: 24,
  });

  addIcon("solar:essentional-list-linear", {
    body: '<path d="M20 7L4 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M20 12L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M20 17L4 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    width: 24,
    height: 24,
  })
}
