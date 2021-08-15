import { CustomHttpError } from '../common/CustomHttpError';

export interface ActionCallbacks {
  onSuccess?: (msg: string) => void, // eslint-disable-line
  onError?: (error: CustomHttpError) => void, // eslint-disable-line
  onFinish?: () => void,
}
