import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LanguageLevels } from "@/components/job-form/LanguageLevels";
import { ContractTypeField } from "@/components/job-form/ContractTypeField";

export function JobFormFields({ form }: { form: any }) {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Titre du poste</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Conseiller Immobilier Senior" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="positions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre de postes</FormLabel>
            <FormControl>
              <Input type="number" min="1" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lieu de travail</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Dakar, Sénégal" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <ContractTypeField form={form} />

      <FormField
        control={form.control}
        name="department"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Département</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Marketing Digital" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="expirationDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date d'expiration</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="diploma"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Diplôme exigé</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Master en Marketing Digital" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description du poste</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Décrivez les responsabilités et missions du poste"
                className="min-h-[150px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="technicalSkills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Compétences techniques requises</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Listez les compétences techniques requises"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="softSkills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Compétences comportementales</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Listez les compétences comportementales requises"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tools"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Outils à maîtriser</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Listez les outils et logiciels à maîtriser"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="experience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Formation et expérience exigées</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Détaillez les prérequis en termes de formation et d'expérience"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Niveaux linguistiques exigés</h3>
        <div className="space-y-6">
          <LanguageLevels form={form} language="french" />
          <LanguageLevels form={form} language="english" />
          <LanguageLevels form={form} language="wolof" />
        </div>
      </div>
    </>
  );
}