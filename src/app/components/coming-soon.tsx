"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function ComingSoon() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-[16px]">
      <div className="h-[350px]">
        <DotLottieReact src="/coming-soon.lottie" loop autoplay />
      </div>
      <div className="flex flex-col">
        <h1 className="text-base text-center !text-[25px] font-bold">This Feature Will be Live Soon !!</h1>
        <h2 className="text-base text-center !text-[20px] font-semi-bold">Stay tuned for something amazing</h2>
      </div>
    </div>
  );
}
