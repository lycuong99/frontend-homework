import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function PathToBreadcrumb() {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);

    return <Breadcrumb className="items-center flex">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href={`/`}>Dashboard</BreadcrumbLink>
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
         {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
        </Fragment>
      ))}
    </BreadcrumbList>
  </Breadcrumb>
}