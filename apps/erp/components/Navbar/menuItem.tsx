import {
  MdOutlineDashboard,
  MdOutlineAnalytics,
  MdAdminPanelSettings,
  MdQrCode2,
  MdOutlinePermIdentity,
  MdMoreHoriz,
} from "react-icons/md";
import { VscServer } from "react-icons/vsc";
import { SiCivicrm } from "react-icons/si";
import { BsPersonBoundingBox } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa";
import { GrCloudSoftware } from "react-icons/gr";
import { AiOutlineOrderedList, AiFillFileAdd } from "react-icons/ai";
import { ROLE } from "@constant/rolesList";

export const menuItem = [
  {
    title: "Dashboard",
    icon: <MdOutlineDashboard />,
    role: ROLE.default,
    url: "/",
  },
  {
    title: "Services",
    icon: <VscServer />,
    role: ROLE.default,
    url: "/services",
    submenu: [
      {
        title: "Certification Generation",
        icon: <MdQrCode2 />,
        role: ROLE.default,
        url: "/certification",
        submenu: [
          {
            title: "List",
            icon: <AiOutlineOrderedList />,
            role: ROLE.default,
            url: "/certification/list",
          },
          {
            title: "Add",
            icon: <AiFillFileAdd />,
            role: ROLE.admin,
            url: "/certification/add",
          },
        ],
      },
      {
        title: "Business Analytics",
        icon: <MdOutlineAnalytics />,
        role: ROLE.default,
        url: "web-design",
      },
    ],
  },
  {
    title: "Warehouse",
    icon: <FaWarehouse />,
    role: ROLE.default,
    url: "/warehouse",
  },
  {
    title: "CRM",
    icon: <SiCivicrm />,
    role: ROLE.default,
    url: "/crm",
    submenu: [
      {
        title: "Customer",
        icon: <BsPersonBoundingBox />,
        role: ROLE.default,
        url: "web-design",
      },
    ],
  },
  {
    title: "Administration",
    icon: <MdAdminPanelSettings />,
    url: "/admin",
    role: ROLE.admin,
    submenu: [
      {
        title: "Permissions",
        icon: <MdOutlinePermIdentity />,
        role: ROLE.default,
        url: "/admin/username",
      },
    ],
  },
  {
    title: "More",
    icon: <MdMoreHoriz />,
    role: ROLE.default,
    url: "/more",
    submenu: [
      {
        title: "Versions",
        icon: <GrCloudSoftware />,
        role: ROLE.default,
        url: "/more/versions",
      },
    ],
  },
];
