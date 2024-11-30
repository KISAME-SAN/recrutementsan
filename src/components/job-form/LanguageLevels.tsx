import { Label } from "@/components/ui/label";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";

const levels = ["Débutant", "Intermédiaire", "Avancé", "Bilingue"] as const;

export const LanguageLevels = ({ form, language }: { form: any; language: string }) => {
  const getLevelLabel = (value: number) => {
    const index = Math.floor((value / 100) * (levels.length - 1));
    return levels[index];
  };

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
            <div className="space-y-2">
              <Slider
                min={0}
                max={100}
                step={33.33}
                value={[field.value ? levels.indexOf(field.value) * 33.33 : 0]}
                onValueChange={(value) => {
                  field.onChange(getLevelLabel(value[0]));
                }}
                className="w-[200px]"
              />
              <div className="flex justify-between w-[200px] text-sm text-muted-foreground">
                {levels.map((level) => (
                  <span key={level} className="px-1">
                    {level}
                  </span>
                ))}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};