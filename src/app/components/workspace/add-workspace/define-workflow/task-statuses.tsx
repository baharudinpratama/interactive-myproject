import MyButton from "@/app/components/button";
import MyInput from "@/app/components/input";
import { useModalContext } from "@/app/contexts/modal";
import { Icon } from "@iconify-icon/react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useState } from "react";
import IconPicker from "./icon-picker";
import UrlConverter from "@/app/components/url-converter";

export default function TaskStatuses() {
  const [taskStatuses, setTaskStatuses] = useState([
    { id: "to-do", name: "TO DO", icon: "solar:record-circle-fill-linear", iconColor: "#B2BBC6" },
  ]);

  const { openModals, closeModal, openModal } = useModalContext();
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [color, setColor] = useState("#B2BBC6");
  const [icon, setIcon] = useState("solar:alt-arrow-down-outline");
  const [statusNameInput, setStatusNameInput] = useState("");

  const handleContinue = () => {
    closeModal("defineWorkflowDetailStatus");
    const id = UrlConverter(statusNameInput);
    setTaskStatuses([...taskStatuses, { id: id, name: statusNameInput, icon: icon, iconColor: color }])
  }

  return (
    <>
      <div className="flex flex-col min-h-[184px] gap-[12px]">
        Set (project name) statuses

        <div className="flex flex-col items-center gap-[12px] self-stretch">
          {taskStatuses.map(taskStatus => {
            return (
              <div key={`task-status-${taskStatus.id}`} className="flex p-[10px] items-center gap-[8px] self-stretch rounded-[8px] border border-white-active">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6.66667 8.00006C6.66667 7.26368 6.06971 6.66673 5.33333 6.66673C4.59696 6.66673 4 7.26368 4 8.00006C4 8.73644 4.59696 9.33339 5.33334 9.33339C6.06971 9.33339 6.66667 8.73644 6.66667 8.00006Z" fill="#B2BBC6" />
                  <path d="M6.66667 3.33333C6.66667 2.59695 6.06971 2 5.33333 2C4.59696 2 4 2.59695 4 3.33333C4 4.06971 4.59696 4.66667 5.33333 4.66667C6.06971 4.66667 6.66667 4.06971 6.66667 3.33333Z" fill="#B2BBC6" />
                  <path d="M6.66667 12.6667C6.66667 11.9303 6.06971 11.3334 5.33333 11.3334C4.59695 11.3334 4 11.9303 4 12.6667C4 13.4031 4.59695 14 5.33333 14C6.06971 14 6.66667 13.4031 6.66667 12.6667Z" fill="#B2BBC6" />
                  <path d="M12.0002 8.00006C12.0002 7.26368 11.4032 6.66673 10.6668 6.66673C9.93045 6.66673 9.3335 7.26368 9.3335 8.00006C9.3335 8.73644 9.93045 9.33339 10.6668 9.33339C11.4032 9.33339 12.0002 8.73644 12.0002 8.00006Z" fill="#B2BBC6" />
                  <path d="M12.0002 3.33333C12.0002 2.59695 11.4032 2 10.6668 2C9.93045 2 9.3335 2.59695 9.3335 3.33333C9.3335 4.06971 9.93045 4.66667 10.6668 4.66667C11.4032 4.66667 12.0002 4.06971 12.0002 3.33333Z" fill="#B2BBC6" />
                  <path d="M12.0002 12.6667C12.0002 11.9303 11.4032 11.3334 10.6668 11.3334C9.93045 11.3334 9.3335 11.9303 9.3335 12.6667C9.3335 13.4031 9.93045 14 10.6668 14C11.4032 14 12.0002 13.4031 12.0002 12.6667Z" fill="#B2BBC6" />
                </svg>

                <div className="flex item-center gap-[8px] flex-1">
                  <div className="flex items-center">
                    <Icon icon={taskStatus.icon} height={16} style={{ color: taskStatus.iconColor }} />
                  </div>

                  {taskStatus.name}
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4.04167 7.99984C4.04167 8.39104 3.72454 8.70817 3.33333 8.70817C2.94213 8.70817 2.625 8.39104 2.625 7.99984C2.625 7.60864 2.94213 7.2915 3.33333 7.2915C3.72454 7.2915 4.04167 7.60864 4.04167 7.99984ZM8.70833 7.99984C8.70833 8.39104 8.3912 8.70817 8 8.70817C7.6088 8.70817 7.29167 8.39104 7.29167 7.99984C7.29167 7.60864 7.6088 7.2915 8 7.2915C8.3912 7.2915 8.70833 7.60864 8.70833 7.99984ZM13.375 7.99984C13.375 8.39104 13.0579 8.70817 12.6667 8.70817C12.2755 8.70817 11.9583 8.39104 11.9583 7.99984C11.9583 7.60864 12.2755 7.2915 12.6667 7.2915C13.0579 7.2915 13.375 7.60864 13.375 7.99984Z" fill="#B2BBC6" stroke="#B2BBC6" strokeWidth="1.25" />
                </svg>
              </div>
            );
          })}

          <button onClick={() => openModal("defineWorkflowDetailStatus")} className="flex p-[10px] items-center gap-[8px] self-stretch rounded-[8px] border border-dashed">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
              <path d="M9 5.50003L5 5.50003M5 5.50003L1 5.50003M5 5.50003L5 1.5M5 5.50003L5 9.5" stroke="#B2BBC6" strokeWidth="1.25" strokeLinecap="round" />
            </svg>
            <div className="flex flex-1 text-grey-lighter">Add status</div>
          </button>
        </div>
      </div>

      <Modal isOpen={openModals["defineWorkflowDetailStatus"]} onClose={() => openModal("defineWorkflow")} hideCloseButton={true}>
        <ModalContent className="overflow-visible">
          {() => {
            return (
              <>
                <ModalHeader className="px-[25px] pb-[10px] pt-[20px]">
                  <div className="flex flex-col w-full">
                    <div className="flex items-center gap-[8px] self-stretch">
                      <div className="flex flex-1 items-center gap-[8px]">
                        <div className="text-[16px] font-semibold">
                          Detail Status
                        </div>
                        <div>
                          <Icon icon="solar:info-circle-bold" size={16} style={{ color: "var(--yellow)" }} />
                        </div>
                      </div>

                      <button type="button" onClick={() => closeModal("defineWorkflowDetailStatus")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <path d="M9.9583 1.00004L1 9.95833M0.999962 1L9.95826 9.9583" stroke="#090B0E" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>

                    <div className="text-grey-lighter text-base font-normal">
                      Easily customize your task status to match your workflow.
                    </div>
                  </div>
                </ModalHeader>

                <ModalBody className="px-[25px] pb-[20px] pt-[10px]">
                  <div className="flex flex-col gap-[12px]">
                    <div className="flex flex-col gap-[6px]">
                      Icon & Name

                      <div className="flex items-center gap-[12px]">
                        <div role="button" onClick={() => setShowIconPicker(prev => !prev)} className="flex size-[46px] p-[15px] justify-center items-center rounded-[8px] border border-grey-light-active bg-white-alt-active">
                          <Icon icon={icon} height={20} style={{ color: color }} />
                        </div>
                        <MyInput
                          value={statusNameInput}
                          onValueChange={setStatusNameInput}
                          placeholder="Enter task status"
                        />
                      </div>

                      {showIconPicker && (
                        <IconPicker icon={icon} color={color} onSelected={(icon, color) => { setIcon(icon); setColor(color) }} />
                      )}
                    </div>

                    <div className="flex flex-col gap-[2px]">
                      Custom Field

                      <button onClick={() => openModal("defineWorkflowDetailStatus")} className="flex p-[10px] items-center gap-[8px] self-stretch rounded-[8px] border border-dashed">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                          <path d="M9 5.50003L5 5.50003M5 5.50003L1 5.50003M5 5.50003L5 1.5M5 5.50003L5 9.5" stroke="#B2BBC6" strokeWidth="1.25" strokeLinecap="round" />
                        </svg>
                        <div className="flex flex-1 text-grey-lighter">Add status</div>
                      </button>
                    </div>

                    <div className="flex justify-end items-center gap-[12px]">
                      <MyButton
                        variant="bordered"
                        color="yellow"
                        children="Back"
                        onPress={() => closeModal("defineWorkflowDetailStatus")}
                        className="px-[24px]"
                      />

                      <MyButton
                        color="yellow"
                        children="Continue"
                        onPress={handleContinue}
                        className="px-[24px]"
                      />
                    </div>
                  </div>
                </ModalBody>
              </>
            )
          }}
        </ModalContent>
      </Modal>
    </>
  );
}
