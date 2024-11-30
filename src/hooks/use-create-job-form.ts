import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createJobFormSchema } from "@/lib/validations/job";

export function useCreateJobForm() {
  return useForm({
    resolver: zodResolver(createJobFormSchema),
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
}