import { Workspace } from "@/lib/types";
import axios from "axios";
import { create } from "zustand";

type WorkspaceStore = {
  workspace: Workspace[] | []
  loading: boolean
  fetchWorkspace: (userId: number | string) => Promise<void>
  setWorkspace: (data: Workspace[]) => void
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  workspace: [],
  loading: true,
  fetchWorkspace: async (userId) => {
    set({ loading: true })
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${userId}`);
      const data = res.data.data;
      set({ workspace: data, loading: false })
    } catch (error) {
      console.error("Failed to fetch workspace:", error)
      set({ workspace: [], loading: false })
    }
  },
  setWorkspace: (data) => set({ workspace: data }),
}));
