import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import NotificationIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import ListAltIcon from "@mui/icons-material/ListAlt";
import VerifiedIcon from "@mui/icons-material/Verified";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PendingIcon from "@mui/icons-material/Pending";
export const navigation = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/home",
  },

  {
    title: "Explore",
    icon: <ExploreIcon />,
    path: "/explore",
  },

  {
    title: "Notifications",
    icon: <NotificationIcon />,
    path: "/notification",
  },

  {
    title: "Messgass",
    icon: <MessageIcon />,
    path: "/Messages",
  },

  {
    title: "List",
    icon: <ListAltIcon />,
    path: "/list",
  },

  {
    title: "Verified",
    icon: <VerifiedIcon />,
    path: "/verified",
  },

  {
    title: "Profile",
    icon: <AccountCircleIcon />,
    path: "/profile",
  },

  {
    title: "More",
    icon: <PendingIcon />,
    path: "/more",
  },
];
