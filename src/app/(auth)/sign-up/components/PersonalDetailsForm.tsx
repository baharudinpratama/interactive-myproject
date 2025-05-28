"use client";

import MyButton from "@/app/components/button";
import MyInput from "@/app/components/input";
import { addToast } from "@heroui/toast";
import { Icon } from "@iconify-icon/react";
import { useTranslations } from "next-intl";

import useAuthStore from "../states/AuthStore";

interface PersonalDetailsFormProps {
  onSignUp: () => void;
}

export default function PersonalDetailsForm({ onSignUp }: PersonalDetailsFormProps) {
  const t = useTranslations();

  const { form, updateForm } = useAuthStore();

  const handleSignUp = async (event: any) => {
    if (event.type === "submit") {
      event.preventDefault();
    }

    if (form.firstName === "") {
      return addToast({
        color: "danger",
        title: "Failed",
        description: "First name required.",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    }

    if (form.lastName === "") {
      return addToast({
        color: "danger",
        title: "Failed",
        description: "Last name required.",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    }

    if (form.phoneNumber === "") {
      return addToast({
        color: "danger",
        title: "Failed",
        description: "Phone number required.",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    }

    onSignUp();
  };

  return (
    <form className="flex flex-col gap-[16px]" onSubmit={handleSignUp}>
      <MyInput
        id="first-name"
        name="firstName"
        label={t("firstName")}
        placeholder={t("form.firstName.placeholder")}
        maxLength={254}
        value={form.firstName}
        onValueChange={(value: string) => {
          updateForm({ firstName: value });
        }}
      />

      <MyInput
        id="last-name"
        name="lastName"
        label={t("lastName")}
        placeholder={t("form.lastName.placeholder")}
        maxLength={254}
        value={form.lastName}
        onValueChange={(value: string) => {
          updateForm({ lastName: value });
        }}
      />

      <MyInput
        id="phone-number"
        name="phoneNumber"
        label={t("phoneNumber")}
        placeholder={t("form.phoneNumber.placeholder")}
        maxLength={16}
        value={form.phoneNumber}
        onValueChange={(value: string) => {
          updateForm({ phoneNumber: value });
        }}
        endContent={<Icon icon="solar:school-document-broken" height={18} />}
      />

      <MyButton
        type="submit"
        color="yellow"
        size="lg"
        children={t("signUp")}
      />
    </form>
  );
}
