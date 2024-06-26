"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { statuses } from "../../data/data";
import { DataTableColumnHeader } from "../../components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Invoice, InvoiceStatus } from "@/types/invoice";
import { formatCurrency } from "@/utils/number-format";
import { StatusBadge } from "../../components/status-badge";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { DATE_FORMAT } from "@/constants";
import { format } from "date-fns";
dayjs.extend(isBetween)
export const columns: ColumnDef<Invoice>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="InvoiceID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Billed to" />
    ),
    cell: ({ row }) => {
      const customerName = row.original.customer.name;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {customerName}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <StatusBadge className="px-1.5 py-1 text-xs" status={row.getValue("status") as InvoiceStatus}>
            {status.label}
          </StatusBadge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = formatCurrency(amount);

      return <div className="items-center">{formatted}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">{format(row.getValue("dueDate"), DATE_FORMAT)}</div>
    ),
    filterFn: (row, id, value) => {
      return dayjs(row.getValue("dueDate")).isBetween(dayjs(value.from), dayjs(value.to), 'day', '[]')
    }
    // enableSorting: false,
    // enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
