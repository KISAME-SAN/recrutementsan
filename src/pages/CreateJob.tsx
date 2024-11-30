import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Form,
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

const formSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  positions: z.string().min(1, "Le nombre de postes est requis"),
  location: z.string().min(1, "Le lieu de travail est requis"),
  contractType: z.string().min(1, "Le type de contrat est requis"),
  department: z.string().min(1, "Le département est requis"),
  expirationDate: z.string().min(1, "La date d'expiration est requise"),
  diploma: z.string().min(1, "Le diplôme requis est requis"),
  description: z.string().min(1, "La description du poste est requise"),
  technicalSkills: z.string().min(1, "Les compétences techniques sont requises"),
  softSkills: z.string().min(1, "Les compétences comportementales sont requises"),
  tools: z.string().min(1, "Les outils à maîtriser sont requis"),
  experience: z.string().min(1, "L'expérience requise est requise"),
  frenchLevel: z.string().min(1, "Le niveau en français est requis"),
  englishLevel: z.string().min(1, "Le niveau en anglais est requis"),
  wolofLevel: z.string().min(1, "Le niveau en wolof est requis"),
});

const CreateJob = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      positions: "",
      location: "",
      contractType: "",
      department: "",
      expirationDate: "",
      diploma: "",
      description: "",
      technicalSkills: "",
      softSkills: "",
      tools: "",
      experience: "",
      frenchLevel: "",
      englishLevel: "",
      wolofLevel: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      console.log("Offre créée:", {
        ...values,
        createdAt: new Date().toISOString(),
      });
      
      toast.success("L'offre d'emploi a été créée avec succès");
      navigate("/admin");
    } catch (error) {
      toast.error("Une erreur est survenue lors de la création de l'offre");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-primary">
              Créer une offre d'emploi
            </h1>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/admin")}
                  >
                    Annuler
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Création en cours..." : "Créer l'offre"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateJob;