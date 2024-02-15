import { GuestLayout } from "./components/layouts/guestLayout";
import { ApplicationRoutes } from "./shared/enum/applicationRoutes";
import { Login } from "./pages/login";
import { NotFound } from "./pages/notFound";
import { VotingRoom } from "./pages/votingRoom";

const { ROOT, VOTING_ROOM } = ApplicationRoutes;

export const routes = [
  {
    label: "pages.login.page_title",
    path: ROOT,
    element: Login,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [],
  },
  {
    label: "pages.voting_room",
    path: VOTING_ROOM,
    element: VotingRoom,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [],
  },
  {
    label: "not found",
    path: "*",
    element: NotFound,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [],
  },
];
