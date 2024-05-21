import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronsLeftIcon } from "lucide-react";
import { Nav } from "./Nav";
import { sidelinks } from "@/data/sidelinks";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${
          isCollapsed ? "md:w-14" : "md:w-64"
        }`,
        className
      )}
    >
      <h1 className={cn("p-4 text-xl font-bold mb-2")}>
        {isCollapsed ? "M" : "MicroInvoice"}
      </h1>
      <Nav isCollapsed={isCollapsed} links={sidelinks} />
      <Button
        onClick={() => setIsCollapsed((prev) => !prev)}
        size="icon"
        variant="outline"
        className="absolute -right-5 top-1/2 hidden rounded-full md:inline-flex"
      >
        <ChevronsLeftIcon
          className={`h-5 w-5 ${isCollapsed ? "rotate-180" : ""}`}
        />
      </Button>
    </aside>
  );
}
