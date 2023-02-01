import Tabs_1 from "./tabs/Tabs_1";
import Tabs_2 from "./tabs/Tabs_2";

export interface tabsListType {
  name: string;
  child: React.ReactNode;
}

export const tabsList: tabsListType[] = [
  {
    name: "Information",
    child: <Tabs_1 />,
  },
  {
    name: "Permission",
    child: <Tabs_2 />,
  },
];
