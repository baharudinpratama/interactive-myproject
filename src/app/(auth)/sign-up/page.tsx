"use client";

import MyButton from "@/app/components/button";
import { useCountdownTimer } from "@/app/components/countdown-timer";
import { useModalContext } from "@/app/contexts/modal";
import { Image } from "@heroui/image";
import { addToast } from "@heroui/react";
import { Icon } from "@iconify-icon/react";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import EmailPasswordForm from "./components/EmailPasswordForm";
import EmailVerificationModal from "./components/EmailVerificationModal";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import useAuthStore from "./states/AuthStore";

export default function Page() {
  const router = useRouter();
  const t = useTranslations();
  const { form, resetForm } = useAuthStore();
  const { openModal, closeModal } = useModalContext();

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [showVerifyEmail, setShowVerifyEmail] = useState(false);

  const otp = "123123";
  const [emailVerified, setEmailVerified] = useState(false);

  const {
    getTimerString,
    startTimer
  } = useCountdownTimer(5, "sign-up-verification-timer");

  useEffect(() => {
    if (getTimerString() === "00:00") {
      startTimer();
    }
  }, []);

  const handleSignUpForm = async () => {
    const fullName = `${form.firstName} ${form.lastName}`.trimEnd();

    try {
      openModal("modalLoading");

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/sign-up`, {
        "email": form.email,
        "password": form.password,
        "fullName": fullName,
        "nickname": form.firstName,
        "phoneNumber": form.phoneNumber,
      }).then((response: any) => {
        if (response.data.success) {
          addToast({
            color: "success",
            title: "Success",
            description: response.data.message,
            timeout: 3000,
            shouldShowTimeoutProgress: true,
          });
          resetForm();
          router.push('/sign-in');
        }
      });
    } catch (error: any) {
      if (error.response && error.response?.status === 422) {
        const errors = error.response.data.message;
        addToast({
          color: "danger",
          title: "Error",
          description: `Validation error: ${errors}`,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      } else {
        console.log("Something went wrong:", error.message);
      }
    } finally {
      closeModal("modalLoading");
    }
  }

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
                <Image src={"/logo-myproject-yellow.png"} alt={"logo myproject"} height={56} radius="none" />

                <p className="max-w-[254px] text-center text-grey-light-active">
                  {t("SignUp.title")}
                </p>
              </div>

              {!emailVerified && (
                <EmailPasswordForm
                  showPassword={showPassword}
                  togglePassword={togglePassword}
                  onContinue={() => {
                    setShowVerifyEmail(true);
                    if (getTimerString() === '00:00') {
                      startTimer();
                    }
                  }}
                />
              )}

              {emailVerified && (
                <PersonalDetailsForm
                  onSignUp={() => handleSignUpForm()}
                />
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

      <EmailVerificationModal
        isOpen={showVerifyEmail}
        onClose={() => setShowVerifyEmail(false)}
        onOtpVerified={() => {
          setEmailVerified(true);
          setShowVerifyEmail(false);
        }}
        timerString={getTimerString()}
        otp={otp}
      />
    </>
  );
}
