import { BellRing } from "lucide-react";
import { Button } from "../ui/button";
import PathToBreadcrumb from "./PathToBreadcrumb";
export default function Header() {
  return (
    <header className="flex justify-between container py-2">
      {/* <h1 className="text-2xl"></h1> */}
      <PathToBreadcrumb />
      <Button variant="ghost" className="p-2">
        <BellRing className="h-5 w-5" />
      </Button>
    </header>
  );
}
