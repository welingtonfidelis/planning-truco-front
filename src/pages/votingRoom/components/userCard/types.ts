import { UserRoom } from "../../../../domains/room";

export interface Props {
  users: UserRoom[];
  showVotes: boolean;
}
