import Navbar from "@/app/components/navbar";
import { ArchiveProject, DeleteProject, DuplicateProject, ShareProject } from "@/app/components/project";
import Sidebar from "@/app/components/sidebar/sidebar";
import { ModalProvider } from "@/app/contexts/modal";
import { SidebarProvider } from "@/app/contexts/sidebar";

export default function MainLayout(
  { children }: Readonly<{ children: React.ReactNode; }>
) {
  return (
    <div className="flex min-w-screen w-full min-h-screen xs:h-screen sm:h-screen h-screen items-start bg-white">
      <ModalProvider>
        <SidebarProvider>
          <Sidebar />
        </SidebarProvider>

        <div className="flex flex-col items-start flex-1 self-stretch">
          <Navbar />

          {children}
        </div>

        <ArchiveProject />
        <DuplicateProject />
        <DeleteProject />
        <ShareProject />
      </ModalProvider>
    </div>
  );
}
