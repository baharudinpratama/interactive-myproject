"use client";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function Page() {
  return (
    <Picker data={data} onEmojiSelect={console.log} maxFrequentRows={0} perLine={6} emojiButtonSize={22} emojiSize={16} />
  );
}
