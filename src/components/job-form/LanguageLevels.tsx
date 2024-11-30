import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const levels = ["Débutant", "Intermédiaire", "Avancé", "Bilingue"] as const;

export const LanguageLevels = ({ form, language }: { form: any; language: string }) => {
  return (
    <FormField
      control={form.control}
      name={`${language}Level`}
      render={({ field }) => (
        <FormItem>
          <div className="mb-2">
            <Label>{language.charAt(0).toUpperCase() + language.slice(1)}</Label>
          </div>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-row space-x-4"
            >
              {levels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <RadioGroupItem value={level} id={`${language}-${level}`} />
                  <Label htmlFor={`${language}-${level}`}>{level}</Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};