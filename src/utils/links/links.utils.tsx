import { TLinkSidebar } from "@/types/general.types";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import PeopleIcon from '@mui/icons-material/People';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import TimelineIcon from '@mui/icons-material/Timeline';
import FileUploadIcon from '@mui/icons-material/FileUpload';

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
    name: "HCP Simulator",
    link: "/simulator",
    icon: AutoGraphIcon,
    show: true,
  },
  {
    id: 6,
    name: "Handicap History",
    link: "/handicap-history",
    icon: TimelineIcon,
    show: true,
  },
  {
    id: 7,
    name: "Import Rounds",
    link: "/import-rounds",
    icon: FileUploadIcon,
    show: true,
  },
];

export default navbar_items;