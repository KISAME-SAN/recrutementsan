import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contractTypes = [
  "CDI",
  "CDD",
  "Stage",
  "Alternance",
  "Intérim",
  "Freelance",
  "Temps partiel",
  "Saisonnier",
  "Apprentissage",
  "Professionnalisation",
] as const;

export const ContractTypeField = ({ form }: { form: any }) => {
  return (
    <FormField
      control={form.control}
      name="contractType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Type de contrat</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le type de contrat" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {contractTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};