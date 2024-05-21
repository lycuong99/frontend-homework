import useCheckActiveNav from "@/hooks/useCheckActiveNav";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { buttonVariants } from "../ui/button";

const NavGroup = ({
  children,
  header,
}: {
  children: React.ReactNode;
  header: string;
}) => {
  return (
    <div className="px-3 py-2">
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
        {header}
      </h2>
      <div className="space-y-1">{children}</div>
    </div>
  );
};

interface NavLink {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
  disabled?: boolean;
}
const NavLink = ({ title, href, icon, label, disabled }: NavLink) => {
  const { checkActiveNav } = useCheckActiveNav();
  const Icon = icon;
  return (
    <Link
      href={href}
      className={cn(
        "group flex justify-start items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
        checkActiveNav(href) ? "bg-accent" : "transparent",
        disabled && "cursor-not-allowed opacity-80"
      )}
    >
      <Icon className="mr-2 h-4 w-4" />
      {title}
    </Link>
  );
};

const NavLinkCollapsed = ({ title, href, icon, label }: NavLink) => {
  const { checkActiveNav } = useCheckActiveNav();
  const Icon = icon;
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-9 w-9"
            //   "default" === "default" &&
            //     "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
          )}
        >
          <Icon className="h-4 w-4" />
          <span className="sr-only">{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        {title}
        {label && (
          <span className="ml-auto text-muted-foreground">{label}</span>
        )}
      </TooltipContent>
    </Tooltip>
  );
};
interface NavProps {
  isCollapsed: boolean;
  links: any[];
}
const Nav = ({ isCollapsed, links }: NavProps) => {
  return (
    <nav className="flex flex-col gap-1 px-2">
      {links.map((link) => {
        return isCollapsed ? (
          <NavLinkCollapsed key={link.href} {...link} />
        ) : (
          <NavLink key={link.href} {...link} />
        );
      })}
    </nav>
  );
};

export { Nav, NavGroup };
