"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function NotFound() {
  return (
    <div className="flex w-screen h-screen justify-center items-center" style={{ backgroundImage: "url('/bg-waves.png')", backgroundSize: "cover" }}>
      <div className="flex flex-col items-center gap-[33px]">
        <div className="flex h-[340px]">
          <DotLottieReact src="/magnifier.lottie" loop autoplay />
        </div>
        <div className="flex w-[410px]">
          <h1 className="text-base text-[#3C3C3C] text-center !text-[25px] font-semibold">Oops!! Looks Like Something Went Wrong</h1>
        </div>
      </div>
    </div>
  )
}
