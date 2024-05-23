"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import Link from "next/link";
import { Customer } from "@/types/invoice";
import { useStore } from "@/store";
import { AlertModal } from "../../components/modal/alert-modal";
import { useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const item = row.original as Customer;

  const { removeCustomer } = useStore();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onConfirm = async () => {
    setLoading(true);
    

    setTimeout(()=>{
      if(item.id){
        removeCustomer(item.id)
      }
      setLoading(false)
      setOpen(false)
    },1000);
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem asChild>
            <Link href={`/customer/edit/${item.id}`}>Edit</Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem asChild>
            <Link href={`/customer/${item.id}`}>View</Link>
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
    </>
  );
}
