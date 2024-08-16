import { TLinkSidebar } from "../../types/general.types";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';

const navbar_items: TLinkSidebar[] = [
  {
    id: 1,
    name: "Dashboard",
    link: "/",
    icon: HomeWorkIcon,
    show: false,
  },
  {
    id: 2,
    name: "Clubs",
    link: "/clubs",
    icon: SportsGolfIcon,
    show: true,
  },
  // {
  //   id: 3,
  //   name: "Carriers",
  //   link: "/carrier",
  //   icon: Carriers,
  //   show: true,
  // },
  // {
  //   id: 4,
  //   name: "Client",
  //   link: "/client",
  //   icon: Client,
  //   show: true,
  // },
  // {
  //   id: 5,
  //   name: "Groups",
  //   link: "/group",
  //   icon: Groups,
  //   show: true,
  // },
  // {
  //   id: 6,
  //   name: "Network",
  //   link: "/network",
  //   icon: Network,
  //   show: true,
  // },
  // {
  //   id: 7,
  //   name: "Provider Master",
  //   link: "/provider-master",
  //   icon: ProviderMaster,
  //   show: true,
  // },
  // {
  //   id: 8,
  //   name: "Provider",
  //   link: "/provider",
  //   icon: Providers,
  //   show: true,
  // },
  // {
  //   id: 9,
  //   name: "Plan",
  //   link: "/plan",
  //   icon: Plan,
  //   show: true,
  // },
  // {
  //   id: 10,
  //   name: "Service schedules",
  //   link: "/service-schedule",
  //   icon: ServiceSchedule,
  //   show: true,
  // },
  // {
  //   id: 11,
  //   name: "Reports",
  //   link: "/reports",
  //   icon: Reports,
  //   show: true,
  // },
];

export default navbar_items;