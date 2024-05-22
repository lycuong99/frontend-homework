import { InvoiceStatus } from "@/types/invoice";
import { Badge, BadgeProps } from "./ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps extends BadgeProps {
  status: InvoiceStatus;
  children?: React.ReactNode;
}

const statusToVariant = {
  draft: "secondary",
  paid: "success",
  late: "destructive",
  pending: "pending",
};
export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  const variant = statusToVariant[status] as BadgeProps["variant"];
  return (
    <Badge className={cn("px-3 py-2 text-sm", className)} variant={variant}>
      {children}
    </Badge>
  );
}
