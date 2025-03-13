"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Image } from "@nextui-org/react";

export default function UnauthorizedAccess() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-[16px]">
      <Image src="/8339-warning.gif" height={384} />

      <h1 className="text-base text-center !text-[25px] font-bold">
        Oops!! Looks Like You are not Authorized to Access This section
      </h1>
    </div>
  );
}
