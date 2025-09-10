import { toast } from "react-toastify";

export const successToast = (message: string) => toast.success(message);
export const failureToast = (message: string) => toast.error(message);