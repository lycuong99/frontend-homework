import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, TrashIcon } from "lucide-react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Textfield } from "@/components/form-elements/text-field";
import { formatCurrency } from "@/utils/number-format";

export const InvoiceItemTable = () => {
  const { control } = useFormContext();
  const { fields, append, remove,} = useFieldArray({
    control,
    name: "items",
  });
  const results = useWatch({ control, name: "items" });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Items</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[320px]">Item Name</TableHead>
              <TableHead className="w-[120px]">Quantity</TableHead>
              <TableHead className="w-[220px]">Rate</TableHead>
              <TableHead className="w-[220px]">Price</TableHead>
              <TableHead className="w-[220px]">Amount</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  <Textfield name={`items.${index}.name`} placeholder={"Item "+(index+1)} />
                </TableCell>
                <TableCell>
                  <Textfield name={`items.${index}.quantity`} type="number"  />
                </TableCell>
                <TableCell>
                  <Textfield name={`items.${index}.rate`} />
                </TableCell>
                <TableCell>
                  <Textfield name={`items.${index}.price`} type="number" />
                </TableCell>
                <TableCell>{formatCurrency((results?.[index]?.quantity ?? 0) * (results?.[index]?.price ?? 0))}</TableCell>
                <TableCell>
                  <Button size="icon" variant="outline" onClick={() => remove(index)}>
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button
          size="sm"
          variant="ghost"
          className="gap-1"
          onClick={() =>
            append({
              name: `Item ${fields.length + 1}`,
              quantity: 1,
              rate: "pieces",
              price: 100,
            })
          }
        >
          <PlusCircle className="h-3.5 w-3.5" />
          Add Item
        </Button>
      </CardFooter>
    </Card>
  );
};
