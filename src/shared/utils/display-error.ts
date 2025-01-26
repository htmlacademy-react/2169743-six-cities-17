import { toast } from 'react-toastify';
import type { ApiError } from './../types';

function displayError(errorInfo: ApiError) {
  if (Object.hasOwnProperty.call(errorInfo, 'details') && errorInfo?.details?.length) {
    errorInfo.details?.forEach((error) => {
      toast.warn(error.messages.join('; '));
    });
  } else {
    toast.warn(errorInfo.message);
  }
}

export default displayError;
