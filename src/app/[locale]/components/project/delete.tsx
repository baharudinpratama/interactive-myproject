"use client";

import MyButton from "@/app/[locale]/components/button";
import { useCountdownTimer } from "@/app/[locale]/components/countdown-timer";
import OTPInput from "@/app/[locale]/components/otp-input";
import { useModalContext } from "@/app/contexts/modal";
import { Icon } from "@iconify-icon/react";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DeleteProject() {
  const router = useRouter();

  const { openModals, closeModal, closeAllModals, openModal } = useModalContext();
  const otp = "123123";
  const handleOtp = (val: string) => {
    if (val === otp) {
      router.push("/dashboard");
      closeAllModals();
    }
  }

  const {
    getTimerString,
    startTimer
  } = useCountdownTimer(5, 'delete-project-verification-timer');

  useEffect(() => {
    if (getTimerString() === '00:00') {
      startTimer();
    }
  }, []);

  return (
    <>
      <Modal isOpen={openModals["deleteProject"]} hideCloseButton={true} size="xs" className="w-[300px]">
        <ModalContent className="overflow-visible">
          {() => (
            <>
              <ModalBody className="px-[25px] py-[20px]">
                <div className="flex flex-col gap-[16px]">
                  <div className="flex flex-col w-full">
                    <div className="flex items-center gap-[8px] self-stretch">
                      <div className="flex flex-1 items-center gap-[8px]">
                        <div className="text-[16px] font-semibold">
                          Delete
                        </div>
                        <div className="flex">
                          <Icon icon="solar:info-circle-bold" size={16} style={{ color: "var(--yellow)" }} />
                        </div>
                      </div>
                    </div>

                    <div className="text-grey-lighter text-base font-normal">
                      Are you sure to delete this project?
                    </div>
                  </div>

                  <div className="flex justify-center items-center gap-[12px]">
                      <MyButton
                        variant="bordered"
                        color="yellow"
                        children="Cancel"
                        onPress={() => closeAllModals()}
                        className="w-full px-[24px]"
                      />

                    <MyButton
                      color="yellow"
                      children="Continue"
                      onPress={() => openModal("deleteProjectOtp")}
                      className="w-full px-[24px]"
                    />
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={openModals["deleteProjectOtp"]} hideCloseButton={true}>
        <ModalContent className="overflow-visible">
          {() => (
            <>
              <ModalBody className="px-[25px] py-[20px]">
                <div className="flex flex-col px-[42px] py-[54px] gap-[16px] self-stretch">
                  <Icon icon="solar:shield-keyhole-outline" height={37} className="self-center" />

                  <div className="self-center">
                    <span className="text-[16px] font-semibold">Verify Your Email</span>
                  </div>

                  <div className="flex flex-col gap-[5px] self-stretch">
                    <span className="self-center text-grey-light-active ">We have just sent a 6-digit code to</span>
                    <span className="self-center">user@email.com</span>
                  </div>

                  <OTPInput onChange={(val) => handleOtp(val)} />

                  <div className="flex self-center">
                    <MyButton
                      variant="bordered"
                      size="sm"
                      className="border border-grey-light-active"
                      // isDisabled={!enableResend}
                      children={
                        <div className="text-[12px]">
                          Resend the code
                          {/* {!enableResend && ( */}
                          <> in <span className="font-bold">
                            {getTimerString()}
                          </span>
                          </>
                          {/* )} */}
                        </div>
                      }
                    />
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
