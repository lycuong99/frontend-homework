"use client";
import { DataTable } from "@/components/data-table";
import { columns } from "@/app/invoice/columns";
import { useStore } from "@/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import { statuses } from "@/data/data";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import { InvoiceStatus } from "@/types/invoice";


const InvoiceList = () => {
  const { invoices } = useStore();
  const [tab, setTab] = useState("all");

  const { invoicesFilter } = useMemo(() => {
    if (tab === "all") {
      return { invoicesFilter: invoices };
    } else {
      return {
        invoicesFilter: invoices.filter((invoice) => invoice.status === tab),
      };
    }
  }, [invoices, tab]);

  function countStatus(status: string) {
    if(status === "all") return invoices.length
    return invoices.filter((invoice) => invoice.status === status).length;
  }
  return (
    <>
      <Tabs
        orientation="vertical"
        defaultValue="overview"
        className="space-y-4"
        value={tab}
        onValueChange={setTab}
      >
        <div className="w-full overflow-x-scroll pb-2">
          <TabsList>
            <TabsTrigger value="all"  className="flex gap-2">All <Badge className="p-1 text-xs" variant={"default"}>{countStatus('all')}</Badge></TabsTrigger>

            {statuses.map((status) => (
              <TabsTrigger className="flex gap-2" key={status.value} value={status.value}>
                {status.label} <StatusBadge className="p-1 py-0.5" status={status.value as InvoiceStatus}>{countStatus(status.value)}</StatusBadge>
              </TabsTrigger>
            ))}
          </TabsList>
         
        </div>
        <DataTable data={invoicesFilter} columns={columns} />
      </Tabs>
    </>
  );
};

export default InvoiceList;
