"use client";

import { EmojiStyle } from 'emoji-picker-react';
import dynamic from "next/dynamic";

const EmojiPicker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

export default function Page() {
  return (
    <div>
      <EmojiPicker emojiStyle={EmojiStyle.NATIVE} />
    </div>
  );
}
