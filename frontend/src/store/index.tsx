"use client";

import { Customer, Invoice } from "@/types/invoice";
import { createContext, useContext, useState } from "react";
import jsonInvoices from "@/data/invoices.json";
import jsonCustomers from "@/data/customers.json";
interface StoreT {
  invoices: Invoice[];
  setInvoices: (invoices: Invoice[]) => void;
  customers: Customer[];
  setCustomers: (customers: Customer[]) => void;
}
const defaultValues: StoreT = {
  invoices: [],
  setInvoices: () => {},
  customers: [],
  setCustomers: () => {},
};

const storeContext = createContext<StoreT>(defaultValues);
const data: Invoice[] = jsonInvoices as Invoice[];
const customersData: Customer[] = jsonCustomers as Customer[];
const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [invoices, setInvoices] = useState<Invoice[]>(data);
  const [customers, setCustomers] = useState<Customer[]>(customersData);

  return (
    <storeContext.Provider
      value={{
        invoices,
        setInvoices,
        customers,
        setCustomers
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

  const { invoices, setInvoices , customers, setCustomers} = context;
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

  const addCustomer = (customer: Customer) => {
    setCustomers([...customers, customer]);
  };

  const removeCustomer = (id: string) => {
    const newCustomers = customers.filter((customer) => customer.id !== id);
    setCustomers(newCustomers);
  };

  const getCustomer = (id: string) => {
    return customers.find((customer) => customer.id === id);
  };

  const updateCustomer = (customer: Customer) => {
    const newCustomers = customers.map((c) => {
      if (c.id === customer.id) {
        return customer;
      }
      return c;
    });
    setCustomers(newCustomers);
  };


  return {
    invoices,
    addInvoice,
    removeInvoice,
    getInvoice,
    updateInvoice,
    customers,
    addCustomer,
    removeCustomer,
    getCustomer,
    updateCustomer,
  };
}
export { StoreProvider, useStore };
