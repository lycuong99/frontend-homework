import { Dot, LayoutDashboard, LucideIcon, Settings } from "lucide-react";
export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: LucideIcon;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: "Dashboard",
    label: "",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Customer",
    label: "",
    href: "/customer",
    icon: Settings,
  },
  {
    title: "Setting",
    label: "",
    href: "/setting",
    icon: Settings,
  },
];
