"use client";

import MyButton from "@/app/components/button";
import { useCountdownTimer } from "@/app/components/countdown-timer";
import { useModalContext } from "@/app/contexts/modal";
import { Icon } from "@iconify-icon/react";
import { Avatar, Divider, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Switch } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ShareProject() {
  const router = useRouter();

  const { openModals, closeModal, closeAllModals, openModal } = useModalContext();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [enableInviteLink, setEnableInviteLink] = useState(false);
  const [inviteLink] = useState("InteractiveMyProject.com/RnD");
  const otp = "123123";
  const handleOtp = (val: string) => {
    if (val === otp) {
      router.push("/dashboard");
      closeAllModals();
    }
  }

  const {
    getTimerString,
    startTimer
  } = useCountdownTimer(5, 'archive-project-verification-timer');

  useEffect(() => {
    if (getTimerString() === '00:00') {
      startTimer();
    }
  }, []);

  return (
    <>
      <Modal isOpen={openModals["shareProject"]} hideCloseButton={true} size="lg">
        <ModalContent className="overflow-visible">
          {() => (
            <>
              <ModalHeader>
                <div className="flex flex-col w-full">
                  <div className="flex items-center gap-[8px] self-stretch">
                    <div className="flex flex-1 items-center gap-[8px]">
                      <div className="text-[16px] font-semibold">
                        Share Project
                      </div>
                      <div className="flex">
                        <Icon icon="solar:info-circle-bold" size={16} style={{ color: "var(--yellow)" }} />
                      </div>
                    </div>

                    <button type="button" onClick={() => closeAllModals()}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M9.9583 1.00004L1 9.95833M0.999962 1L9.95826 9.9583" stroke="#090B0E" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  <div className="text-grey-lighter text-base font-normal">
                    Collaborate effortlessly by sharing your project with team members, enabling seamless access and real-time updates.
                  </div>
                </div>
              </ModalHeader>

              <Divider />

              <ModalBody className="px-[25px] py-[20px]">
                <div className="flex flex-col gap-[12px]">
                  <div className="flex flex-col gap-[5px]">
                    <div className="flex items-center gap-[8px] self-stretch">
                      <div className="flex items-center">
                        <Switch
                          isSelected={enableInviteLink}
                          onClick={() => setEnableInviteLink((prev) => !prev)}
                          classNames={{
                            wrapper: "px-[2px] w-[28px] h-[16px] group-data-[focus-visible=true]:ring-yellow group-data-[selected=true]:bg-yellow",
                            thumb: [
                              "w-[12px] h-[12px]",
                              "group-data-[hover=true]:border-yellow",
                              "group-data-[pressed=true]:w-[12px]",
                              "group-data-[selected=true]:ml-[12px] rtl:group-data-[selected=true]:mr-[12px] group-data-[selected]:group-data-[pressed]:ml-[12px]",
                            ],
                          }}
                        />
                      </div>

                      <div className="flex items-center flex-1">
                        Enable Invite Link
                      </div>
                    </div>

                    {enableInviteLink && (
                      <>
                        <div className="flex items-center gap-[12px] self-stretch">
                          <Input
                            height={36}
                            isDisabled={true}
                            placeholder="Invite Link"
                            value={inviteLink}
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
                                "p-[8px]",
                                "bg-transparent",
                                "rounded-[8px]",
                                "border border-grey-light-active",
                                "group-data-[hover=true]:bg-transparent",
                                "group-data-[focus=true]:bg-transparent group-data-[focus=true]:border-grey-dark-active",
                                "group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-transparent",
                                "group-data-[invalid=true]:!border-red-active group-data-[invalid=true]:!bg-red-light-hover",
                                "group-data-[disabled=true]:!bg-white",
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

                          <MyButton
                            variant="bordered"
                            color="yellow"
                            children="Copy"
                            onPress={() => { navigator.clipboard.writeText(inviteLink); }}
                            className="h-[40px] w-[82px] px-[24px]"
                          />
                        </div>

                        <div className="flex h-[21px] self-stretch">
                          <span className="text-[12px] text-grey-lighter">Share this link to invite people to your team.</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col gap-[5px]">
                    <div className="flex items-center flex-1">
                      Invite Member
                    </div>

                    <div className="flex items-center gap-[12px] self-stretch">
                      <Input
                        height={36}
                        placeholder="Email Address"
                        // value=""
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
                            "p-[14px]",
                            "bg-transparent",
                            "rounded-[8px]",
                            "border border-grey-light-active",
                            "group-data-[hover=true]:bg-transparent",
                            "group-data-[focus=true]:bg-transparent group-data-[focus=true]:border-grey-dark-active",
                            "group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-transparent",
                            "group-data-[invalid=true]:!border-red-active group-data-[invalid=true]:!bg-red-light-hover",
                            "group-data-[disabled=true]:!bg-white",
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

                      <MyButton
                        color="yellow"
                        children="Invite"
                        // isDisabled={true}
                        onPress={() => { }}
                        className="h-[40px] w-[82px] px-[24px]"
                      />
                    </div>

                    <div className="flex h-[21px] self-stretch">
                      <span className="text-[12px] text-grey-lighter">Press comma (,) or enter key to add multiple email addresses.</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[8px]">
                    <div className="flex self-stretch">
                      Who has access
                    </div>

                    <div className="flex items-center gap-[8px]">
                      <Avatar
                        name="IA"
                        classNames={{ base: "w-[20px] h-[20px] bg-yellow-100", name: "text-base text-[10px] text-yellow-600" }}
                      />

                      InterActive (You)
                    </div>

                    <div className="flex items-center gap-[8px]">
                      <Avatar
                        name="A"
                        classNames={{ base: "w-[20px] h-[20px] bg-yellow-100", name: "text-base text-[10px] text-yellow-600" }}
                      />

                      Admin
                    </div>
                  </div>

                  <div className="flex flex-col gap-[5px]">
                    <Select
                      defaultSelectedKeys={"only-invited"}
                      label=""
                      labelPlacement="outside"
                      placeholder="Select permission type"
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
                      <SelectItem key={"only-invited"}>
                        <div className="flex items-center gap-[8px]">
                          <Icon icon="solar:check-square-linear" height={16} />
                          Only Invited People
                        </div>
                      </SelectItem>
                      <SelectItem key={"with-link"}>
                        <div className="flex items-center gap-[8px]">
                          <Icon icon="solar:calendar-date-linear" height={16} />
                          People With the Link
                        </div>
                      </SelectItem>
                    </Select>
                  </div>

                  <div className="flex justify-end items-center gap-[12px]">
                    <MyButton
                      color="yellow"
                      children="Done"
                      onPress={() => closeAllModals()}
                      className="px-[24px]"
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
