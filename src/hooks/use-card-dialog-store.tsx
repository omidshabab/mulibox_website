import { create } from "zustand"

interface CardDialogStore {
     isOpen: boolean
     setOpen: () => void
     setClose: () => void
}

export const useCardDialog = create<CardDialogStore>((set) => ({
     isOpen: false,
     setOpen: () => set({ isOpen: true }),
     setClose: () => set({ isOpen: false }),
}));
