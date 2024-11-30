import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ApplicationFormData } from "@/types/application";

interface DocumentFieldsProps {
  form: UseFormReturn<ApplicationFormData>;
}

export const DocumentFields = ({ form }: DocumentFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="cv"
        render={({ field: { value, onChange, ...field } }) => (
          <FormItem>
            <FormLabel>CV</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onChange(file);
                }}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="coverLetter"
        render={({ field: { value, onChange, ...field } }) => (
          <FormItem>
            <FormLabel>Lettre de motivation</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onChange(file);
                }}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};