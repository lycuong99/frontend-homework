
import { Dot, LayoutDashboard, LucideIcon, BarChart3, Receipt, Settings , CreditCard, Users} from "lucide-react";
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
    title: "Payment",
    label: "",
    href: "/payment",
    icon: CreditCard,
  },
  {
    title: "Customer",
    label: "",
    href: "/customer",
    icon: Users,
  },
  {
    title: "Report",
    label: "",
    href: "/report",
    icon: BarChart3,
  },
  {
    title: "Setting",
    label: "",
    href: "/setting",
    icon: Settings,
  },
];
