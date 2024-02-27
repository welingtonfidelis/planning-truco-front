import { Socket } from "socket.io-client";

export type State = {
  socket: Socket | null;
};

export type Action = {
  createSocketConnection: (data: Socket) => void;
  destroySocketConnection: () => void;
};
