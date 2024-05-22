import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFieldProps } from "@/types/form";
import { useFormContext } from "react-hook-form";

export interface TextfieldProps extends FormFieldProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
}

export function Textfield({ name, label, placeholder, type = "text" }: TextfieldProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
