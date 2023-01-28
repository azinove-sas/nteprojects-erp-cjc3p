import { MdOutlineDashboard, MdOutlineAnalytics, MdAdminPanelSettings, MdQrCode2, MdOutlinePermIdentity, MdMoreHoriz } from "react-icons/md";
import { VscServer } from "react-icons/vsc";
import { SiCivicrm } from "react-icons/si";
import { BsPersonBoundingBox } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa";
import { GrCloudSoftware } from "react-icons/gr";
import { AiOutlineOrderedList, AiFillFileAdd } from "react-icons/ai";

export const menuItem = [
  {
    title: "Dashboard",
    icon: <MdOutlineDashboard />,
    url: "/",
  },
  {
    title: "Services",
    icon: <VscServer />,
    url: "/services",
    submenu: [
      {
        title: "QR Code Generation",
        icon: <MdQrCode2 />,
        url: "web-design",
        submenu: [
          {
            title: "List",
            icon: <AiOutlineOrderedList />,
            url: "web-design",
          },
          {
            title: "add",
            icon: <AiFillFileAdd />,
            url: "web-design",
          },
        ],
      },
      {
        title: "Business Analytics",
        icon: <MdOutlineAnalytics />,
        url: "web-design",
      },
    ],
  },
  {
    title: "Warehouse",
    icon: <FaWarehouse />,
    url: "/warehouse",
  },
  {
    title: "CRM",
    icon: <SiCivicrm />,
    url: "/crm",
    submenu: [
      {
        title: "Customer",
        icon: <BsPersonBoundingBox />,
        url: "web-design",
      },
    ],
  },
  {
    title: "Administration",
    icon: <MdAdminPanelSettings />,
    url: "/about",
    submenu: [
      {
        title: "Permissions",
        icon: <MdOutlinePermIdentity />,
        url: "/admin/username",
      },
    ],
  },
  {
    title: "More",
    icon: <MdMoreHoriz />,
    url: "/more",
    submenu: [
      {
        title: "Versions",
        icon: <GrCloudSoftware />,
        url: "/more/versions",
      },
    ],
  },
];
