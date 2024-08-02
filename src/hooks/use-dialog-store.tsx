import { create } from "zustand"

interface DialogStore {
     isOpen: boolean
     setOpen: () => void
     setClose: () => void
}

/* --- CARD DIALOG STORE --- */
export const useCardDialog = create<DialogStore>((set) => ({
     isOpen: false,
     setOpen: () => set({ isOpen: true }),
     setClose: () => set({ isOpen: false }),
}));


/* --- BOX DIALOG STORE --- */
export const useBoxDialog = create<DialogStore>((set) => ({
     isOpen: false,
     setOpen: () => set({ isOpen: true }),
     setClose: () => set({ isOpen: false }),
}));


/* --- COLLECTION DIALOG STORE --- */
export const useCollectionDialog = create<DialogStore>((set) => ({
     isOpen: false,
     setOpen: () => set({ isOpen: true }),
     setClose: () => set({ isOpen: false }),
}));


/* --- STATUS DIALOG STORE --- */
export const useStatusDialog = create<DialogStore>((set) => ({
     isOpen: false,
     setOpen: () => set({ isOpen: true }),
     setClose: () => set({ isOpen: false }),
}));
