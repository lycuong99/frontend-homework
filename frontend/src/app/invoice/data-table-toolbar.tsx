"use client";

import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "../../components/data-table-view-options";

import { priorities, statuses } from "@/data/data";
import { DataTableFacetedFilter } from "../../components/data-table-faceted-filter";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { DatePickerWithRange } from "../../components/ui/date-range-picker";
import { DateRange } from "react-day-picker";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
      <Input
          placeholder="Filter..."
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* <Input
          placeholder="Filter invoice..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("id")?.setFilterValue(event.target.value)  }
          className="h-8 w-[150px] lg:w-[250px]"
        /> */}
        {table.getColumn("status") && (
          <DataTableFacetedFilter column={table.getColumn("status")} title="Status" options={statuses} />
        )}

        {/* Filter by dueDate */}
        {table.getColumn("dueDate") && (
          <DatePickerWithRange size="sm" date={table.getColumn("dueDate")?.getFilterValue() as DateRange}  setDate={(value)=>{
            table.getColumn("dueDate")?.setFilterValue(value)
          }} />
        )}

       
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/* <DataTableViewOptions table={table} /> */}
      <Button size="sm" className="h-8 gap-1" asChild>
        <Link href={"/invoice/new"}>
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add</span>
        </Link>
      </Button>
    </div>
  );
}
