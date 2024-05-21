import useCheckActiveNav from "@/hooks/useCheckActiveNav";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
  icon: any;
  label?: string;
}
// const NavLink = ({title, href, icon, label}: NavLink) => {
//     const {checkActiveNav} = useCheckActiveNav(href);
//     return <Link href={href} className={
//         cn(
//             'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
//             path === link.href ? 'bg-accent' : 'transparent',
//             item.disabled && 'cursor-not-allowed opacity-80'
//           )
//     }>
//         <link.icon className="mr-2 h-4 w-4" />
//         {title}
//     </Link>
// };
interface NavProps {
  isCollapsed: boolean;
  links: any[];
}
const Nav = ({ isCollapsed, links }: NavProps) => {
  const { checkActiveNav } = useCheckActiveNav();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            //   checkActiveNav(link.href) ? "bg-accent" : "transparent",
              link.disabled && "cursor-not-allowed opacity-80"
            )}
          >
            <link.icon className="mr-2 h-4 w-4" />
            {link.title}
          </Link>
        );
      })}
    </>
  );
};

export { Nav, NavGroup };
