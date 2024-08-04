import { create } from 'zustand';

interface BoxStore {
     id: string;
     setId: (id: string) => void;
}

export const useBox = create<BoxStore>((set) => ({
     id: "",
     setId: (id: string) => set({ id }),
}));