"use client";

import { Invoice } from "@/types/invoice";
import { createContext, useContext, useState } from "react";
import jsonInvoices from "@/data/invoices.json";
interface StoreT {
  invoices: Invoice[];
  setInvoices: (invoices: Invoice[]) => void;
}
const defaultValues: StoreT = {
  invoices: [],
  setInvoices: () => {},
};

const storeContext = createContext<StoreT>(defaultValues);
const data: Invoice[] = jsonInvoices as Invoice[];
const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [invoices, setInvoices] = useState<Invoice[]>(data);

  return (
    <storeContext.Provider
      value={{
        invoices,
        setInvoices,
      }}
    >
      {children}
    </storeContext.Provider>
  );
};

function useStore() {
  const context = useContext(storeContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }

  const { invoices, setInvoices } = context;
  const addInvoice = (invoice: Invoice) => {
    setInvoices([...invoices, invoice]);
  };
  const removeInvoice = (id: string) => {
    const newInvoices = invoices.filter((invoice) => invoice.id !== id);
    setInvoices(newInvoices);
  };

  const getInvoice = (id: string) => {
    return invoices.find((invoice) => invoice.id === id);
  };

  const updateInvoice = (invoice: Invoice) => {
    const newInvoices = invoices.map((i) => {
      if (i.id === invoice.id) {
        return invoice;
      }
      return i;
    });
    setInvoices(newInvoices);
  };

  return {
    invoices,
    addInvoice,
    removeInvoice,
    getInvoice,
    updateInvoice,
  };
}
export { StoreProvider, useStore };
