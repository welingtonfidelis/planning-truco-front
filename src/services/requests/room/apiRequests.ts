import { EndPoints } from "../../../shared/enum/endPoints";
import RestRequestService from "../api";
import { CreateRoomPayload, CreateRoomResponse } from "./types";

const { CREATE } = EndPoints.ROOM;

export const create = async (payload: CreateRoomPayload) => {
  const { data: response } = await RestRequestService.post<CreateRoomResponse>(
    CREATE,
    payload
  );
  return response;
};
