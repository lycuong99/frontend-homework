import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFieldProps } from "@/types/form";
import { useFormContext } from "react-hook-form";

export interface TextfieldProps extends FormFieldProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  className?: string;
  readOnly?: boolean;
}

export function Textfield({
  className = "",
  name,
  label,
  placeholder,
  type = "text",
  readOnly = false,
}: Readonly<TextfieldProps>) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input className={className} placeholder={placeholder} type={type} {...field} readOnly={readOnly} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
