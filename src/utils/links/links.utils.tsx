import { TLinkSidebar } from "@/types/general.types";
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

];

export default navbar_items;