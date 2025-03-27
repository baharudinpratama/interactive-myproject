"use client";

import MyButton from "@/app/components/button";
import MyInput from "@/app/components/input";
import { Icon } from "@iconify-icon/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

export default function Page() {
  const router = useRouter();
  const t = useTranslations();

  const [emailValue, setEmailValue] = useState("");

  const validateEmail = (emailValue: string) => emailValue.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (emailValue === "") return false;

    return validateEmail(emailValue) ? false : true;
  }, [emailValue]);

  const [emailSent, setEmailSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main>
      <div className="flex w-screen h-screen justify-center items-center bg-orange-50" style={{ backgroundImage: "url('/bg-waves.png')", backgroundSize: "cover", }}>
        {/* Main content */}
        <div className="flex flex-col px-[75px] py-[54px] items-start bg-white rounded-[8px] shadow-lg ">
          <div className="flex flex-col gap-[42px] self-stretch">
            <form className="flex flex-col w-[344px] gap-[16px] self-stretch" action="#">
              <div className="flex flex-col gap-[4px] self-stretch">
                <div className="flex justify-center">
                  <Image src={"/logo-myproject-yellow.png"} alt={"logo-myproject"} width={192} height={56} />
                </div>

                <p className="text-center text-grey-light-active">
                  {emailSent
                    ? (t("ForgetPassword.titleResetPassword"))
                  : (t("ForgetPassword.title"))}
                </p>
              </div>

              {!emailSent && (
                <MyInput
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  placeholder={t("form.email.placeholder")}
                  maxLength={254}
                  onValueChange={setEmailValue}
                  isInvalid={isInvalid}
                  errorMessage="Please enter a valid email"
                />
              )}

              {emailSent && (
                <>
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
                </>
              )}

              {emailSent
                ?
                <MyButton
                  color="yellow"
                  children={t("continue")}
                  onPress={() => {
                    router.push("sign-in?use-password");
                  }}
                />
                : <>
                  <MyButton
                    color="yellow"
                    children={t("send")}
                    onPress={() => { setEmailSent(true); }}
                  />

                  <MyButton
                    variant="bordered"
                    color="yellow"
                    children={t("cancel")}
                    onPress={() => router.push("sign-in?use-password")}
                  />
                </>
              }
            </form>
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
    </main>
  );
}
