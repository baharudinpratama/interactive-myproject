import CloseModal from "@/app/components/close-modal";
import Navbar from "@/app/components/navbar";
import Onboarding from "@/app/components/onboarding";
import { ArchiveProject, DeleteProject, DuplicateProject, ShareProject } from "@/app/components/project";
import RenameProject from "@/app/components/project/rename";
import Sidebar from "@/app/components/sidebar/sidebar";
import { ModalProvider } from "@/app/contexts/modal";
import { SidebarProvider } from "@/app/contexts/sidebar";
import { WorkspaceProvider } from "@/app/contexts/workspace";

export default function MainLayout(
  { children }: Readonly<{ children: React.ReactNode; }>
) {
  return (
    <div className="flex min-w-screen w-full min-h-screen xs:h-screen sm:h-screen h-screen items-start bg-white">
      <WorkspaceProvider>
        <ModalProvider>
          <SidebarProvider>
            <Sidebar />
          </SidebarProvider>

          <div className="flex flex-col items-start flex-1 self-stretch">
            <Navbar />

            {children}
          </div>

          <Onboarding />
          <ArchiveProject />
          <DuplicateProject />
          <DeleteProject />
          <ShareProject />
          <RenameProject />
          <CloseModal />
        </ModalProvider>
      </WorkspaceProvider>
    </div>
  );
}
