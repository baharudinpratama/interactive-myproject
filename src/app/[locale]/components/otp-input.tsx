import React, { useState } from "react";

interface OTPInputProps {
  onChange: (otp: string) => void;
}

function OTPInput({ onChange }: OTPInputProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`)?.focus();
      }
    }
  };

  return (
    <div className="flex py-[20px] gap-[5px] self-center">
      {otp.map((digit, index) => {
        const isFilled = digit ? "true" : "false";

        return (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
            data-is-filled={isFilled}
            className="size-[50px] text-center border rounded-[12px] focus:outline-none focus:border-grey-dark-active data-[is-filled=true]:border-grey-dark-active"
          />
        )
      })}
    </div>
  );
}

export default OTPInput;
