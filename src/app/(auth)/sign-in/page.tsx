"use client";

import MyButton from "@/app/components/button";
import MyCheckbox from "@/app/components/checkbox";
import { useCountdownTimer } from "@/app/components/countdown-timer";
import MyInput from "@/app/components/input";
import { useLanguage } from "@/app/contexts/language";
import { Image } from "@heroui/image";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { Icon } from "@iconify-icon/react";
import { signIn, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const { locale, setLocale } = useLanguage();
  const { data: session } = useSession();

  const [openModals, setOpenModals] = useState<boolean[]>([]);

  const openModal = (index: number) => {
    setOpenModals((prev) => {
      const newModals = [...prev];
      newModals[index] = true;
      return newModals;
    });
  };

  const closeModal = (index: number) => {
    setOpenModals((prev) => {
      const newModals = [...prev];
      newModals[index] = false;
      return newModals;
    });
  };

  const [emailValue, setEmailValue] = useState("");

  const validateEmail = (emailValue: string) => emailValue.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (emailValue === "") return false;

    return validateEmail(emailValue) ? false : true;
  }, [emailValue]);

  const {
    getTimerString,
    canTriggerAction,
    startTimer
  } = useCountdownTimer(10, "sign-in-code-timer");

  const [usePassword, setUsePassword] = useState(searchParams.has("use-password"));
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = () => {
    if (usePassword) {
      router.push("/dashboard");
    } else {
      openModal(0);
      if (getTimerString() === '00:00') {
        startTimer();
      }
    }
  }

  useEffect(() => {
    if (searchParams.has("use-password")) {
      router.replace("/sign-in");
    }

    if (session) {
      router.push("/dashboard");
    }
  }, [router, session]);

  return (
    <div className="flex w-screen h-screen justify-center items-center bg-orange-50" style={{ backgroundImage: "url('/bg-waves.png')", backgroundSize: "cover", }}>
      {/* Main content */}
      <div className="flex flex-col xs:mx-4 px-[75px] py-[54px] items-start bg-white rounded-[8px] shadow-lg">
        <div className="flex flex-col gap-[42px] self-stretch">
          <form className="flex flex-col md:min-w-[344px] gap-[16px] self-stretch" action="#">
            <div className="flex flex-col items-center gap-[4px] self-stretch">
              <Image src={"/logo-myproject-yellow.png"} alt={"logo-myproject"} width={192} height={56} radius="none" />

              <p className="max-w-[254px] text-center text-grey-light-active">
                {usePassword
                  ? ("Please enter your password to continue and access your account.")
                  : ("Please use your credentials to sign in.")}
              </p>
            </div>

            {!usePassword && (
              <MyInput
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
                maxLength={254}
                onValueChange={setEmailValue}
                isInvalid={isInvalid}
                errorMessage="Please enter a valid email"
              />
            )}

            {usePassword && (
              <>
                <div className="flex px-[10px] py-[6px] items-center gap-[8px] self-center border rounded-[144px]" onClick={() => router.push("/dashboard")}>
                  <div className="flex items-center justify-center w-6 h-6 text-white bg-[#6985FF] rounded-full">
                    U
                  </div>
                  user@email.com
                </div>

                <MyInput
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  placeholder="Enter your password"
                  maxLength={254}
                  endContent={
                    <div role="button" onClick={togglePassword}>
                      {showPassword ? <Icon icon="solar:eye-bold" width={18} /> : <Icon icon="solar:eye-closed-bold" width={18} />}
                    </div>
                  }
                />

                <div className="flex xs:flex-col justify-between items-center">
                  <MyCheckbox
                    color="yellow"
                    children={
                      <span className="text-[12px] text-grey-light-active">
                        I Agree with Terms & Conditions
                      </span>
                    }
                    classNames={{
                      wrapper: "!size-[16px] before:size-[16px] after:size-[16px]",
                    }}
                  />

                  <Link href="/forget-password">
                    <span className="text-[12px] text-grey-light-active">
                      Forget Password?
                    </span>
                  </Link>
                </div>
              </>
            )}

            <MyButton
              color="yellow"
              children={t("sign-in")}
              onPress={handleSignIn}
            />

            {!usePassword && (
              <div className="flex flex-col gap-[16px] self-stretch">
                <div className="flex gap-[10px] justify-center items-center self-stretch">
                  <div className="flex h-[1px] w-full bg-grey-lighter"></div>
                  <div className="text-grey-light-active text-center text-[12px] font-semibold">Or</div>
                  <div className="flex h-[1px] w-full bg-grey-lighter"></div>
                </div>

                <MyButton
                  variant="bordered"
                  startContent={
                    <Image src={"/icon-google-gray.png"} alt={"google-icon"} height={16} radius="none" />
                  }
                  onPress={() => signIn("google", { callbackUrl: "/dashboard" })}
                  children="Sign in with Google"
                />
              </div>
            )}
          </form>

          {!usePassword && (
            <div className="flex justify-center items-center gap-[6px]">
              <div className="text-grey-light-active">Don't have an account?</div>
              <Link href={"/sign-up"} className="text-yellow-hover font-bold focus:outline-yellow-hover focus:outline-offset-2">Sign Up</Link>
            </div>
          )}
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

      {/* Language */}
      <div className="absolute w-20 top-[24px] right-[24px]">
        <Select aria-label="Select language" selectedKeys={[locale]} onSelectionChange={(item) => { if (item.currentKey) { setLocale(item.currentKey) } }}>
          <SelectItem key="en">
            EN
          </SelectItem>
          <SelectItem key="id">
            ID
          </SelectItem>
        </Select>
      </div>

      <Modal isOpen={openModals[0]} onClose={() => closeModal(0)} hideCloseButton={true} size="lg">
        <ModalContent>
          {() => (
            <>
              <ModalBody className="p-0 rouded-[8px]">
                <div className="flex flex-col px-[42px] py-[54px] gap-[16px] self-stretch">
                  <Icon icon="solar:lock-keyhole-linear" width={37} className="self-center" />

                  <div className="self-center">
                    <span className="text-[16px] font-semibold">Sign in with your InterActive ID</span>
                  </div>

                  <div className="flex flex-col gap-[5px] self-stretch">
                    <p className="self-center text-center text-grey-light-active">
                      To help secure your account, InterActive Holic wants to ensure it's really you trying to sign in
                    </p>

                    <div className="flex px-[10px] py-[6px] items-center gap-[8px] self-center border rounded-[144px]" onClick={() => router.push("/dashboard")}>
                      <div className="flex items-center justify-center w-6 h-6 text-white bg-[#6985FF] rounded-full">
                        U
                      </div>
                      user@email.com
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <span className="text-[25px] font-bold">18</span>
                  </div>

                  <div className="flex flex-col gap-[5px] self-stretch">
                    <span className="flex justify-center">
                      Check your InterActive Holic on another device.
                    </span>

                    <p className="text-center text-grey-light-active">
                      Swipe down the notification panel and tap on the new notification. Then, select <span className="text-grey-dark-active font-bold">'Yes'</span> and press <span className="text-grey-dark-active font-bold">18</span> in the app to confirm your login.
                    </p>
                  </div>

                  <div className="flex justify-center items-center gap-[5px]">
                    <div className="text-grey-light-active">Didn't get the code?</div>
                    {canTriggerAction() ? (
                      <Link href="#" className="text-yellow font-bold">Resend</Link>
                    ) : (
                      <span className="text-grey-light-active font-bold">{getTimerString()}</span>
                    )}
                  </div>

                  <div className="flex justify-center items-center">
                    <button type="button" className="text-yellow font-bold" onClick={(e) => { closeModal(0); openModal(1); }}>Try another way</button>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={openModals[1]} onClose={() => closeModal(1)} hideCloseButton={true} size="lg">
        <ModalContent>
          {() => (
            <>
              <ModalBody className="p-0 rouded-[8px]">
                <div className="flex flex-col px-[42px] py-[54px] gap-[16px] self-stretch">
                  <Icon icon="solar:shield-keyhole-linear" width={37} className="self-center" />

                  <div className="self-center">
                    <span className="text-[16px] font-semibold">Sign in with your InterActive ID</span>
                  </div>

                  <div className="flex flex-col gap-[5px] self-stretch">
                    <p className="self-center text-center text-grey-light-active">
                      To help secure your account, InterActive MyProject wants to ensure it"s really you trying to sign in
                    </p>

                    <div className="flex px-[10px] py-[6px] items-center gap-[8px] self-center border rounded-[144px]" onClick={() => router.push("/dashboard")}>
                      <div className="flex items-center justify-center w-6 h-6 text-white bg-[#6985FF] rounded-full">
                        U
                      </div>
                      user@email.com
                    </div>
                  </div>

                  <div className="flex justify-center">
                    Choose how you want to sign in:
                  </div>

                  <MyButton
                    variant="bordered"
                    color="yellow"
                    size="lg"
                    onPress={() => { closeModal(1); openModal(0); }}
                    className="border-grey-light-active text-grey-dark-active"
                    startContent={
                      <Icon icon="solar:monitor-smartphone-outline" size={16} style={{ color: "var(--yellow)" }} />
                    }
                    children={
                      <p className="text-base">
                        Choose <span className="font-bold">'Yes'</span> on InterActive Holic
                      </p>
                    }
                  />

                  <MyButton
                    variant="bordered"
                    color="yellow"
                    size="lg"
                    onPress={() => { setUsePassword(true); closeModal(1); }}
                    className="border-grey-light-active text-grey-dark-active"
                    startContent={
                      <Icon icon="solar:lock-keyhole-linear" size={16} style={{ color: "var(--yellow)" }} />
                    }
                    children={
                      <p className="text-base">
                        Enter your password
                      </p>
                    }
                  />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
