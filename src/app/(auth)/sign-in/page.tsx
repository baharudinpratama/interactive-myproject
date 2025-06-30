"use client";

import MyButton from "@/app/components/button";
import { useCountdownTimer } from "@/app/components/countdown-timer";
import MyInput from "@/app/components/input";
import ModalLoading from "@/app/components/modal-loading";
import { useLanguage } from "@/app/contexts/language";
import { useModalContext } from "@/app/contexts/modal";
import { Image } from "@heroui/image";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { addToast } from "@heroui/toast";
import { Icon } from "@iconify-icon/react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
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
  const { openModal: openModalGlobal, closeModal: closeModalGlobal } = useModalContext();

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(true);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useMemo(() => {
    if (email === "") return setIsInvalid(false);

    return validateEmail(email) ? setIsInvalid(false) : setIsInvalid(true);
  }, [email]);

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

  const handleSignIn = async (event: any) => {
    if (event.type === "submit") {
      event.preventDefault();
    }

    if (usePassword) {
      if (!password) {
        return addToast({
          color: "danger",
          title: "Failed",
          description: "Please provide password.",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      }

      try {
        openModalGlobal("modalLoading");

        const res = await signIn("credentials", { email: email, password: password, redirect: false });

        if (res?.ok) {
          router.push("/dashboard");
          closeModalGlobal("modalLoading");
        } else {
          addToast({
            color: "danger",
            title: "Failed",
            description: "Invalid password.",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
          });
          closeModalGlobal("modalLoading");
        }
      } catch (error: any) {
        if (error.response?.status) {
          addToast({
            color: "danger",
            title: "Failed",
            description: error.response.data.message,
            timeout: 3000,
            shouldShowTimeoutProgress: true,
          });
          closeModalGlobal("modalLoading");
        } else {
          addToast({
            color: "danger",
            title: "Error",
            description: "Something went wrong.",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
          });
          closeModalGlobal("modalLoading");
        }
      }
    } else {
      if (!validateEmail(email)) {
        setIsInvalid(true);
        return;
      }

      try {
        openModalGlobal("modalLoading");

        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/check-email`, {
          email: email,
          context: "sign-in"
        }).then(response => {
          if (response.data.success) {
            openModal(0);
            if (getTimerString() === "00:00") {
              startTimer();
            }
          }
        });
      } catch (error: any) {
        if (error.response?.status) {
          addToast({
            color: "danger",
            title: "Failed",
            description: error.response.data.message,
            timeout: 3000,
            shouldShowTimeoutProgress: true,
          });
        } else {
          addToast({
            color: "danger",
            title: "Error",
            description: "Something went wrong.",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
          });
        }
      } finally {
        closeModalGlobal("modalLoading");
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
          <form className="flex flex-col md:min-w-[344px] gap-[16px] self-stretch" onSubmit={handleSignIn}>
            <div className="flex flex-col items-center gap-[4px] self-stretch">
              <Image src={"/logo-myproject-yellow.png"} alt={"logo-myproject"} width={192} height={56} radius="none" />

              <p className="max-w-[344px] text-center text-grey-light-active">
                {usePassword
                  ? (t("SignIn.titleUsePassword"))
                  : (t("SignIn.title"))}
              </p>
            </div>

            {!usePassword && (
              <MyInput
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder={t("form.email.placeholder")}
                maxLength={254}
                autoComplete="true"
                value={email}
                onValueChange={setEmail}
                isInvalid={isInvalid}
                errorMessage="Please enter a valid email"
              />
            )}

            {usePassword && (
              <>
                <div className="flex px-[10px] py-[6px] items-center gap-[8px] self-center border rounded-[144px]">
                  <div className="flex items-center justify-center w-6 h-6 text-white bg-[#6985FF] rounded-full">
                    {email[0].toUpperCase()}
                  </div>
                  {email}
                </div>

                <MyInput
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  placeholder={t("form.password.placeholder")}
                  maxLength={254}
                  value={password}
                  onValueChange={setPassword}
                  endContent={
                    <div role="button" className="flex items-center justify-items-center" onClick={togglePassword}>
                      {showPassword ? <Icon icon="solar:eye-bold" width={18} /> : <Icon icon="solar:eye-closed-bold" width={18} />}
                    </div>
                  }
                />

                <div className="flex xs:flex-col justify-between items-end">
                  <Link href="/forget-password">
                    <span className="text-[12px] text-grey-light-active">
                      {t("forgetPassword")}?
                    </span>
                  </Link>
                </div>
              </>
            )}

            <MyButton
              color="yellow"
              children={t("signIn")}
              onPress={handleSignIn}
            />

            {!usePassword && (
              <div className="flex flex-col gap-[16px] self-stretch">
                <div className="flex gap-[10px] justify-center items-center self-stretch">
                  <div className="flex h-[1px] w-full bg-grey-lighter"></div>
                  <div className="text-grey-light-active text-center text-[12px] font-semibold">{t("or")}</div>
                  <div className="flex h-[1px] w-full bg-grey-lighter"></div>
                </div>

                <MyButton
                  variant="bordered"
                  startContent={
                    <Icon icon="fa-brands:google" height={16} />
                  }
                  onPress={() => signIn("google")}
                  children={t("signInWith", { provider: "Google" })}
                />
              </div>
            )}
          </form>

          {!usePassword && (
            <div className="flex justify-center items-center gap-[6px]">
              <div className="text-grey-light-active">{t("SignIn.noAccount")}</div>
              <Link href={"/sign-up"} className="text-yellow-hover font-bold focus:outline-yellow-hover focus:outline-offset-2">{t("signUp")}</Link>
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
        <Select name="selectLanguage" aria-label="Select language" selectedKeys={[locale]} onSelectionChange={(item) => { if (item.currentKey) { setLocale(item.currentKey) } }}>
          <SelectItem key="en">
            EN
          </SelectItem>
          <SelectItem key="id">
            ID
          </SelectItem>
        </Select>
      </div>

      <Modal isOpen={openModals[0] ?? false} onClose={() => closeModal(0)} hideCloseButton={true} size="lg">
        <ModalContent>
          {() => (
            <>
              <ModalBody className="p-0 rouded-[8px]">
                <div className="flex flex-col px-[42px] py-[54px] gap-[16px] self-stretch">
                  <Icon icon="solar:lock-keyhole-linear" width={37} className="self-center" />

                  <div className="self-center">
                    <span className="text-[16px] font-semibold">{t("SignIn.verifyTitle")}</span>
                  </div>

                  <div className="flex flex-col gap-[5px] self-stretch">
                    <p className="self-center text-center text-grey-light-active">
                      {t("SignIn.verifySubtitle")}
                    </p>

                    <div className="flex px-[10px] py-[6px] items-center gap-[8px] self-center border rounded-[144px]">
                      <div className="flex items-center justify-center w-6 h-6 text-white bg-[#6985FF] rounded-full">
                        {email[0].toUpperCase()}
                      </div>
                      {email}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <span className="text-[25px] font-bold">18</span>
                  </div>

                  <div className="flex flex-col gap-[5px] self-stretch">
                    <span className="flex justify-center">
                      {t("SignIn.checkOtherDevice")}
                    </span>

                    <p className="text-center text-grey-light-active">
                      {t("SignIn.otherDeviceMessage")}
                      {/* Swipe down the notification panel and tap on the new notification. Then, select <span className="text-grey-dark-active font-bold">'Yes'</span> and press <span className="text-grey-dark-active font-bold">18</span> in the app to confirm your login. */}
                    </p>
                  </div>

                  <div className="flex justify-center items-center gap-[5px]">
                    <div className="text-grey-light-active">{t("SignIn.noCode")}</div>
                    {canTriggerAction() ? (
                      <Link href="#" className="text-yellow font-bold">{t("resend")}</Link>
                    ) : (
                      <span className="text-grey-light-active font-bold">{getTimerString()}</span>
                    )}
                  </div>

                  <div className="flex justify-center items-center">
                    <button type="button" className="text-yellow font-bold" onClick={(e) => { closeModal(0); openModal(1); }}>{t("SignIn.tryOtherWay")}</button>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={openModals[1] ?? false} onClose={() => closeModal(1)} hideCloseButton={true} size="lg">
        <ModalContent>
          {() => (
            <>
              <ModalBody className="p-0 rouded-[8px]">
                <div className="flex flex-col px-[42px] py-[54px] gap-[16px] self-stretch">
                  <Icon icon="solar:shield-keyhole-linear" width={37} className="self-center" />

                  <div className="self-center">
                    <span className="text-[16px] font-semibold">{t("SignIn.verifyTitle")}</span>
                  </div>

                  <div className="flex flex-col gap-[5px] self-stretch">
                    <p className="self-center text-center text-grey-light-active">
                      {t("SignIn.verifySubtitle")}
                    </p>

                    <div className="flex px-[10px] py-[6px] items-center gap-[8px] self-center border rounded-[144px]">
                      <div className="flex items-center justify-center w-6 h-6 text-white bg-[#6985FF] rounded-full">
                        {email[0].toUpperCase()}
                      </div>
                      {email}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    {t("SignIn.chooseOption.title")}:
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
                        {t("SignIn.chooseOption.chooseYes")}
                        {/* Choose <span className="font-bold">'Yes'</span> on InterActive Holic */}
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
                        {t("SignIn.chooseOption.enterPassword")}
                      </p>
                    }
                  />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <ModalLoading />
    </div>
  );
}
