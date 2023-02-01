import MenuItems from "./MenuItems";
import { Box } from "rebass";

const Dropdown = ({ submenus, dropdown, depthLevel, userRole }: any) => {
  depthLevel = depthLevel + 1;

  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";

  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
      {submenus.map((submenu: any, index: number) => (
        <MenuItems
          items={submenu}
          key={index}
          depthLevel={depthLevel}
          userRole={userRole}
        />
      ))}
    </ul>
  );
};

export default Dropdown;
