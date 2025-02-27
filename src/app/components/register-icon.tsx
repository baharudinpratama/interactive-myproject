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
  });

  addIcon("solar:slash-linear", {
    body: '<path d="M9.5 1L1 17" stroke="currentColor" stroke-linecap="round" />',
    width: 10,
    height: 18,
  });

  addIcon("solar:dot-bold", {
    body: '<path d="M3.5 6C1.84337 6 0.5 4.65663 0.5 3C0.5 1.34337 1.84337 0 3.5 0C5.15663 0 6.5 1.34337 6.5 3C6.5 4.65663 5.15663 6 3.5 6Z" fill="currentColor"/>',
    width: 7,
    height: 6,
  });

  addIcon("solar:record-circle-original-linear", {
    body: '<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5" />',
    width: 24,
    height: 24,
  });
}
