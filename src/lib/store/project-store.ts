import { Project } from "@/lib/types";
import axios from "axios";
import { create } from "zustand";

type ProjectStore = {
  project: Project | null
  loading: boolean
  fetchProject: (id: number | string) => Promise<void>
  setProject: (data: Project) => void
}

export const useProjectStore = create<ProjectStore>((set) => ({
  project: null,
  loading: true,
  fetchProject: async (id) => {
    set({ loading: true })
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`);
      const data = res.data.data;
      set({ project: data, loading: false })
    } catch (error) {
      console.error("Failed to fetch project:", error)
      set({ project: null, loading: false })
    }
  },
  setProject: (data) => set({ project: data }),
}));
