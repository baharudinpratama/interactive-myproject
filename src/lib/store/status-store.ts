import { Status } from "@/lib/types";
import axios from "axios";
import { create } from "zustand";

type StatusStore = {
  status: Status[] | []
  loading: boolean
  fetchStatus: (id: number | string) => Promise<void>
  setStatus: (data: Status[]) => void
}

export const useStatusStore = create<StatusStore>((set) => ({
  status: [],
  loading: true,
  fetchStatus: async (id) => {
    set({ loading: true })
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/statuses/`);
      const data = res.data.data;
      set({ status: data, loading: false })
    } catch (error) {
      console.error("Failed to fetch status:", error)
      set({ status: [], loading: false })
    }
  },
  setStatus: (data) => set({ status: data }),
}));
