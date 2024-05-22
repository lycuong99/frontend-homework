
import { Dot, LayoutDashboard, LucideIcon, Paperclip, Receipt, Settings } from "lucide-react";
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
    title: "Invoice",
    label: "",
    href: "/invoice",
    icon: Receipt,
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
