"use client";

import MyButton from "@/app/components/button";
import MyCheckbox from "@/app/components/checkbox";
import { useCountdownTimer } from "@/app/components/countdown-timer";
import MyInput from "@/app/components/input";
import OTPInput from "@/app/components/otp-input";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import { Icon } from "@iconify-icon/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function Page() {
  const router = useRouter();
  const t = useTranslations();

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [showVerifyEmail, setShowVerifyEmail] = useState(false);

  const otp = "123123";
  const [emailVerified, setEmailVerified] = useState(false);

  const handleOtp = (val: string) => {
    if (val === otp) {
      setEmailVerified(true);
      setShowVerifyEmail(false);
    }
  }

  const {
    getTimerString,
    startTimer
  } = useCountdownTimer(5, 'sign-up-verification-timer');

  useEffect(() => {
    if (getTimerString() === '00:00') {
      startTimer();
    }
  }, []);

  // const [enableResend, setEnableResend] = useState(false);

  // const handleResend = () => {
  //   setEnableResend(true);
  // }

  return (
    <>
      <div className="flex flex-col w-screen h-screen justify-center items-center" style={{ backgroundImage: "url('/bg-waves.png')", backgroundSize: "cover", }}>
        <div className="flex flex-col xs:mx-4 px-[75px] py-[54px] items-start bg-white rounded-[8px] shadow-lg">
          <div className="flex flex-col gap-[42px] self-stretch">
            <div className="flex flex-col md:min-w-[344px] gap-[16px] self-stretch">
              <div className="flex flex-col items-center gap-[4px] self-stretch">
                <Image src={"/logo-myproject-yellow.png"} alt={"logo myproject"} width={192} height={56} />

                <p className="max-w-[254px] text-center text-grey-light-active">
                  {t("SignIn.title")}
                </p>
              </div>

              {!emailVerified && (
                <>
                  <MyInput
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    autoComplete="true"
                    placeholder={t("form.email.placeholder")}
                    maxLength={254}
                    // onValueChange={setEmailValue}
                    // isInvalid={isInvalid}
                    errorMessage="Please enter a valid email"
                  />

                  <MyInput
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    placeholder={t("form.password.placeholder")}
                    endContent={
                      <div role="button" onClick={togglePassword}>
                        {showPassword ? <Icon icon="solar:eye-bold" width={18} /> : <Icon icon="solar:eye-closed-bold" width={18} />}
                      </div>
                    }
                  />

                  <MyInput
                    id="confirm-password"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    label="Confirm Password"
                    placeholder={t("form.password.placeholder")}
                    endContent={
                      <div role="button" onClick={togglePassword}>
                        {showPassword ? <Icon icon="solar:eye-bold" width={18} /> : <Icon icon="solar:eye-closed-bold" width={18} />}
                      </div>
                    }
                  />

                  <MyCheckbox
                    name="tncAgreement"
                    color="yellow"
                    children={<p className="text-[12px] text-grey-light-active">{t("termsAndConditions")}</p>}
                    classNames={{
                      wrapper: "!size-[16px] before:size-[16px] after:size-[16px]",
                    }}
                  />

                  <MyButton
                    color="yellow"
                    size="lg"
                    children={t("continue")}
                    onPress={() => {
                      setShowVerifyEmail(true); if (getTimerString() === '00:00') {
                        startTimer();
                      }
                    }}
                  />
                </>
              )}

              {emailVerified && (
                <>
                  <MyInput
                    id="first-name"
                    name="firstName"
                    label={t("firstName")}
                    placeholder={t("form.firstName.placeholder")}
                    maxLength={254}
                  />

                  <MyInput
                    id="last-name"
                    name="lastName"
                    label={t("lastName")}
                    placeholder={t("form.lastName.placeholder")}
                    maxLength={254}
                  />

                  <MyInput
                    id="phone-number"
                    name="phoneNumber"
                    type="number"
                    label={t("phoneNumber")}
                    placeholder={t("form.phoneNumber.placeholder")}
                    maxLength={16}
                    endContent={<Icon icon="solar:school-document-broken" height={18} />}
                  />

                  <MyButton
                    color="yellow"
                    size="lg"
                    children={t("signUp")}
                    onPress={() => router.push("/dashboard")}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Help center button */}
        <MyButton
          color="yellow"
          size="sm"
          className="absolute bottom-[24px] right-[24px] w-[40px] h-[40px] rounded-full"
          children={
            <Icon icon="solar:question-circle-linear" width={20} />
          }
          isIconOnly={true}
        />
      </div>

      <Modal isOpen={showVerifyEmail} onClose={() => setShowVerifyEmail(false)} hideCloseButton={true} size="lg">
        <ModalContent>
          {() => (
            <>
              <ModalBody className="p-0 rouded-[8px]">
                <div className="flex flex-col px-[42px] py-[54px] gap-[16px] self-stretch">
                  <Icon icon="solar:shield-keyhole-linear" width={37} className="self-center" />

                  <div className="self-center">
                    <span className="text-[16px] font-semibold">{t("otp.verifyEmail")}</span>
                  </div>

                  <div className="flex flex-col gap-[5px] self-stretch">
                    <span className="self-center text-grey-light-active ">{t("otp.otpSent")}</span>
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
                        <div className="flex text-[12px] gap-[4px]">
                          {t("otp.resend")}
                          {/* {!enableResend && ( */}
                          <span className="font-bold">
                            {getTimerString()}
                          </span>
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
