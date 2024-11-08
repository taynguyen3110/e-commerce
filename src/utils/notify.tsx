// React Toastify
import { toast } from 'react-toastify';

export const notify = (type : string, text : string) => {
    if (type === "success") { toast.success(text); }
    else if (type === "error") { toast.error(text); }
    else if (type === "warn") { toast.warn(text); }
    else if (type === "info") { toast.info(text); }
  };