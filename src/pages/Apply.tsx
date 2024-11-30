import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";

const applyFormSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis"),
  lastName: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  gender: z.enum(["homme", "femme"]),
  age: z.number().min(18, "Vous devez avoir au moins 18 ans"),
  professionalExperience: z.string().min(10, "Veuillez décrire votre expérience"),
  skills: z.string().min(10, "Veuillez décrire vos compétences"),
  diploma: z.string().min(2, "Diplôme requis"),
  yearsOfExperience: z.number().min(0, "Nombre d'années invalide"),
  previousCompany: z.string().optional(),
  cv: z.instanceof(File),
  coverLetter: z.instanceof(File),
});

const Apply = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: job, isLoading: jobLoading } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const form = useForm({
    resolver: zodResolver(applyFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "homme",
      age: 18,
      professionalExperience: "",
      skills: "",
      diploma: "",
      yearsOfExperience: 0,
      previousCompany: "",
    },
  });

  const applyMutation = useMutation({
    mutationFn: async (values: z.infer<typeof applyFormSchema>) => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) throw new Error("Vous devez être connecté");

      // Upload CV
      const cvFile = values.cv;
      const cvPath = `applications/${user.data.user.id}/${id}/cv-${Date.now()}${cvFile.name}`;
      const { error: cvError } = await supabase.storage
        .from("documents")
        .upload(cvPath, cvFile);
      if (cvError) throw cvError;

      // Upload Cover Letter
      const clFile = values.coverLetter;
      const clPath = `applications/${user.data.user.id}/${id}/cl-${Date.now()}${clFile.name}`;
      const { error: clError } = await supabase.storage
        .from("documents")
        .upload(clPath, clFile);
      if (clError) throw clError;

      // Create application
      const { error: applicationError } = await supabase.from("applications").insert({
        job_id: id,
        user_id: user.data.user.id,
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        phone: values.phone,
        gender: values.gender,
        age: values.age,
        professional_experience: values.professionalExperience,
        skills: values.skills,
        diploma: values.diploma,
        years_of_experience: values.yearsOfExperience,
        previous_company: values.previousCompany,
        cv_url: cvPath,
        cover_letter_url: clPath,
      });

      if (applicationError) throw applicationError;
    },
    onSuccess: () => {
      toast.success("Votre candidature a été envoyée avec succès");
      navigate("/jobs");
    },
    onError: (error) => {
      console.error("Erreur lors de l'envoi de la candidature:", error);
      toast.error("Erreur lors de l'envoi de la candidature");
    },
  });

  if (jobLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-primary">
              Postuler pour: {job?.title}
            </h1>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) => applyMutation.mutate(values))}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Genre</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez votre genre" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="homme">Homme</SelectItem>
                            <SelectItem value="femme">Femme</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Âge</FormLabel>
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
                </div>

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
                        <Textarea
                          {...field}
                          placeholder="Décrivez vos compétences..."
                        />
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

                <Button
                  type="submit"
                  className="w-full"
                  disabled={applyMutation.isPending}
                >
                  {applyMutation.isPending ? "Envoi en cours..." : "Envoyer ma candidature"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Apply;