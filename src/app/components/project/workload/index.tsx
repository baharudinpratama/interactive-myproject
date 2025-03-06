import { Avatar, DateRangePicker, Progress } from "@nextui-org/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import MyButton from "@/app/components/button";
import { Image } from "@nextui-org/react";

export default function Workload() {
  return (
    <div className="flex flex-col flex-1 self-stretch bg-white">
      <div className="flex px-[6px] pb-[16px] justify-between items-center">
        <div className="flex">
          <DateRangePicker defaultValue={{
            start: today(getLocalTimeZone()),
            end: today(getLocalTimeZone()),
          }} />
        </div>

        <div className="flex items-center gap-[6px]">
          <MyButton
            variant="bordered"
            color="yellow"
          >
            Week
          </MyButton>
          <MyButton
            variant="bordered"
            color="yellow"
          >
            Month
          </MyButton>
        </div>
      </div>

      <div className="grid grid-cols-8 -mx-[16px] border border-collapse">
        <div className="flex h-[50px] flex-1 justify-center items-center border border-white-active">
          <div className="flex p-[8px]">Assignees</div>
        </div>
        <div className="flex h-[50px] flex-1 justify-center items-center border border-white-active">
          <div className="flex p-[8px] flex-col items-center">
            <div className="flex">Sunday</div>
            <div className="flex">Nov 30</div>
          </div>
        </div>
        <div className="flex h-[50px] flex-1 justify-center items-center border border-white-active">
          <div className="flex p-[8px] flex-col items-center">
            <div className="flex">Monday</div>
            <div className="flex">Dec 1</div>
          </div>
        </div>
        <div className="flex h-[50px] flex-1 justify-center items-center border border-white-active">
          <div className="flex p-[8px] flex-col items-center">
            <div className="flex">Tuesday</div>
            <div className="flex">Dec 2</div>
          </div>
        </div>
        <div className="flex h-[50px] flex-1 justify-center items-center border border-white-active">
          <div className="flex p-[8px] flex-col items-center">
            <div className="flex">Wednesday</div>
            <div className="flex">Dec 3</div>
          </div>
        </div>
        <div className="flex h-[50px] flex-1 justify-center items-center border border-white-active">
          <div className="flex p-[8px] flex-col items-center">
            <div className="flex">Thursday</div>
            <div className="flex">Dec 4</div>
          </div>
        </div>
        <div className="flex h-[50px] flex-1 justify-center items-center border border-white-active">
          <div className="flex p-[8px] flex-col items-center">
            <div className="flex">Friday</div>
            <div className="flex">Dec 5</div>
          </div>
        </div>
        <div className="flex h-[50px] flex-1 justify-center items-center border border-white-active">
          <div className="flex p-[8px] flex-col items-center">
            <div className="flex">Saturday</div>
            <div className="flex">Dec 6</div>
          </div>
        </div>

        <div className="flex h-[150px] p-[8px] flex-1 border border-white-active">
          <div className="flex items-center gap-[8px]">
            <Avatar
              name="I"
              classNames={{ base: "w-[24px] h-[24px] bg-yellow-light-active", name: "text-base text-[10px] text-yellow-600" }}
            />
            <div className="text-base">
              InterActive
            </div>
          </div>
        </div>
        <div className="flex px-[20px] py-[8px] items-center flex-1 border border-white-active">
          <div className="flex w-full h-full">
            <Image src="/workload-skeleton.png" className="w-full h-full object-fill" />
          </div>
        </div>
        <div className="flex px-[20px] py-[8px] items-center flex-1 border border-white-active">
          <div className="w-full h-full flex flex-col-reverse rounded-lg overflow-hidden">
            <div
              className="w-full"
              style={{ height: `25%`, backgroundColor: "#3FBF9C" }}
            ></div>
            <div
              className="w-full opacity-30"
              style={{ height: `75%`, backgroundColor: "#3FBF9C" }}
            ></div>
          </div>
        </div>
        <div className="flex px-[20px] py-[8px] items-center flex-1 border border-white-active">
          <div className="w-full h-full flex flex-col-reverse rounded-lg overflow-hidden">
            <div
              className="w-full"
              style={{ height: `45%`, backgroundColor: "#FFB844" }}
            ></div>
            <div
              className="w-full opacity-30"
              style={{ height: `55%`, backgroundColor: "#FFB844" }}
            ></div>
          </div>
        </div>
        <div className="flex px-[20px] py-[8px] items-center flex-1 border border-white-active">
          <div className="w-full h-full flex flex-col-reverse rounded-lg overflow-hidden">
            <div
              className="w-full"
              style={{ height: `100%`, backgroundColor: "#F36B6D" }}
            ></div>
            <div
              className="w-full opacity-30"
              style={{ height: `0%`, backgroundColor: "#F36B6D" }}
            ></div>
          </div>
        </div>
        <div className="flex px-[20px] py-[8px] items-center flex-1 border border-white-active">
          <div className="w-full h-full flex flex-col-reverse rounded-lg overflow-hidden">
            <div
              className="w-full"
              style={{ height: `25%`, backgroundColor: "#3FBF9C" }}
            ></div>
            <div
              className="w-full opacity-30"
              style={{ height: `75%`, backgroundColor: "#3FBF9C" }}
            ></div>
          </div>
        </div>
        <div className="flex px-[20px] py-[8px] items-center flex-1 border border-white-active">
          <div className="w-full h-full flex flex-col-reverse rounded-lg overflow-hidden">
            <div
              className="flex w-full justify-center items-center text-white"
              style={{ height: `75%`, backgroundColor: "#F36B6D" }}
            ></div>
            <div
              className="flex w-full justify-center items-center text-white opacity-30"
              style={{ height: `25%`, backgroundColor: "#F36B6D" }}
            ></div>
          </div>
        </div>
        <div className="flex px-[20px] py-[8px] items-center flex-1 border border-white-active">
          <div className="flex w-full h-full">
            <Image src="/workload-skeleton.png" className="w-full h-full object-fill" />
          </div>
        </div>

        <div className="flex h-[150px] p-[8px] flex-1 border border-white-active">
          <div className="flex items-center gap-[8px]">
            <Avatar
              name="D"
              classNames={{ base: "w-[24px] h-[24px] bg-yellow-light-active", name: "text-base text-[10px] text-yellow-600" }}
            />
            <div className="text-base">
              Dea Aurelia
            </div>
          </div>
        </div>
        <div className="flex px-[20px] py-[8px] items-center flex-1 border border-white-active">
          <div className="flex w-full h-full">
            <Image src="/workload-skeleton.png" className="w-full h-full object-fill" />
          </div>
        </div>
        <div className="flex px-[20px] py-[8px] items-center flex-1 border border-white-active">
          <div className="w-full h-full flex flex-col-reverse rounded-lg overflow-hidden">
            <div
              className="w-full"
              style={{ height: `100%`, backgroundColor: "#F36B6D" }}
            ></div>
            <div
              className="w-full opacity-30"
              style={{ height: `0%`, backgroundColor: "#F36B6D" }}
            ></div>
          </div>
        </div>
        <div className="flex px-[20px] py-[8px] items-center flex-1 border border-white-active">
          <div className="w-full h-full flex flex-col-reverse rounded-lg overflow-hidden">
            <div
              className="w-full"
              style={{ height: `75%`, backgroundColor: "#F36B6D" }}
            ></div>
            <div
              className="w-full opacity-30"
              style={{ height: `25%`, backgroundColor: "#F36B6D" }}
            ></div>
          </div>
        </div>
        <div className="flex px-[20px] py-[8px] items-center flex-1 border border-white-active">
          <div className="w-full h-full flex flex-col-reverse rounded-lg overflow-hidden">
            <div
              className="w-full"
              style={{ height: `25%`, backgroundColor: "#3FBF9C" }}
            ></div>
            <div
              className="w-full opacity-30"
              style={{ height: `75%`, backgroundColor: "#3FBF9C" }}
            ></div>
          </div>
        </div>
        <div className="flex px-[20px] py-[8px] items-center flex-1 border border-white-active">
          <div className="w-full h-full flex flex-col-reverse rounded-lg overflow-hidden">
            <div
              className="w-full"
              style={{ height: `45%`, backgroundColor: "#FFB844" }}
            ></div>
            <div
              className="w-full opacity-30"
              style={{ height: `55%`, backgroundColor: "#FFB844" }}
            ></div>
          </div>
        </div>
        <div className="flex px-[20px] py-[8px] items-center flex-1 border border-white-active">
          <div className="w-full h-full flex flex-col-reverse rounded-lg overflow-hidden">
            <div
              className="w-full"
              style={{ height: `25%`, backgroundColor: "#3FBF9C" }}
            ></div>
            <div
              className="w-full opacity-30"
              style={{ height: `75%`, backgroundColor: "#3FBF9C" }}
            ></div>
          </div>
        </div>
        <div className="flex px-[20px] py-[8px] items-center flex-1 border border-white-active">
          <div className="flex w-full h-full">
            <Image src="/workload-skeleton.png" className="w-full h-full object-fill" />
          </div>
        </div>
      </div>
    </div>
  );
}
