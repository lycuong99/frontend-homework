"use client";
import { DataTable } from "@/components/data-table";
import { useStore } from "@/store";

import { columns } from "./column";
import { DataTableToolbar } from "./data-table-toolbar";


const CustomerList = () => {
  const { customers } = useStore();


  return (
    <>
       <DataTable data={customers} columns={columns} toolbar={(table)=>{
        return <DataTableToolbar table={table} />
       }} />
    </>
  );
};

export default CustomerList;
