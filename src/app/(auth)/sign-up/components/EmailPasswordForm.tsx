"use client";

import MyButton from "@/app/components/button";
import MyCheckbox from "@/app/components/checkbox";
import MyInput from "@/app/components/input";
import { useModalContext } from "@/app/contexts/modal";
import { addToast } from "@heroui/react";
import { Icon } from "@iconify-icon/react";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useState } from "react";

import useAuthStore from "../states/AuthStore";

interface EmailPasswordFormProps {
  showPassword: boolean;
  togglePassword: () => void;
  onContinue: () => void;
}

export default function EmailPasswordForm({
  showPassword,
  togglePassword,
  onContinue
}: EmailPasswordFormProps) {
  const t = useTranslations();
  const { form, updateForm } = useAuthStore();
  const { openModal, closeModal } = useModalContext();

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [isAgree, setIsAgree] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleContinue = async (event: any) => {
    if (event.type === "submit") {
      event.preventDefault();
    }

    if (!validateEmail(form.email)) {
      setIsInvalid(true);
      return;
    }

    if (form.password === "" || confirmPassword === "") {
      return addToast({
        color: "danger",
        title: "Failed",
        description: "Password required.",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    }

    if (form.password.trim().length < 6) {
      return addToast({
        color: "danger",
        title: "Failed",
        description: "Password at least 6 characters.",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    }

    if (form.password !== confirmPassword) {
      return addToast({
        color: "danger",
        title: "Failed",
        description: "Password not match.",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    }

    if (!isAgree) {
      return addToast({
        color: "danger",
        title: "Failed",
        description: "You must agree to the Terms & Conditions to continue.",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    }

    try {
      openModal("modalLoading");

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/check-email`, {
        email: form.email,
        password: form.password,
        context: "sign-up"
      }).then(response => {
        if (response.data.success) {
          onContinue();
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
          description: `Something went wrong: ${error}`,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      }
    } finally {
      closeModal("modalLoading");
    }
  };

  return (
    <form className="flex flex-col gap-[16px]" onSubmit={handleContinue}>
      <MyInput
        id="email"
        name="email"
        type="email"
        label="Email"
        autoComplete="true"
        placeholder={t("form.email.placeholder")}
        maxLength={254}
        value={form.email}
        onValueChange={(value: string) => {
          updateForm({ email: value });
          setIsInvalid(false);
        }}
        isInvalid={isInvalid}
        errorMessage="Please enter a valid email"
      />

      <MyInput
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        label="Password"
        placeholder={t("form.password.placeholder")}
        value={form.password}
        onValueChange={(value: string) => {
          updateForm({ password: value });
        }}
        endContent={
          <div role="button" className="flex items-center justify-items-center" onClick={togglePassword}>
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
        value={confirmPassword}
        onValueChange={setConfirmPassword}
        endContent={
          <div role="button" className="flex items-center justify-items-center" onClick={togglePassword}>
            {showPassword ? <Icon icon="solar:eye-bold" width={18} /> : <Icon icon="solar:eye-closed-bold" width={18} />}
          </div>
        }
      />

      <MyCheckbox
        name="tncAgreement"
        color="yellow"
        isSelected={isAgree}
        onValueChange={setIsAgree}
        children={<p className="text-[12px] text-grey-light-active">{t("termsAndConditions")}</p>}
        classNames={{
          wrapper: "!size-[16px] before:size-[16px] after:size-[16px]",
        }}
      />

      <MyButton
        type="submit"
        color="yellow"
        size="lg"
        children={t("continue")}
      />
    </form>
  );
}
