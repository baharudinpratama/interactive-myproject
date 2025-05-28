"use client";

import { Icon } from "@iconify-icon/react";

export default function Page() {
  return (
    <>
      <div className="flex justify-between items-center self-stretch border-b">
        <div className="p-[16px]">
          All workspace
        </div>

        <div className="flex p-[16px] items-center gap-[8px] self-stretch">
          <Icon icon="solar:tuning-linear" height={16} /> Filter
        </div>
      </div>

      <div className="flex flex-col overflow-y-auto p-[16px] items-start gap-[16px] flex-1 self-stretch bg-secondary">
        <div className="flex flex-col items-start gap-[16px] self-stretch">
          <div className="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 w-full gap-[16px]">
            {[
              { label: "Unassigned task", count: 0 },
              { label: "Task not started", count: 0 },
              { label: "Task in progress", count: 0 },
              { label: "Task completed", count: 0 },
            ].map((item, index) => {
              return (
                <div key={index} className="flex flex-col p-[16px] items-start gap-[8px] border rounded-lg bg-white">
                  <div className="text-[#909DAD] overflow-hidden">
                    {item.label}
                  </div>
                  <div className="text-[20px] font-bold">
                    {item.count}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex self-stretch">
            <div className="grid grid-cols-12 w-full gap-[16px]">
              <div className="xs:col-span-12 sm:col-span-9">
                <div className="grid grid-cols-12 w-full gap-[16px]">
                  <div className="xs:col-span-12 sm:col-span-5">
                    <div className="flex flex-col min-h-[360px] p-[16px] items-start gap-[16px] rounded-lg border bg-white">
                      <div className="text-[#909DAD]">
                        Total Tasks by Assignee
                      </div>

                      <div className="flex flex-col justify-center items-center flex-1 self-stretch">
                        <div className="text-[#909DAD] text-[16px]">
                          No result
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="xs:col-span-12 sm:col-span-7">
                    <div className="flex flex-col min-h-[360px] p-[16px] items-start gap-[16px] rounded-lg border bg-white">
                      <div className="text-[#909DAD]">
                        Open Tasks by Assignee
                      </div>

                      <div className="flex flex-col justify-center items-center flex-1 self-stretch">
                        <div className="text-[#909DAD] text-[16px]">
                          No result
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-12">
                    <div className="flex flex-col p-[16px] gap-[16px] items-start self-stretch border rounded-[8px] bg-white">
                      <div className="self-stretch text-[#909DAD] text-sm font-medium">
                        Workload by status
                      </div>
                      <div className="flex h-14 self-stretch rounded-lg border bg-stone-50"></div>
                      <div className="flex justify-center self-stretch">
                        <div className="flex flex-wrap items-center gap-[16px]">
                          {[
                            { label: "To do", color: "bg-zinc-400" },
                            { label: "On going", color: "bg-indigo-400" },
                            { label: "Reviewed", color: "bg-orange-500" },
                            { label: "Done", color: "bg-emerald-600" },
                          ].map((item, index) => {
                            return (
                              <div key={index} className="flex min-w-max items-center gap-[4px]">
                                <div className={`w-4 h-2 border rounded ${item.color}`}></div>
                                <div className="self-stretch text-[#909DAD] font-medium">
                                  {item.label}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="xs:col-span-12 sm:col-span-3">
                <div className="flex flex-col min-h-[360px] h-full p-[16px] items-start gap-[16px] flex-1 self-stretch rounded-[8px] border bg-white">
                  <div className="self-stretch text-[#909DAD]">
                    Task completed this week
                  </div>
                  <div className="flex justify-center items-center flex-1 self-stretch">
                    <div className="text-[#909DAD] font-[16px]">
                      No task completed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-72 items-start gap-[16px] self-stretch">
            <div className="flex w-full h-full items-start gap-[16px] bg-white">
              <div className="flex flex-col w-3/12 h-full p-[16px] items-start gap-2 flex-1 self-stretch rounded-lg border">
                <div className="self-stretch text-[#909DAD] text-sm font-medium">
                  Tasks Due This Week or Overdue
                </div>
                <div className="flex justify-center items-center flex-1 self-stretch text-[#909DAD] text-sm">
                  No result
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}
