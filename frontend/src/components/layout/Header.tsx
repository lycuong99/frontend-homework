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
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <header className="flex justify-between container py-2">
      {/* <h1 className="text-2xl"></h1> */}
      <Breadcrumb className="items-center flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/`}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          {pathSegments.map((segment, index) => (
            <Fragment key={segment}>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink
                  href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                >
                  {segment}
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
