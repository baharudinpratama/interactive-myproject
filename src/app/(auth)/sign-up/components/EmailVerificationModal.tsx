"use client";

import MyButton from "@/app/components/button";
import OTPInput from "@/app/components/otp-input";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import { Icon } from "@iconify-icon/react";
import { useTranslations } from "next-intl";
import { InputOtp } from "@heroui/input-otp";
import { useState } from "react";

import useAuthStore from "../states/AuthStore";

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOtpVerified: () => void;
  timerString: string;
  otp: string;
}

export default function EmailVerificationModal({
  isOpen,
  onClose,
  onOtpVerified,
  timerString,
  otp
}: EmailVerificationModalProps) {
  const t = useTranslations();
  const { form } = useAuthStore();

  const [isInvalid, setIsInvalid] = useState(false);

  const handleOtp = (val: any) => {
    if (val === otp) {
      onOtpVerified();
    } else {
      setIsInvalid(true);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} hideCloseButton={true} size="lg">
      <ModalContent>
        <ModalBody className="p-0 rouded-[8px]">
          <div className="flex flex-col px-[42px] py-[54px] gap-[16px] self-stretch">
            <Icon icon="solar:shield-keyhole-linear" width={37} className="self-center" />

            <div className="self-center">
              <span className="text-[16px] font-semibold">{t("otp.verifyEmail")}</span>
            </div>

            <div className="flex flex-col gap-[5px] self-stretch">
              <span className="self-center text-grey-light-active ">{t("otp.otpSent")}</span>
              <span className="self-center">{form.email}</span>
            </div>

            <div className="flex self-center">
              <InputOtp
                autoFocus={true}
                length={6}
                size="lg"
                onComplete={handleOtp}
                isInvalid={isInvalid}
                errorMessage="OTP invalid"
                classNames={{
                  helperWrapper: "max-w-72 text-center",
                  segment: "data-[active=true]:outline-grey-dark-active data-[focus=true]:outline-grey-dark-active data-[focus-visible=true]:outline-grey-dark-active"
                }}
              />
            </div>

            {/* <OTPInput onChange={(val) => handleOtp(val)} /> */}

            <div className="flex self-center">
              <MyButton
                variant="bordered"
                size="sm"
                className="border border-grey-light-active"
                children={
                  <div className="flex text-[12px] gap-[4px]">
                    {t("otp.resend")}
                    <span className="font-bold">
                      {timerString}
                    </span>
                  </div>
                }
              />
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
