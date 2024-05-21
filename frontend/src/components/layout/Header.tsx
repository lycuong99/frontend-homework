import { BellRing } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="flex justify-between p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Button variant="ghost" className="p-2">
        <BellRing className="h-5 w-5"/>
      </Button>
    </header>
  );
}
