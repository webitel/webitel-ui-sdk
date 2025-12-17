import { Ref } from "vue";
interface UseDropzoneHandlers {
    isDropzoneVisible: Ref<boolean>;
    handleDragEnter: () => void;
    handleDragLeave: () => void;
}
export declare const useDropzoneHandlers: () => UseDropzoneHandlers;
export {};
