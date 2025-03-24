"use client";

import MyButton from "@/app/components/button";
import MyCheckbox from "@/app/components/checkbox";
import { useCountdownTimer } from "@/app/components/countdown-timer";
import MyInput from "@/app/components/input";
import OTPInput from "@/app/components/otp-input";
import { Icon } from "@iconify-icon/react";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();

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
              <div className="flex flex-col gap-[4px] self-stretch">
                <Image src={"/logo-myproject-yellow.png"} alt={"logo myproject"} width={192} height={56} />

                <p className="max-w-[254px] text-center text-grey-light-active">
                  Please use your credentials to sign in.
                </p>
              </div>

              {!emailVerified && (
                <>
                  <MyInput
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    maxLength={254}
                  />

                  <MyInput
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    placeholder="Enter your password"
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
                    placeholder="Enter your password"
                    endContent={
                      <div role="button" onClick={togglePassword}>
                        {showPassword ? <Icon icon="solar:eye-bold" width={18} /> : <Icon icon="solar:eye-closed-bold" width={18} />}
                      </div>
                    }
                  />

                  <MyCheckbox
                    color="yellow"
                    children={<p className="text-[12px] text-grey-light-active">I Agree with Terms & Conditions</p>}
                    classNames={{
                      wrapper: "!size-[16px] before:size-[16px] after:size-[16px]",
                    }}
                  />

                  <MyButton
                    color="yellow"
                    size="lg"
                    children="Continue"
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
                    label="First Name"
                    placeholder="Enter your first name"
                    maxLength={254}
                  />

                  <MyInput
                    id="last-name"
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your last name"
                    maxLength={254}
                  />

                  <MyInput
                    id="phone-number"
                    name="phoneNumber"
                    type="number"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    maxLength={16}
                    endContent={
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6.00002V6.75002H18.75V6.00002H18ZM15.7172 2.32614L15.6111 1.58368L15.7172 2.32614ZM4.91959 3.86865L4.81353 3.12619H4.81353L4.91959 3.86865ZM5.07107 6.75002H18V5.25002H5.07107V6.75002ZM18.75 6.00002V4.30604H17.25V6.00002H18.75ZM15.6111 1.58368L4.81353 3.12619L5.02566 4.61111L15.8232 3.0686L15.6111 1.58368ZM4.81353 3.12619C3.91638 3.25435 3.25 4.0227 3.25 4.92895H4.75C4.75 4.76917 4.86749 4.63371 5.02566 4.61111L4.81353 3.12619ZM18.75 4.30604C18.75 2.63253 17.2678 1.34701 15.6111 1.58368L15.8232 3.0686C16.5763 2.96103 17.25 3.54535 17.25 4.30604H18.75ZM5.07107 5.25002C4.89375 5.25002 4.75 5.10627 4.75 4.92895H3.25C3.25 5.9347 4.06532 6.75002 5.07107 6.75002V5.25002Z" fill="currentColor" />
                        <path d="M8 12H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M8 15.5H13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M4 6V19C4 20.6569 5.34315 22 7 22H17C18.6569 22 20 20.6569 20 19V14M4 6V5M4 6H17C18.6569 6 20 7.34315 20 9V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    }
                  />

                  <MyButton
                    color="yellow"
                    size="lg"
                    children="Sign Up"
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
