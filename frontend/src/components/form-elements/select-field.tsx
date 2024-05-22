import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormFieldProps } from "@/types/form";
import { useFormContext } from "react-hook-form";

export interface SelectfieldProps extends FormFieldProps {
  children: React.ReactNode;
}

export function Selectfield({ name, label, placeholder, children }: SelectfieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{children}</SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
