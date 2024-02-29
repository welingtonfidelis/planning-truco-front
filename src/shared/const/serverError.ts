import { KnownError } from "../../domains/knownError";

interface KnownErrorIndexed {
  [key: string]: KnownError;
}

export const ServerError = {
  //ROOMS
  MISSING_ROOM: {
      name: 'MISSING_ROOM',
      message: 'Missing rom id',
      code: 400,
      use: '/socket/connection'
  },
  INVALID_ROOM: {
      name: 'INVALID_ROOM',
      message: 'Invalid rom id',
      code: 400,
      use: '/socket/connection'
  },
}