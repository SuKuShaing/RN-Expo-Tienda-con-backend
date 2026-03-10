import { create } from "zustand";

interface TemporalCameraStoreState {
    selectedImages: string[];

    addSelectedImage: (image: string) => void;
    clearImages: () => void;
}

export const useCameraStore = create<TemporalCameraStoreState>()((set) => ({
    selectedImages: [],

    // usando el set y un callback, podemos evitar usar el get
    // esta fn añade una imagen más al array de imágenes seleccionadas
    addSelectedImage: (image) => {
        set((state) => ({ selectedImages: [...state.selectedImages, image] }));
    },

    clearImages: () => set({ selectedImages: [] }),
}));
