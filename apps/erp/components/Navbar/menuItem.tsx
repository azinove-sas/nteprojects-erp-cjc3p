import { MdOutlineDashboard, MdAdminPanelSettings, MdQrCode2, MdOutlinePermIdentity } from "react-icons/md";
import { VscServer } from "react-icons/vsc";
import { SiCivicrm } from "react-icons/si";
import { BsPersonBoundingBox } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa";

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
];
