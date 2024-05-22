import { InvoiceStatus } from "@/types/invoice";
import { Badge, BadgeProps } from "./ui/badge";

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
export function StatusBadge({ status, children }: StatusBadgeProps) {
  const variant = statusToVariant[status] as BadgeProps["variant"];
  return (
    <Badge className="px-3 py-2 text-sm" variant={variant}>
      {children}
    </Badge>
  );
}
