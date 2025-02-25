"use client";

import MyButton from "@/app/[locale]/components/button";
import { Icon } from "@iconify-icon/react";
import solarJSONIconsData from "@iconify/json/json/solar.json";
import { IconifyJSONIconsData } from "@iconify/types";
import { Divider, Input } from "@nextui-org/react";
import { useRef, useState } from "react";

const solarIcons = solarJSONIconsData as IconifyJSONIconsData;

export default function Page() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [icons, setIcons] = useState<any>(Object.keys(solarIcons.icons).slice(0, 12).map(value => `solar:${value}`));
  const [iconSearchInput, setIconSearchInput] = useState("");
  const [selectedColor, setSelectedColor] = useState("#B2BBC6");
  const [selectedIcon, setSelectedIcon] = useState("solar:record-circle-filled-linear");

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };

  const handleSearch = (query: string) => {
    setIconSearchInput(query);
    const filteredIcons = Object.keys(solarIcons.icons).filter(value => value.includes(query)).slice(0, 12).map(value => `solar:${value}`);
    setIcons(filteredIcons);
  }

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="flex size-[200px]">
        <div className="flex flex-col gap-[13px]">
          <div className="flex items-center gap-[4px]">
            Example : <Icon icon={selectedIcon} width={22} style={{ color: selectedColor }} />
          </div>

          <div className="flex flex-col gap-[8px] self-stretch">
            Color

            <div className="flex items-center gap-[8px]">
              <MyButton
                size="sm"
                radius="full"
                value="#6E56CF"
                onPress={() => setSelectedColor("#6E56CF")}
                className="p-0 min-w-[22px] h-[22px]"
                style={{ backgroundColor: "#6E56CF" }}
              />

              <MyButton
                size="sm"
                radius="full"
                value="#3E63DD"
                onPress={() => setSelectedColor("#3E63DD")}
                className="p-0 min-w-[22px] h-[22px]"
                style={{ backgroundColor: "#3E63DD" }}
              />

              <MyButton
                size="sm"
                radius="full"
                value="#0091FF"
                onPress={() => setSelectedColor("#0091FF")}
                className="p-0 min-w-[22px] h-[22px]"
                style={{ backgroundColor: "#0091FF" }}
              />

              <MyButton
                size="sm"
                radius="full"
                value="#12A594"
                onPress={() => setSelectedColor("#12A594")}
                className="p-0 min-w-[22px] h-[22px]"
                style={{ backgroundColor: "#12A594" }}
              />

              <MyButton
                size="sm"
                radius="full"
                value="#B2BBC6"
                onPress={() => setSelectedColor("#B2BBC6")}
                className="p-0 min-w-[22px] h-[22px]"
                style={{ backgroundColor: "#B2BBC6" }}
              />

              <div className="relative flex items-center">
                <MyButton
                  size="sm"
                  radius="full"
                  onClick={handleIconClick}
                  className="p-0 min-w-[22px] h-[22px] bg-transparent"
                  children={
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M8.53454 4.79407L9.44427 5.7038L14.2962 10.5557L15.2059 11.4654C15.7083 11.9679 16.5229 11.9679 17.0254 11.4654C17.5278 10.963 17.5278 10.1484 17.0254 9.64598L16.1156 8.73624L17.3286 7.52327C18.6684 6.18345 18.6684 4.01118 17.3286 2.67137C15.9888 1.33155 13.8165 1.33155 12.4767 2.67137L11.2637 3.88434L10.354 2.97461C9.85157 2.47218 9.03697 2.47218 8.53454 2.97461C8.03211 3.47704 8.03211 4.29164 8.53454 4.79407Z" fill="#594311" />
                      <path d="M8.53454 4.79407L8.9588 4.36981L8.9588 4.36981L8.53454 4.79407ZM15.2059 11.4654L14.7816 11.8897L14.7816 11.8897L15.2059 11.4654ZM10.354 2.97461L10.7783 2.55035L10.354 2.97461ZM11.2637 3.88434L10.8395 4.30861C11.0738 4.54292 11.4537 4.54292 11.688 4.30861L11.2637 3.88434ZM12.4767 2.67137L12.901 3.09563L12.901 3.09563L12.4767 2.67137ZM16.1156 8.73624L15.6914 8.31198C15.4571 8.54629 15.4571 8.92619 15.6914 9.16051L16.1156 8.73624ZM8.53454 2.97461L8.11027 2.55035H8.11027L8.53454 2.97461ZM17.0254 9.64598L16.6011 10.0702L16.6011 10.0702L17.0254 9.64598ZM14.2962 10.5557L14.7204 10.1314L14.2962 10.5557ZM9.44427 5.7038L9.02 6.12807H9.02L9.44427 5.7038ZM9.92974 3.39887L10.8395 4.30861L11.688 3.46008L10.7783 2.55035L9.92974 3.39887ZM11.688 4.30861L12.901 3.09563L12.0524 2.2471L10.8395 3.46008L11.688 4.30861ZM16.9043 7.099L15.6914 8.31198L16.5399 9.16051L17.7529 7.94753L16.9043 7.099ZM16.9043 3.09563C18.0098 4.20113 18.0098 5.9935 16.9043 7.099L17.7529 7.94753C19.327 6.3734 19.327 3.82123 17.7529 2.2471L16.9043 3.09563ZM12.901 3.09563C14.0065 1.99013 15.7988 1.99013 16.9043 3.09563L17.7529 2.2471C16.1787 0.672971 13.6266 0.672971 12.0524 2.2471L12.901 3.09563ZM16.6011 11.0412C16.333 11.3093 15.8983 11.3093 15.6302 11.0412L14.7816 11.8897C15.5184 12.6264 16.7129 12.6264 17.4496 11.8897L16.6011 11.0412ZM8.9588 3.39887C9.22692 3.13076 9.66162 3.13076 9.92974 3.39887L10.7783 2.55035C10.0415 1.8136 8.84702 1.8136 8.11027 2.55035L8.9588 3.39887ZM8.9588 4.36981C8.69069 4.10169 8.69069 3.66699 8.9588 3.39887L8.11027 2.55035C7.37353 3.28709 7.37353 4.48159 8.11027 5.21834L8.9588 4.36981ZM17.4496 11.8897C18.1864 11.153 18.1864 9.95846 17.4496 9.22171L16.6011 10.0702C16.8692 10.3384 16.8692 10.7731 16.6011 11.0412L17.4496 11.8897ZM15.6914 9.16051L16.6011 10.0702L17.4496 9.22171L16.5399 8.31198L15.6914 9.16051ZM15.6302 11.0412L14.7204 10.1314L13.8719 10.98L14.7816 11.8897L15.6302 11.0412ZM14.7204 10.1314L9.86853 5.27954L9.02 6.12807L13.8719 10.98L14.7204 10.1314ZM9.86853 5.27954L8.9588 4.36981L8.11027 5.21834L9.02 6.12807L9.86853 5.27954Z" fill="#594311" />
                      <path opacity="0.5" d="M3.92391 11.2236C3.54392 11.6036 3.35391 11.7936 3.2333 12.0212C3.15285 12.173 3.09567 12.3361 3.06365 12.5049C3.01566 12.7579 3.04533 13.025 3.10468 13.5591L3.14869 13.9552C3.16488 14.1009 3.17298 14.1738 3.17502 14.2437C3.18737 14.6674 3.0424 15.0807 2.76805 15.4039C2.72278 15.4572 2.67094 15.5091 2.56725 15.6127L2.04333 16.1367C1.5409 16.6391 1.5409 17.4537 2.04333 17.9561C2.54576 18.4586 3.36036 18.4586 3.86279 17.9561L4.38674 17.4322C4.49041 17.3285 4.54225 17.2767 4.59557 17.2314C4.91873 16.9571 5.33202 16.8121 5.75574 16.8244C5.82567 16.8265 5.89853 16.8346 6.04427 16.8508L6.44036 16.8948C6.97448 16.9541 7.24153 16.9838 7.4946 16.9358C7.66339 16.9038 7.82642 16.8466 7.97823 16.7662C8.20581 16.6455 8.39583 16.4555 8.77581 16.0755L9.97451 14.8768L10.8584 13.9929L11.6412 13.2101L12.5251 12.3263L14.2958 10.5555L9.44394 5.70361L3.92391 11.2236Z" fill="#090B0E" />
                      <path d="M10.0973 11.6661L11.6418 13.2106L12.5258 12.3268L10.9812 10.7822C10.7371 10.5381 10.3414 10.5381 10.0973 10.7822C9.85321 11.0263 9.85321 11.422 10.0973 11.6661Z" fill="#090B0E" />
                      <path d="M8.43062 13.3327L9.97516 14.8773L10.8591 13.9934L9.3145 12.4488C9.07042 12.2048 8.67469 12.2048 8.43062 12.4488C8.18654 12.6929 8.18654 13.0887 8.43062 13.3327Z" fill="#090B0E" />
                    </svg>
                  }
                />

                <Input
                  type="color"
                  ref={inputRef}
                  value={selectedColor}
                  onChange={handleChange}
                  className="absolute top-0 left-0 opacity-0 pointer-events-none"
                />
              </div>
            </div>
          </div>

          <div className="flex self-stretch">
            <Divider />
          </div>

          <div className="flex flex-col gap-[13px]">
            <Input
              labelPlacement="outside"
              startContent={
                <Icon icon="solar:magnifer-linear" className="text-grey-lighter" />
              }
              placeholder={
                "Search"
              }
              value={iconSearchInput}
              onValueChange={val => handleSearch(val)}
              classNames={{
                base: [
                  "text-base",
                  "bg-transparent",
                  "group-data-[has-label=true]:mt-[27px]",
                  "opacity-100",
                ],
                label: [
                  "text-grey-dark-active",
                  "group-data-[invalid=true]:!text-grey-dark-active",
                  "group-data-[disabled=true]:!text-grey-light-active",
                ],
                input: [
                  "text-grey-dark-active",
                  "placeholder:text-grey-light-active",
                  "group-data-[invalid=true]:!text-grey-dark-active",
                  "group-data-[disabled=true]:!text-grey-light-active",
                ],
                inputWrapper: [
                  "h-[46px]",
                  "px-[16px] py-[8px]",
                  "bg-transparent",
                  "rounded-[8px]",
                  "border border-grey-light-active",
                  "group-data-[hover=true]:bg-transparent",
                  "group-data-[focus=true]:bg-transparent group-data-[focus=true]:border-grey-dark-active",
                  "group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-transparent",
                  "group-data-[invalid=true]:!border-red-active group-data-[invalid=true]:!bg-red-light-hover",
                  "group-data-[disabled=true]:!bg-white-light-active",
                  "shadow-none",
                ],
                errorMessage: [
                  "text-[12px] text-red-active",
                ],
                helperWrapper: [
                  "p-0 pt-[2px]",
                ],
              }}
            />

            <div className="grid grid-cols-6 gap-y-[13px]">
              {icons.map((sample: any, index: any) => {
                return (
                  <button key={index} className="m-0 p-0" onClick={() => { setSelectedIcon(sample) }}>
                    <Icon key={index} icon={sample} width={22} style={{ color: "#B2BBC6" }} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
