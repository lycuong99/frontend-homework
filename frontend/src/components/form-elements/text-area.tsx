import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormFieldProps } from "@/types/form";
import { useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

export interface TextareaProps extends FormFieldProps {
  className?: string | undefined;
}

export function TextareaControl({
  className,
  name,
  label,
  placeholder,
}: TextareaProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={cn("resize-none", className)}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
