import { TLinkSidebar } from "@/types/general.types";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import PeopleIcon from '@mui/icons-material/People';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

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
  {
    id: 3,
    name: "Courses",
    link: "/admin/courses",
    icon: GolfCourseIcon,
    show: false,
  },
  {
    id: 4,
    name: "Users",
    link: "/admin/users",
    icon: PeopleIcon,
    show: false,
  },
  {
    id: 5,
    name: "Simulator",
    link: "/simulator",
    icon: AutoGraphIcon,
    show: true,
  },
];

export default navbar_items;