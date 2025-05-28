"use client";

import MyButton from "@/app/components/button";
import { useModalContext } from "@/app/contexts/modal";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Avatar, AvatarGroup } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Calendar } from "@heroui/calendar";
import { Checkbox } from "@heroui/checkbox";
import type { TimeInputValue } from "@heroui/date-input";
import { TimeInput } from "@heroui/date-input";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { Input, Textarea } from "@heroui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Select, SelectItem } from "@heroui/select";
import { Spinner } from "@heroui/spinner";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { Tab, Tabs } from "@heroui/tabs";
import { addToast } from "@heroui/toast";
import { Icon } from "@iconify-icon/react";
import { today } from "@internationalized/date";
import type { DateValue } from "@react-types/calendar";
import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const { params } = useParams();
  const [loading, setLoading] = useState(false);
  const { openModal, closeAllModals } = useModalContext();
  const [taskName, setTaskName] = useState("New Task");
  const [renameMode, setRenameMode] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [statusName, setStatusName] = useState<string>("");
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>(["InterActive"]);
  const [dueDate, setDueDate] = useState<DateValue | null>(today(Intl.DateTimeFormat().resolvedOptions().timeZone));
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>(["v1"]);
  const [inputDescription, setInputDescription] = useState("");
  const [timeInputMode, setTimeInputMode] = useState(false);
  const [dueDateTime, setDueDateTime] = useState<TimeInputValue | null>(null);
  const [selectedRightView, setSelectedRightView] = useState("act");
  const [selectedBottomView, setSelectedBottomView] = useState("detail");
  const [fetchedStatus, setFetchedStatus] = useState<any>([]);

  const handleSelectAssignees = (assignee: string) => {
    setSelectedAssignees((prevAssignees) =>
      prevAssignees.includes(assignee)
        ? prevAssignees.filter((prevAssignee) => prevAssignee !== assignee)
        : [...prevAssignees, assignee]
    );
  }

  const handleSelectTags = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((prevTags) => prevTags !== tag)
        : [...prev, tag]
    );
  }

  const handleSelectStatus = (statusId: string, statusName: string) => {
    setSelectedStatus(statusId);
    setStatusName(statusName);
  }

  const handleFormSubmit = async () => {
    setLoading(true);

    const form = new FormData();
    form.append("taskType", "task");
    form.append("taskName", taskName);
    form.append("taskStatus", selectedStatus);
    form.append("dueDate", dueDate?.toString() as string);
    form.append("taskDesc", inputDescription);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/store`, form)
        .then(response => {
          addToast({
            title: "Success",
            description: response.data.message,
          });
        });
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.message;
        addToast({
          title: "Error",
          description: `Validation error: ${errors}`,
        });
      } else {
        console.log("Something went wrong:", error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/statuses/`)
      .then(response => {
        setFetchedStatus(() => [...response.data.data]);
      });

    console.log(params);
  }, []);

  return (
    <div className="flex flex-wrap w-full overflow-y-auto">
      <div className="flex xs:basis-full sm:basis-full md:basis-7/12 p-[16px] flex-col justify-start flex-1">
        <div className="flex flex-col border-b border-white-active">
          <div className="flex justify-between items-center self-stretch font-semibold">
            <div className="flex items-center gap-[4px]">
              {/* <Icon icon="cuida:subtask-outline" height={14} /> */}
              <div className="flex h-[24px] items-center" onClick={() => setRenameMode(true)}>
                {renameMode ? (
                  <Input
                    autoFocus={true}
                    value={taskName}
                    onValueChange={setTaskName}
                    onBlur={() => setRenameMode(false)}
                    onKeyDown={(e) => { e.key.toLowerCase() === "enter" && setRenameMode(false) }}
                    fullWidth={false}
                    classNames={{
                      input: "text-base !text-yellow-500 font-bold",
                      inputWrapper: [
                        "min-h-max h-auto bg-yellow-light-active data-[hover=true]:bg-yellow-light-active group-data-[focus=true]:bg-yellow-light-active",
                        "group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-transparent",
                      ]
                    }}
                  />
                ) : taskName}
              </div>
            </div>
            <Icon icon="solar:pen-2-linear" height={17} onClick={() => setRenameMode(false)} />
          </div>
          <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 grid-cols-2 pb-[16px] pt-[8px] gap-x-[16px] gap-y-[12px]">
            <Popover placement="bottom-start">
              <PopoverTrigger className="aria-expanded:opacity-100 aria-expanded:scale-1">
                <div className="flex items-center gap-[20px] cursor-pointer">
                  <div className="flex w-[88px] items-center gap-[8px]">
                    <Icon icon="solar:record-circle-original-linear" height={16} />
                    Status
                  </div>
                  <div className="flex text-grey-lighter">
                    {statusName === "" ? "Empty" : statusName}
                  </div>
                </div>
              </PopoverTrigger>

              <PopoverContent className="w-[248px] p-0 rounded-[8px] border-white-active">
                <div className="flex flex-col self-stretch">
                  <div className="flex p-[8px]">
                    <Input
                      placeholder="Search status ..."
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
                          "placeholder:text-base placeholder:text-grey-light-active",
                          "group-data-[invalid=true]:!text-grey-dark-active",
                          "group-data-[disabled=true]:!text-grey-light-active",
                        ],
                        inputWrapper: [
                          "p-[8px]",
                          "bg-transparent",
                          "rounded-[8px]",
                          "border border-white-active",
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
                  </div>
                  <Divider />
                  <ul>
                    {fetchedStatus.map((status: any) => {
                      return (
                        <li key={`status-${status.stat_id}`}
                          className="flex justify-between items-center px-[10px] py-[8px] gap-[8px] cursor-pointer hover:bg-yellow-light-active last:rounded-b-[8px]"
                          onClick={() => handleSelectStatus(status.stat_id, status.stat_name)}
                        >
                          <div className="flex items-center gap-[8px]">
                            <Icon icon="solar:record-circle-filled-linear" height={16} style={{ color: status.stat_color }} />
                            <div className="text-base">
                              {status.stat_name}
                            </div>
                          </div>
                          {selectedStatus === status.stat_id ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#FEC031" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="#B2BBC6" strokeWidth="1.25" />
                            </svg>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
            <Popover placement="bottom-start">
              <PopoverTrigger className="aria-expanded:opacity-100 aria-expanded:scale-1">
                <div className="flex items-center gap-[20px] cursor-pointer">
                  <div className="flex w-[88px] items-center gap-[8px]">
                    <Icon icon="lineicons:user-4" height={16} />
                    Assignees
                  </div>
                  <div className="flex text-grey-lighter">
                    <AvatarGroup>
                      <Avatar
                        name="I"
                        classNames={{
                          base: clsx(
                            "w-[24px] h-[24px] border border-white bg-yellow-light-active",
                            "!-ms-[6px] data-[hover=true]:-translate-x-[4px] rtl:data-[hover=true]:translate-x-[4px] transition-transform",
                          ),
                          name: "text-base text-[10px] text-yellow-600"
                        }}
                      />
                      <Avatar
                        name="D"
                        classNames={{
                          base: clsx(
                            "w-[24px] h-[24px] border border-white bg-yellow-light-active",
                            "!-ms-[6px] data-[hover=true]:-translate-x-[4px] rtl:data-[hover=true]:translate-x-[4px] transition-transform",
                          ),
                          name: "text-base text-[10px] text-yellow-600"
                        }}
                      />
                      <Avatar
                        name="B"
                        classNames={{
                          base: clsx(
                            "w-[24px] h-[24px] border border-white bg-yellow-light-active",
                            "!-ms-[6px] data-[hover=true]:-translate-x-[4px] rtl:data-[hover=true]:translate-x-[4px] transition-transform",
                          ),
                          name: "text-base text-[10px] text-yellow-600"
                        }}
                      />
                    </AvatarGroup>
                  </div>
                </div>
              </PopoverTrigger>

              <PopoverContent className="w-[248px] p-0 rounded-[8px] border-white-active">
                <div className="flex flex-col self-stretch">
                  <div className="flex p-[8px]">
                    <Input
                      placeholder="Search user ..."
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
                          "placeholder:text-base placeholder:text-grey-light-active",
                          "group-data-[invalid=true]:!text-grey-dark-active",
                          "group-data-[disabled=true]:!text-grey-light-active",
                        ],
                        inputWrapper: [
                          "p-[8px]",
                          "bg-transparent",
                          "rounded-[8px]",
                          "border border-white-active",
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
                  </div>
                  <Divider />
                  <ul>
                    <li key="InterActive" className="flex justify-between items-center px-[10px] py-[8px] gap-[8px] cursor-pointer hover:bg-yellow-100 last:rounded-b-[8px]" onClick={() => handleSelectAssignees("InterActive")}>
                      <div className="flex items-center gap-[8px]">
                        <Avatar
                          name="I"
                          classNames={{ base: "w-[24px] h-[24px] bg-yellow-light-active", name: "text-base text-[10px] text-yellow-600" }}
                        />
                        <div className="text-base">
                          InterActive
                        </div>
                      </div>
                      {selectedAssignees.includes("InterActive") ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#FEC031" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="#B2BBC6" stroke-width="1.25" />
                        </svg>
                      )}
                    </li>
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
            <Popover placement="bottom-start">
              <PopoverTrigger className="aria-expanded:opacity-100 aria-expanded:scale-1">
                <div className="flex items-center gap-[20px] cursor-pointer">
                  <div className="flex w-[88px] items-center gap-[8px]">
                    <Icon icon="solar:calendar-linear" height={16} />
                    Due Date
                  </div>
                  <div className="flex text-grey-lighter">
                    {dueDate ? (
                      new Date(dueDate.toString()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                    ) : (
                      "Empty"
                    )}
                  </div>
                </div>
              </PopoverTrigger>

              <PopoverContent className="p-0 rounded-[8px]">
                <Calendar
                  value={dueDate}
                  onChange={setDueDate}
                  classNames={{
                    base: "rounded-[8px] shadow-none",
                    prevButton: "text-grey-dark-active",
                    title: "text-grey-dark-active",
                    nextButton: "text-grey-dark-active",
                    gridWrapper: "pb-[8px]",
                    gridHeaderCell: "text-[10px] text-grey-lighter",
                    gridBody: "bg-white",
                    cellButton: "data-[hover=true]:bg-yellow-light-active data-[hover=true]:text-grey-dark-active data-[selected=true]:bg-yellow data-[selected=true]:hover:bg-yellow"
                  }}
                />
                <Divider className="bg-white-active" />
                <div className="flex w-full px-[10px] py-[8px] items-center">
                  <div className="flex h-[22px] items-center gap-[8px]">
                    <Icon icon="solar:alarm-linear" height={16} />
                    <div className="flex items-center" onClick={() => setTimeInputMode(true)}>
                      {timeInputMode ? (
                        <TimeInput
                          autoFocus={true}
                          value={dueDateTime}
                          onChange={setDueDateTime}
                          // onBlur={() => setTimeInputMode(false)}
                          // onKeyDown={(e) => { e.key.toLowerCase() === "enter" && setTimeInputMode(false) }}
                          fullWidth={false}
                          classNames={{
                            inputWrapper: [
                              "min-h-max h-auto",
                              "bg-yellow-light-active",
                              "hover:bg-yellow-light-active focus-within:hover:bg-yellow-light-active",
                            ],
                            innerWrapper: "h-auto text-base !text-grey-dark-active",
                            segment: [
                              "text-grey-dark-active data-[editable=true]:text-grey-dark-active",
                              "data-[editable=true]:data-[placeholder=true]:text-grey-dark-active",
                              // isInvalid=true
                              // "data-[invalid=true]:text-danger-300 data-[invalid=true]:data-[editable=true]:text-danger",
                              // "data-[invalid=true]:focus:bg-danger-400/50 dark:data-[invalid=true]:focus:bg-danger-400/20",
                              // "data-[invalid=true]:data-[editable=true]:focus:text-danger",
                            ],
                            input: [
                              "text-base !text-grey-dark-active",
                            ],
                          }}
                        />
                      ) : "Set Time"}
                    </div>
                  </div>
                </div>
                <div className="flex w-full px-[10px] py-[8px] justify-between items-center">
                  <div className="flex w-full h-[22px] items-center gap-[8px]">
                    <Icon icon="solar:alarm-linear" height={16} />
                    <div className="flex items-center" onClick={() => setTimeInputMode(true)}>
                      13.00
                    </div>
                  </div>
                  <div className="flex">
                    <Icon icon="solar:minus-square-bold" height={16} style={{ color: "#B2BBC6" }} />
                  </div>
                </div>
                <Popover placement="right-start">
                  <PopoverTrigger className="aria-expanded:opacity-100 aria-expanded:scale-1">
                    <Button
                      fullWidth={true}
                      disableAnimation={true}
                      startContent={
                        <Icon icon="solar:calendar-linear" height={16} />
                      }
                      children={
                        <div className="flex h-[22px] w-full justify-between items-center">
                          Repeat
                          <Icon icon="solar:alt-arrow-right-linear" height={16} />
                        </div>
                      }
                      className="px-[10px] py-[8px] justify-start gap-[8px] rounded-none bg-white data-[hover=true]:opacity-100"
                    />
                  </PopoverTrigger>

                  <PopoverContent className="w-[300px] ml-[-5px] p-0 rounded-[8px] border border-white-active bg-white drop-shadow-sm">
                    <div className="flex w-full flex-col">
                      <div className="flex flex-col p-[12px] gap-[16px]">
                        <div className="flex w-full flex-col gap-[12px]">
                          Repeat Every

                          <div className="flex flex-row items-center gap-[8px]">
                            <div className="basis-1/4">
                              <Input
                                type="number"
                                min={1}
                                fullWidth={false}
                                placeholder="days"
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
                                    "placeholder:text-base placeholder:text-grey-light-active",
                                    "group-data-[invalid=true]:!text-grey-dark-active",
                                    "group-data-[disabled=true]:!text-grey-light-active",
                                  ],
                                  inputWrapper: [
                                    "p-[8px]",
                                    "bg-transparent",
                                    "rounded-[8px]",
                                    "border border-white-active",
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
                            </div>
                            <div className="basis-3/4">
                              <Select
                                placeholder="Choose one"
                                classNames={{
                                  base: [
                                    "text-base",
                                    "opacity-100",
                                  ],
                                  trigger: [
                                    "bg-transparent",
                                    "rounded-[8px]",
                                    "border border-white-active",
                                    "text-base text-grey-light-active",
                                    "data-[hover=true]:bg-transparent",
                                    "data-[focus=true]:bg-transparent data-[focus=true]:border-grey-dark-active",
                                    "data-[focus-visible=true]:outline-0 data-[focus-visible=true]:outline-transparent",
                                  ],
                                }}
                              >
                                <SelectItem key={"daily"}>Daily</SelectItem>
                                <SelectItem key={"weekly"}>Weekly</SelectItem>
                                <SelectItem key={"monthly"}>Monthly</SelectItem>
                                <SelectItem key={"yearly"}>Yearly</SelectItem>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div role="button" className="flex size-[25px] justify-center items-center rounded-full border border-white-active bg-white-normal">
                            S
                          </div>
                          <div role="button" className="flex size-[25px] justify-center items-center rounded-full border border-white-active bg-white-normal">
                            M
                          </div>
                          <div role="button" className="flex size-[25px] justify-center items-center rounded-full border border-white-active bg-white-normal">
                            T
                          </div>
                          <div role="button" className="flex size-[25px] justify-center items-center rounded-full bg-yellow-500 font-normal text-white">
                            W
                          </div>
                          <div role="button" className="flex size-[25px] justify-center items-center rounded-full border border-white-active bg-white-normal">
                            T
                          </div>
                          <div role="button" className="flex size-[25px] justify-center items-center rounded-full border border-white-active bg-white-normal">
                            F
                          </div>
                          <div role="button" className="flex size-[25px] justify-center items-center rounded-full border border-white-active bg-white-normal">
                            S
                          </div>
                        </div>

                        <Select
                          placeholder="Same day each month"
                          classNames={{
                            base: [
                              "text-base",
                              "opacity-100",
                            ],
                            trigger: [
                              "bg-transparent",
                              "rounded-[8px]",
                              "border border-white-active",
                              "data-[hover=true]:bg-transparent",
                              "data-[focus=true]:bg-transparent data-[focus=true]:border-grey-dark-active",
                              "data-[focus-visible=true]:outline-0 data-[focus-visible=true]:outline-transparent",
                            ],
                          }}
                        >
                          <SelectItem key={""}></SelectItem>
                        </Select>
                      </div>
                      <Divider className="bg-white-active" />
                      <div className="flex flex-col">
                        <Checkbox
                          size="sm"
                          // value={view.value}
                          disableAnimation={true}
                          classNames={{
                            base: clsx(
                              "inline-flex w-full max-w-md m-0",
                              "cursor-pointer rounded-0 gap-[10px] p-[10px] border-none",
                              "data-[selected=true]:border-yellow",
                            ),
                            wrapper: clsx(
                              "mr-0 rtl:ml-0",
                              "text-white after:text-white",
                              "after:bg-yellow",
                              "rounded-[4px] before:rounded-[4px] after:rounded-[4px]",
                              "group-data-[focus-visible=true]:ring-yellow",
                            ),
                            label: clsx("w-full"),
                          }}
                        >
                          <div className="flex items-center gap-[10px]">
                            <div className="flex flex-1 items-center gap-[5px]">
                              Skip weekend
                            </div>
                          </div>
                        </Checkbox>
                        <Checkbox
                          size="sm"
                          // value={view.value}
                          disableAnimation={true}
                          classNames={{
                            base: clsx(
                              "inline-flex w-full max-w-md m-0",
                              "cursor-pointer rounded-0 gap-[10px] p-[10px] border-none",
                              "data-[selected=true]:border-yellow",
                            ),
                            wrapper: clsx(
                              "mr-0 rtl:ml-0",
                              "text-white after:text-white",
                              "after:bg-yellow",
                              "rounded-[4px] before:rounded-[4px] after:rounded-[4px]",
                              "group-data-[focus-visible=true]:ring-yellow",
                            ),
                            label: clsx("w-full"),
                          }}
                        >
                          <div className="flex items-center gap-[10px]">
                            <div className="flex flex-1 items-center gap-[5px]">
                              Repeat forever
                            </div>
                          </div>
                        </Checkbox>
                      </div>
                      <Divider className="bg-white-active" />
                      <div className="flex w-full p-[12px] justify-end items-center gap-[16px]">
                        <MyButton
                          variant="bordered"
                          color="yellow"
                          children="Cancel"
                          // onPress={() => closeAllModals()}
                          className="px-[18px]"
                        />

                        <MyButton
                          color="yellow"
                          children="Save"
                          // onPress={() => closeAllModals()}
                          className="px-[18px]"
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <div className="flex w-full px-[10px] py-[8px] justify-between items-center">
                  <div className="flex w-full h-[22px] items-center gap-[8px]">
                    <Icon icon="solar:calendar-linear" height={16} />
                    <div className="flex items-center" onClick={() => setTimeInputMode(true)}>
                      10 December
                    </div>
                  </div>
                  <div className="flex">
                    <Icon icon="solar:minus-square-bold" height={16} style={{ color: "#B2BBC6" }} />
                  </div>
                </div>
                <Divider className="bg-white-active" />
                <div className="flex w-full p-[12px] justify-end items-center gap-[12px]">
                  <MyButton
                    variant="bordered"
                    color="yellow"
                    children="Cancel"
                    // onPress={() => closeAllModals()}
                    className="px-[18px]"
                  />

                  <MyButton
                    color="yellow"
                    children="Save"
                    // onPress={() => { setIsEmpty(false); closeAllModals(); }}
                    className="px-[18px]"
                  />
                </div>
              </PopoverContent>
            </Popover>
            <Popover placement="bottom-start">
              <PopoverTrigger className="aria-expanded:opacity-100 aria-expanded:scale-1">
                <div className="flex items-center gap-[20px] cursor-pointer">
                  <div className="flex w-[88px] items-center gap-[8px]">
                    <Icon icon="solar:flag-linear" height={16} />
                    Priority
                  </div>
                  <div className="flex text-grey-lighter">
                    <div className="flex items-center gap-[8px]">
                      <Icon icon="solar:flag-bold" height={16} style={{ color: "#F96E15" }} />
                      <span className="text-grey-dark-active">Normal</span>
                    </div>
                  </div>
                </div>
              </PopoverTrigger>

              <PopoverContent className="w-[200px] p-0 rounded-[8px] border-white-active">
                <div className="flex flex-col self-stretch">
                  <ul>
                    <li key="high" className="flex justify-between items-center px-[10px] py-[8px] gap-[8px] cursor-pointer hover:bg-yellow-100 first:rounded-t-[8px] last:rounded-b-[8px]" onClick={() => setSelectedPriority("high")}>
                      <div className="flex items-center gap-[8px]">
                        <Icon icon="solar:flag-bold" height={16} style={{ color: "#E20000" }} />
                        <div className="text-base">
                          High
                        </div>
                      </div>
                      {selectedPriority === "high" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#FEC031" />
                        </svg>
                      )}
                    </li>
                    <li key="normal" className="flex h-[35px] justify-between items-center px-[10px] py-[8px] gap-[8px] cursor-pointer hover:bg-yellow-100 first:rounded-t-[8px] last:rounded-b-[8px]" onClick={() => setSelectedPriority("normal")}>
                      <div className="flex items-center gap-[8px]">
                        <Icon icon="solar:flag-bold" height={16} style={{ color: "#F96E15" }} />
                        <div className="text-base">
                          Normal
                        </div>
                      </div>
                      {selectedPriority === "normal" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#FEC031" />
                        </svg>
                      )}
                    </li>
                    <li key="low" className="flex justify-between items-center px-[10px] py-[8px] gap-[8px] cursor-pointer hover:bg-yellow-100 first:rounded-t-[8px] last:rounded-b-[8px]" onClick={() => setSelectedPriority("low")}>
                      <div className="flex items-center gap-[8px]">
                        <Icon icon="solar:flag-bold" height={16} style={{ color: "#B2BBC6" }} />
                        <div className="text-base">
                          Low
                        </div>
                      </div>
                      {selectedPriority === "low" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#FEC031" />
                        </svg>
                      )}
                    </li>
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
            <Popover placement="bottom-start">
              <PopoverTrigger className="aria-expanded:opacity-100 aria-expanded:scale-1">
                <div className="flex items-center gap-[20px] cursor-pointer">
                  <div className="flex w-[88px] items-center gap-[8px]">
                    <Icon icon="solar:tag-outline" height={16} />
                    Tags
                  </div>
                  <div className="flex text-grey-lighter">
                    V 1.0
                  </div>
                </div>
              </PopoverTrigger>

              <PopoverContent className="w-[248px] p-0 rounded-[8px] border-white-active">
                <div className="flex flex-col self-stretch">
                  <div className="flex p-[8px]">
                    <Input
                      placeholder="Search tags ..."
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
                          "placeholder:text-base placeholder:text-grey-light-active",
                          "group-data-[invalid=true]:!text-grey-dark-active",
                          "group-data-[disabled=true]:!text-grey-light-active",
                        ],
                        inputWrapper: [
                          "p-[8px]",
                          "bg-transparent",
                          "rounded-[8px]",
                          "border border-white-active",
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
                  </div>
                  <Divider />
                  <ul>
                    <li key="v1" className="flex justify-between items-center px-[10px] py-[8px] gap-[8px] cursor-pointer hover:bg-yellow-light-active last:rounded-b-[8px]" onClick={() => handleSelectTags("v1")}>
                      <div className="flex items-center gap-[8px]">
                        <Icon icon="solar:tag-linear" height={16} />
                        <div className="text-base">
                          V 1.0
                        </div>
                      </div>
                      {selectedTags.includes("v1") && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#FEC031" />
                        </svg>
                      )}
                    </li>
                    <li key="v2" className="flex justify-between items-center px-[10px] py-[8px] gap-[8px] cursor-pointer hover:bg-yellow-light-active last:rounded-b-[8px]" onClick={() => handleSelectTags("v2")}>
                      <div className="flex items-center gap-[8px]">
                        <Icon icon="solar:tag-linear" height={16} />
                        <div className="text-base">
                          V 2.0
                        </div>
                      </div>
                      {selectedTags.includes("v2") && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#FEC031" />
                        </svg>
                      )}
                    </li>
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex py-[16px] border-b border-white-active">
          <Textarea placeholder="Write description" value={inputDescription} onValueChange={setInputDescription} />
        </div>
        <div className="flex h-[30px]"></div>
        <div className="flex flex-col">
          <div className="flex items-center self-stretch">
            <Tabs
              aria-label="Views"
              variant="underlined"
              color="warning"
              selectedKey={selectedBottomView}
              onSelectionChange={key => setSelectedBottomView(key.toString())}
              classNames={{
                tabList: "p-0",
                tab: "p-0",
                tabContent: "group-data-[selected=true]:text-foreground",
              }}
            >
              <Tab key="detail" title={
                <div className="flex px-[16px] py-[8px] items-center gap-[8px] self-stretch cursor-pointer">
                  Detail
                </div>
              }></Tab>
              <Tab key="subtask" title={
                <div className="flex px-[16px] py-[8px] items-center gap-[8px] self-stretch cursor-pointer">
                  Subtask
                </div>
              }></Tab>
            </Tabs>
          </div>
          {/* <div className="flex items-center flex-1 border-b border-white-active">
                  <div
                    onClick={() => setSelectedBottomView("detail")}
                    className={clsx("flex px-[16px] py-[5px] items-center gap-[8px] self-stretch text-grey-lighter cursor-pointer", {
                      "font-semibold border-b-[1.5px] border-yellow-500 !text-grey-dark-active": selectedBottomView === "detail",
                    })}>
                    <div className="flex flex-nowrap min-w-max items-center self-stretch">
                      Detail
                    </div>
                  </div>
                  <div
                    onClick={() => setSelectedBottomView("subtask")}
                    className={clsx("flex px-[16px] py-[5px] items-center gap-[8px] self-stretch text-grey-lighter cursor-pointer", {
                      "font-semibold border-b-[1.5px] border-yellow-500 !text-grey-dark-active": selectedBottomView === "subtask",
                    })}>
                    <div className="flex flex-nowrap min-w-max items-center self-stretch">
                      Subtask
                    </div>
                  </div>
                </div> */}
          {selectedBottomView === "detail" && (
            <Accordion showDivider={false} className="px-0">
              <AccordionItem
                key={1}
                aria-label="Custom Field"
                title="Custom Field"
                classNames={{ base: clsx("p-[16px] border-b border-white-active"), trigger: clsx("p-0"), title: clsx("text-base"), content: clsx("py-0") }}
              >
                <div className="flex w-full pt-[12px]">
                  <Table
                    aria-label="Table custom field"
                    classNames={{
                      wrapper: "p-0 shadow-none rounded-[8px] border border-white-active",
                      thead: "[&>tr]:first:rounded-none",
                      th: "first:rounded-s-none last:rounded-e-none",
                      td: "text-[12px]",
                    }}
                  >
                    <TableHeader className="bg-white-normal">
                      <TableColumn key={"field-name"} className="text-[12px] font-normal text-grey-lighter">Field Name</TableColumn>
                      <TableColumn key={"type"} className="text-[12px] font-normal text-grey-lighter">Type</TableColumn>
                      <TableColumn key={"author"} className="text-end text-[12px] font-normal text-grey-lighter">Author</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow key={"custom-field-1"}>
                        <TableCell>Name</TableCell>
                        <TableCell className="text-grey-lighter">Text</TableCell>
                        <TableCell className="justify-items-end">
                          <Avatar
                            name="I"
                            classNames={{ base: "w-[24px] h-[24px] bg-yellow-light-active", name: "text-base text-[10px] text-yellow-600" }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow key={"custom-field-2"}>
                        <TableCell>Due Date</TableCell>
                        <TableCell className="text-grey-lighter">Date</TableCell>
                        <TableCell className="justify-items-end">
                          <Avatar
                            name="I"
                            classNames={{ base: "w-[24px] h-[24px] bg-yellow-light-active", name: "text-base text-[10px] text-yellow-600" }}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </AccordionItem>
              <AccordionItem
                key={2}
                aria-label="Attachment"
                title="Attachment"
                classNames={{ base: clsx("p-[16px] border-b border-white-active"), trigger: clsx("p-0"), title: clsx("text-base"), content: clsx("py-0") }}
              >
                <div className="flex w-full pt-[12px]">
                  <Table
                    aria-label="Table attachment"
                    classNames={{
                      wrapper: "p-0 shadow-none rounded-[8px] border border-white-active",
                      thead: "[&>tr]:first:rounded-none",
                      th: "first:rounded-s-none last:rounded-e-none",
                      td: "text-[12px]",
                    }}
                  >
                    <TableHeader className="bg-white-normal">
                      <TableColumn key={"name"} className="text-[12px] font-normal text-grey-lighter">Name</TableColumn>
                      <TableColumn key={"size"} className="text-[12px] font-normal text-grey-lighter">Size</TableColumn>
                      <TableColumn key={"date"} className="text-[12px] font-normal text-grey-lighter">Date</TableColumn>
                      <TableColumn key={"author"} className="text-end text-[12px] font-normal text-grey-lighter">Author</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow key={"attachment-1"}>
                        <TableCell>
                          <div className="flex items-center gap-[10px]">
                            <Avatar
                              fallback={
                                <Icon icon="solar:gallery-linear" height={14} style={{ color: "var(--yellow-600)" }} />
                              }
                              classNames={{ base: "w-[24px] h-[24px] rounded-[4px] bg-yellow-light-active", name: "text-base text-[10px] text-yellow-600" }}
                            />
                            Screenshot.jpg
                          </div>
                        </TableCell>
                        <TableCell className="text-grey-lighter">15 KB</TableCell>
                        <TableCell className="text-grey-lighter">01/01/24</TableCell>
                        <TableCell className="justify-items-end">
                          <Avatar
                            name="I"
                            classNames={{ base: "w-[24px] h-[24px] bg-yellow-light-active", name: "text-base text-[10px] text-yellow-600" }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow key={"attachment-2"}>
                        <TableCell>
                          <div className="flex items-center gap-[10px]">
                            <Avatar
                              fallback={
                                <Icon icon="solar:gallery-linear" height={14} style={{ color: "var(--yellow-600)" }} />
                              }
                              classNames={{ base: "w-[24px] h-[24px] rounded-[4px] bg-yellow-light-active", name: "text-base text-[10px] text-yellow-600" }}
                            />
                            Screenshot.jpg
                          </div>
                        </TableCell>
                        <TableCell className="text-grey-lighter">15 KB</TableCell>
                        <TableCell className="text-grey-lighter">01/01/24</TableCell>
                        <TableCell className="justify-items-end">
                          <Avatar
                            name="I"
                            classNames={{ base: "w-[24px] h-[24px] bg-yellow-light-active", name: "text-base text-[10px] text-yellow-600" }}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </AccordionItem>
              <AccordionItem
                key={3}
                aria-label="Link"
                title="Link"
                classNames={{ base: clsx("p-[16px] border-b border-white-active"), trigger: clsx("p-0"), title: clsx("text-base"), content: clsx("py-0") }}
              >
                <div className="flex w-full pt-[12px]">
                  <Table
                    aria-label="Table custom field"
                    classNames={{
                      wrapper: "p-0 shadow-none rounded-[8px] border border-white-active",
                      thead: "[&>tr]:first:rounded-none",
                      th: "first:rounded-s-none last:rounded-e-none",
                      td: "text-[12px]",
                    }}
                  >
                    <TableHeader className="bg-white-normal">
                      <TableColumn key={"link"} className="text-[12px] font-normal text-grey-lighter">Link</TableColumn>
                      <TableColumn key={"date"} className="text-[12px] font-normal text-grey-lighter">Date</TableColumn>
                      <TableColumn key={"author"} className="text-end text-[12px] font-normal text-grey-lighter">Author</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow key={"link-1"}>
                        <TableCell>Survey</TableCell>
                        <TableCell className="text-grey-lighter">01/01/2024</TableCell>
                        <TableCell className="justify-items-end">
                          <Avatar
                            name="I"
                            classNames={{ base: "w-[24px] h-[24px] bg-yellow-light-active", name: "text-base text-[10px] text-yellow-600" }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow key={"link-2"}>
                        <TableCell>Survey</TableCell>
                        <TableCell className="text-grey-lighter">01/01/2024</TableCell>
                        <TableCell className="justify-items-end">
                          <Avatar
                            name="I"
                            classNames={{ base: "w-[24px] h-[24px] bg-yellow-light-active", name: "text-base text-[10px] text-yellow-600" }}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </AccordionItem>
            </Accordion>
          )}
          {selectedBottomView === "subtask" && (
            <>
              <div className="flex w-full pt-[12px]">
                <Table
                  aria-label="Table custom field"
                  classNames={{
                    wrapper: "p-0 shadow-none rounded-[8px] border border-white-active",
                    thead: "[&>tr]:first:rounded-none",
                    th: "first:rounded-s-none last:rounded-e-none",
                    td: "text-[12px] border-b border-white-active",
                  }}
                >
                  <TableHeader className="bg-white-normal">
                    <TableColumn key={"name"} className="text-[12px] font-normal text-grey-lighter">Name</TableColumn>
                    <TableColumn key={"assignee"} className="text-[12px] font-normal text-grey-lighter">Assignee</TableColumn>
                    <TableColumn key={"date"} className="text-[12px] font-normal text-grey-lighter">Priority</TableColumn>
                    <TableColumn key={"author"} className="text-[12px] font-normal text-grey-lighter">Due Date</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key={"link-1"}>
                      <TableCell>Survey</TableCell>
                      <TableCell>
                        <AvatarGroup>
                          <Avatar
                            name="I"
                            classNames={{
                              base: clsx(
                                "w-[24px] h-[24px] border border-white bg-yellow-light-active",
                                "!-ms-[6px] data-[hover=true]:-translate-x-[4px] rtl:data-[hover=true]:translate-x-[4px] transition-transform",
                              ),
                              name: "text-base text-[10px] text-yellow-600"
                            }}
                          />
                          <Avatar
                            name="D"
                            classNames={{
                              base: clsx(
                                "w-[24px] h-[24px] border border-white bg-yellow-light-active",
                                "!-ms-[6px] data-[hover=true]:-translate-x-[4px] rtl:data-[hover=true]:translate-x-[4px] transition-transform",
                              ),
                              name: "text-base text-[10px] text-yellow-600"
                            }}
                          />
                          <Avatar
                            name="B"
                            classNames={{
                              base: clsx(
                                "w-[24px] h-[24px] border border-white bg-yellow-light-active",
                                "!-ms-[6px] data-[hover=true]:-translate-x-[4px] rtl:data-[hover=true]:translate-x-[4px] transition-transform",
                              ),
                              name: "text-base text-[10px] text-yellow-600"
                            }}
                          />
                        </AvatarGroup>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-[8px]">
                          <Icon icon="solar:flag-bold" height={16} style={{ color: "#E20000" }} />
                          <div className="text-base">
                            High
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-grey-lighter">01/01/2024</TableCell>
                    </TableRow>
                    <TableRow key={"add-subtask"} aria-colspan={4}>
                      <TableCell>
                        <div className="flex w-full items-center gap-[8px] text-grey-lighter cursor-pointer" onClick={() => openModal("createTask")}>
                          <Icon icon="heroicons:plus" />
                          <div className="flex items-center text-base">
                            Add Subtask
                          </div>
                        </div>
                      </TableCell>
                      <TableCell children={""}></TableCell>
                      <TableCell children={""}></TableCell>
                      <TableCell children={""}></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-start min-h-[162px]">

              </div>
            </>
          )}
        </div>
        <div className="flex pt-[16px] justify-end items-center">
          {loading && <Spinner />}

          <MyButton
            color="yellow"
            children="Save"
            onPress={() => handleFormSubmit()}
            className="px-[24px]"
          />
        </div>
      </div>
      <div className="flex xs:basis-full sm:basis-full md:basis-5/12 flex-1">
        <div className="flex basis-5/6 flex-col border-x border-white-active">
          {selectedRightView === "act" && (
            <div className="flex flex-col flex-1">
              <div className="flex p-[16px] self-stretch font-semibold">
                Activity
              </div>
              <div className="flex h-full flex-1 bg-white-normal">
                <ul className="flex flex-col px-[16px] py-[12px] gap-[8px] flex-1">
                  <li className="flex items-center gap-[8px] text-grey-lighter">
                    <Icon icon="solar:dot-bold" height={6} style={{ color: "var(--grey-lighter)" }} />
                    <div className="flex flex-1">You created this task.</div>
                    2 min
                  </li>
                  <li className="flex items-center gap-[8px] text-grey-lighter">
                    <Icon icon="solar:dot-bold" height={6} style={{ color: "var(--grey-lighter)" }} />
                    <div className="flex flex-1">You updated this task.</div>
                    1 min
                  </li>
                </ul>
              </div>
            </div>
          )}
          {selectedRightView === "chat" && (
            <div className="flex flex-col flex-1">
              <div className="flex p-[16px] self-stretch font-semibold">
                Message
              </div>
              <div className="flex h-full flex-1 bg-white-normal">
                <ul className="flex flex-col px-[16px] py-[12px] gap-[8px] flex-1">
                  <li className="flex items-center gap-[8px]">
                    <div className="flex items-center gap-[8px]">
                      <Avatar
                        name="I"
                        classNames={{ base: "w-[20px] h-[20px] bg-yellow-light-active", name: "text-base text-[10px] text-yellow-600" }}
                      />
                      <div className="text-base font-semibold">
                        InterActive
                      </div>
                    </div>
                  </li>
                  <li className="flex items-center gap-[8px]">
                    <div className="flex flex-1">Follow up this task.</div>
                    <div className="flex text-grey-lighter">1 min</div>
                  </li>
                  <li className="flex items-center gap-[8px]">
                    <div className="flex items-center gap-[8px]">
                      <Avatar
                        name="D"
                        classNames={{ base: "w-[20px] h-[20px] bg-yellow-light-active", name: "text-base text-[10px] text-yellow-600" }}
                      />
                      <div className="text-base font-semibold">
                        Dea Aurelia
                      </div>
                    </div>
                  </li>
                  <li className="flex items-center gap-[8px]">
                    <div className="flex flex-1">Okay.</div>
                    <div className="flex text-grey-lighter">1 min</div>
                  </li>
                  <li className="flex items-center gap-[8px]">
                    <div className="flex flex-1">
                      <Image src="/cuate.png" />
                    </div>
                    <div className="flex text-grey-lighter">1 min</div>
                  </li>
                </ul>
              </div>
              <div className="flex p-[16px] pb-[12px] self-stretch bg-white-normal">
                <Input
                  labelPlacement="outside"
                  startContent={
                    <div className="flex items-center cursor-pointer">
                      <Icon icon="solar:paperclip-linear" height={17} />
                    </div>
                  }
                  endContent={
                    <MyButton
                      color="yellow"
                      children="Send"
                      // onPress={() => closeAllModals()}
                      className="px-[18px]"
                    />
                  }
                  placeholder={
                    "Add a comment ..."
                  }
                  // value={iconSearchInput}
                  // onValueChange={val => handleSearch(val)}
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
                      "h-[52px]",
                      "px-[10px] py-[8px]",
                      "bg-white",
                      "rounded-[8px]",
                      "border border-white-normal-active",
                      "group-data-[hover=true]:bg-white",
                      "group-data-[focus=true]:bg-white group-data-[focus=true]:border-grey-dark-active",
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
              </div>
            </div>
          )}
        </div>
        <div className="flex basis-1/6 p-[8px] h-full flex-col items-center gap-[8px]">
          <div className="flex flex-col items-center cursor-pointer" onClick={() => setSelectedRightView("act")}>
            <div className={clsx("flex p-[8px] rounded-[8px]", {
              "bg-yellow-100": selectedRightView === "act",
            })}>
              <Icon icon="solar:history-linear" height={18} style={{ color: "var(--yellow-600)" }} />
            </div>
            <div className="text-base !text-[12px]">
              Act
            </div>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={() => setSelectedRightView("chat")}>
            <div className={clsx("flex p-[8px] rounded-[8px]", {
              "bg-yellow-100": selectedRightView === "chat",
            })}>
              <Icon icon="mynaui:chat-messages" height={18} style={{ color: "var(--yellow-600)" }} />
            </div>
            <div className="text-base !text-[12px]">
              Chat
            </div>
          </div>
          <Divider />
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M11 6.00004L6 6.00004M6 6.00004L1 6.00004M6 6.00004L6 1M6 6.00004L6 11" stroke="#B2BBC6" strokeWidth="1.25" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
