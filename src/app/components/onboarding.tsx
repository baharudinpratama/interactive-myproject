"use client";

import MyButton from "@/app/components/button";
import MyInput from "@/app/components/input";
import { useModalContext } from "@/app/contexts/modal";
import { Icon } from "@iconify-icon/react";
import { Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Onboarding() {
  const { openModals, closeAllModals, openModal } = useModalContext();
  const [step, setStep] = useState(1);
  const [plans] = useState(["Work", "Personal", "School"]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [teamCategories] = useState(["Just Me", "2-50", "51-200", "201-500", "501-2000", "I don't know"]);
  const [solutions] = useState([
    "Support", "Engineering & Product", "Sales & CRM", "Marketing", "PMO", "IT", "Creative & Design", "Professional Services",
    "HR & Recruiting", "Operations", "Personal Use", "Finance & Accounting", "Other",
  ]);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeenOnboarding) {
      openModal("onboarding");
      localStorage.setItem("hasSeenOnboarding", "true");
    }
  }, []);

  const handleStep = (plan?: string) => {
    if (plan) {
      setSelectedPlan(plan);
      if (plan === "Personal" && step === 1) {
        return setStep(3);
      }
    }
    setStep(step => step + 1);
  }

  const handleStepBack = () => {
    if (selectedPlan === "Personal" && step === 3) {
      return setStep(1);
    }
    setStep(step => step - 1);
  }

  return (
    <Modal isOpen={openModals["onboarding"]} hideCloseButton={true} size="2xl">
      <ModalContent className="overflow-visible bg-[url('/bg-polkadot.png')] bg-cover">
        {() => (
          <>
            <ModalHeader className="min-h-[110px] px-[25px] py-[20px]">
              <Image src="/logo-myproject-yellow.png" height={36} className="rounded-none" />
            </ModalHeader>
            <ModalBody className="px-[25px] py-[20px]">
              {step === 1 && (
                <div className="flex flex-col">
                  <div className="flex flex-col gap-[50px]">
                    <div className="flex flex-col items-center">
                      <div className="text-[24px] font-bold text-yellow-500 leading-[125%]">Welcome!</div>
                      <div className="max-w-[708px] text-center text-[32px] font-bold leading-[125%]">
                        What do you plan to achieve with MyProject?
                      </div>
                    </div>
                    <div className="flex justify-center gap-[15px]">
                      {plans.map(plan => {
                        return (
                          <MyButton
                            variant="bordered"
                            color="yellow"
                            children={plan}
                            onPress={() => handleStep(plan)}
                            className="px-[24px]"
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="flex flex-col">
                  <div className="flex flex-col gap-[50px]">
                    <div className="flex flex-col items-center">
                      <div className="max-w-[708px] text-center text-[32px] font-bold leading-[125%]">
                        How many team members will you collaborate with?
                      </div>
                    </div>
                    <div className="flex justify-center self-stretch">
                      <div className="grid grid-cols-3 min-w-[500px] gap-[15px]">
                        {teamCategories.map(teamCat => {
                          return (
                            <MyButton
                              variant="bordered"
                              color="yellow"
                              children={teamCat}
                              onPress={() => handleStep()}
                              className="px-[24px]"
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="flex flex-col">
                  <div className="flex flex-col gap-[50px]">
                    <div className="flex flex-col items-center">
                      <div className="max-w-[708px] text-center text-[32px] font-bold leading-[125%]">
                        Which solution do you want to begin with?
                      </div>
                    </div>
                    <div className="flex justify-center self-stretch">
                      <div className="flex flex-wrap justify-center min-w-[500px] gap-[15px]">
                        {solutions.map((solution, index) => {
                          return (
                            <MyButton
                              key={index}
                              variant="bordered"
                              color="yellow"
                              children={solution}
                              onPress={() => handleStep()}
                              className="px-[24px]"
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="flex flex-col">
                  <div className="flex flex-col gap-[50px]">
                    <div className="flex flex-col items-center">
                      <div className="max-w-[708px] text-center text-[32px] font-bold leading-[125%]">
                        What do you want to name your Workspace?
                      </div>
                    </div>
                    <div className="flex justify-center self-stretch">
                      <div className="flex flex-wrap justify-center min-w-[500px] gap-[15px]">
                        <MyInput
                          placeholder="Enter your workspace"
                          onKeyDown={(e) => { e.key === "Enter" && closeAllModals() }}
                          className="w-[250px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </ModalBody>

            <ModalFooter className="flex h-[115px] px-[35px] justify-between items-center">
              {step !== 1 && (
                <MyButton
                  variant="bordered"
                  color="yellow"
                  startContent={<Icon icon="solar:alt-arrow-left-linear" />}
                  children="Back"
                  onPress={() => handleStepBack()}
                  className="justify-start"
                />
              )}
              {step === 4 && (
                <MyButton
                  color="yellow"
                  endContent={<Icon icon="solar:alt-arrow-right-linear" style={{ color: "var(--yellow-500)" }} />}
                  children="Next"
                  onPress={() => closeAllModals()}
                  className="justify-end"
                />
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
