"use client";

import MyCheckbox from "@/app/components/checkbox";
import { useLanguage } from "@/app/contexts/language";
import { useModalContext } from "@/app/contexts/modal";
import { Select, SelectItem } from "@heroui/select";
import { useTranslations } from "next-intl";
import { allTimezones, useTimezoneSelect } from "react-timezone-select";

const labelStyle = "original"
const timezones = { ...allTimezones }

export function TimezoneSelect() {
  const { options, parseTimezone } = useTimezoneSelect({ labelStyle, timezones });
  const t = useTranslations();

  return (
    <Select
      label={t('timezone')}
      labelPlacement="outside"
      placeholder="Choose one"
      selectedKeys={["57"]}
      onChange={(e) => console.log(e.target.value)}
      classNames={{
        base: [
          "text-base",
          "opacity-100",
        ],
        trigger: [
          "h-[46px]",
          "p-[14px]",
          "bg-transparent",
          "rounded-[8px]",
          "border border-grey-light-active",
          "text-base text-grey-light-active",
          "placeholder:text-grey-light-active",
          "data-[hover=true]:bg-transparent",
          "data-[focus=true]:bg-transparent data-[focus=true]:border-grey-dark-active",
          "data-[focus-visible=true]:outline-0 data-[focus-visible=true]:outline-transparent",
        ],
      }}
    >
      {options.map((option, index) => (
        <SelectItem key={index} textValue={option.value}>{option.label}</SelectItem>
      ))}
    </Select>
  )
}

export default function Page() {
  const { openModal } = useModalContext();
  const { locale, setLocale, getLocale } = useLanguage();
  const t = useTranslations();

  return (
    <div className="flex flex-col p-[16px] items-start gap-[16px] flex-1 self-stretch">
      <div className="flex w-full flex-col p-[16px] rounded-[8px] border border-light-secondary bg-white">
        <div className="flex flex-col gap-[16px]">
          <div className="flex gap-[4px]">
            <div className="flex flex-col flex-1 gap-[4px]">
              <div className="flex text-base !text-[25px] font-bold">
                {t('language')} & {t('region')}
              </div>
              <span className="text-grey-25">
                {t('Language.title')}
              </span>
            </div>
            {/* <div className="flex items-end">
              <MyButton
                color="yellow"
                children="Add Member"
                onPress={() => openModal("settingTeam")}
                className="px-[24px]"
              />
            </div> */}
          </div>

          <Select
            label={t('language')}
            labelPlacement="outside"
            placeholder="Choose one"
            selectedKeys={[getLocale() as string]}
            onSelectionChange={(item) => { if (item.currentKey) { setLocale(item.currentKey) } }}
            classNames={{
              base: [
                "text-base",
                "opacity-100",
              ],
              trigger: [
                "h-[46px]",
                "p-[14px]",
                "bg-transparent",
                "rounded-[8px]",
                "border border-grey-light-active",
                "text-base text-grey-light-active",
                "placeholder:text-grey-light-active",
                "data-[hover=true]:bg-transparent",
                "data-[focus=true]:bg-transparent data-[focus=true]:border-grey-dark-active",
                "data-[focus-visible=true]:outline-0 data-[focus-visible=true]:outline-transparent",
              ],
            }}
          >
            <SelectItem key={"en"}>English</SelectItem>
            <SelectItem key={"id"}>Indonesia</SelectItem>
          </Select>

          <TimezoneSelect />

          <MyCheckbox
            color="yellow"
            children={
              <span className="text-[12px] text-grey-light-active">
                {t('Language.notify')}
              </span>
            }
            classNames={{
              wrapper: "!size-[16px] before:size-[16px] after:size-[16px]",
            }}
          />
        </div>
      </div>
    </div>
  );
}
