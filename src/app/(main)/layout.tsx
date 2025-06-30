"use client";

import CloseModal from "@/app/components/close-modal";
import Navbar from "@/app/components/navbar";
import Onboarding from "@/app/components/onboarding";
import { ArchiveProject, DeleteProject, DuplicateProject, ShareProject } from "@/app/components/project";
import ProjectStatuses from "@/app/components/project/project-statuses";
import RenameProject from "@/app/components/project/rename";
import Sidebar from "@/app/components/sidebar/sidebar";
import { SidebarProvider } from "@/app/contexts/sidebar";
import { WorkspaceProvider } from "@/app/contexts/workspace";
import { useWorkspaceStore } from "@/lib/store/workspace-store";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function MainLayout(
  { children }: Readonly<{ children: React.ReactNode; }>
) {
  const { data: session } = useSession();
  const { fetchWorkspace } = useWorkspaceStore();

  useEffect(() => {
    if (session?.user.id) {
      fetchWorkspace(session.user.id);
    } else {
      redirect("/sign-in");
    }
  }, [session]);

  return (
    <div className="flex min-h-screen h-screen items-start bg-white">
      <SidebarProvider>
        <WorkspaceProvider>
          <Sidebar />

          <div className="flex flex-col w-full h-full items-start overflow-y-auto">
            <Navbar />

            {children}
          </div>

          <Onboarding />
          <ArchiveProject />
          <DuplicateProject />
          <DeleteProject />
          <ShareProject />
          <RenameProject />
          <ProjectStatuses />
          <CloseModal />
        </WorkspaceProvider>
      </SidebarProvider>
    </div>
  );
}
