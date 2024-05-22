import { BellRing } from "lucide-react";
import { Button } from "../ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
export default function Header() {
  const pathname = usePathname();
  console.log(pathname, pathname.split("/"));

  return (
    <header className="flex justify-between p-4">
      {/* <h1 className="text-2xl"></h1> */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/`}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          {pathname
            .split("/")
            .filter(Boolean)
            .map((path, index) => (
              <Fragment key={path}>
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink href={`/${path}`}>
                    {path || "Home"}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </Fragment>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
      <Button variant="ghost" className="p-2">
        <BellRing className="h-5 w-5" />
      </Button>
    </header>
  );
}
