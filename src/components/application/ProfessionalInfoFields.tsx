import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ApplicationFormData } from "@/types/application";

interface ProfessionalInfoFieldsProps {
  form: UseFormReturn<ApplicationFormData>;
}

export const ProfessionalInfoFields = ({ form }: ProfessionalInfoFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="professionalExperience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expérience professionnelle</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Décrivez votre expérience professionnelle..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Compétences</FormLabel>
            <FormControl>
              <Textarea {...field} placeholder="Décrivez vos compétences..." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="diploma"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diplôme</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yearsOfExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Années d'expérience</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="previousCompany"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entreprise précédente (optionnel)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};