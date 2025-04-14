"use client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addPartner } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  nom_partenaire: z.string().min(2, "Le nom du partenaire est requis."),
  no_civique: z.string().min(1, "Le numéro civique est requis."),
  rue: z.string().min(2, "Le nom de la rue est requis."),
  ville: z.string().min(2, "La ville est requise."),
  province: z.string().min(2, "La province est requise."),
  code_postal: z.string(),
  telephone: z
    .string()
    .min(10, "Numéro de téléphone requis.")
    .regex(/^\d{10}$/, "Téléphone invalide. Format attendu: 5147786357"),
  courriel: z.string().email("Adresse courriel invalide."),
});

type AddPartnerFormProps = {
  onClose: () => void;
};

export default function MyForm({ onClose }: AddPartnerFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom_partenaire: "",
      no_civique: "",
      rue: "",
      ville: "",
      province: "",
      code_postal: "",
      telephone: "",
      courriel: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  async function handleAction(formData: FormData) {
    setSuccess(false);
    startTransition(async () => {
      await addPartner(formData);
      setSuccess(true);
      form.reset();
      setTimeout(() => {
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 200);
      }, 2000);
    });
  }

  return (
    <Form {...form}>
      <form
        action={handleAction}
        className="w-full max-w-5xl mx-auto space-y-10"
      >
        {/* Header */}
        <div className="flex flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
          <h2 className="text-lg font-semibold text-foreground md:text-2xl">
            Ajouter un Partenaire
          </h2>

          <button
            onClick={onClose}
            type="button"
            className="text-muted-foreground hover:text-foreground text-3xl font-bold leading-none hover:cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Responsive Grid Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Field: Nom du Partenaire */}
          <FormField
            control={form.control}
            name="nom_partenaire"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du Partenaire</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Field: Numéro civique */}
          <FormField
            control={form.control}
            name="no_civique"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro civique</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Field: Rue */}
          <FormField
            control={form.control}
            name="rue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rue</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Field: Ville */}
          <FormField
            control={form.control}
            name="ville"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ville</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Field: Province */}
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Province</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="QC" className="hover:cursor-pointer">
                      Québec
                    </SelectItem>
                    <SelectItem value="AB" className="hover:cursor-pointer">
                      Alberta
                    </SelectItem>
                    <SelectItem value="BC" className="hover:cursor-pointer">
                      Colombie-Britannique
                    </SelectItem>
                    <SelectItem value="MB" className="hover:cursor-pointer">
                      Manitoba
                    </SelectItem>
                    <SelectItem value="NB" className="hover:cursor-pointer">
                      Nouveau-Brunswick
                    </SelectItem>
                    <SelectItem value="NL" className="hover:cursor-pointer">
                      Terre-Neuve-et-Labrador
                    </SelectItem>
                    <SelectItem value="NS" className="hover:cursor-pointer">
                      Nouvelle-Écosse
                    </SelectItem>
                    <SelectItem value="NT" className="hover:cursor-pointer">
                      Territoires du Nord-Ouest
                    </SelectItem>
                    <SelectItem value="NU" className="hover:cursor-pointer">
                      Nunavut
                    </SelectItem>
                    <SelectItem value="ON" className="hover:cursor-pointer">
                      Ontario
                    </SelectItem>
                    <SelectItem value="PE" className="hover:cursor-pointer">
                      Île-du-Prince-Édouard
                    </SelectItem>
                    <SelectItem value="SK" className="hover:cursor-pointer">
                      Saskatchewan
                    </SelectItem>
                    <SelectItem value="YT" className="hover:cursor-pointer">
                      Yukon
                    </SelectItem>
                  </SelectContent>
                </Select>
                <input
                  type="hidden"
                  name="province"
                  value={field.value ?? ""}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Field: Code postal */}
          <FormField
            control={form.control}
            name="code_postal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code postal</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Field: Téléphone */}
          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input placeholder="" type="number" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Field: Courriel */}
          <FormField
            control={form.control}
            name="courriel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Courriel</FormLabel>
                <FormControl>
                  <Input placeholder="" type="email" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-full sm:w-auto hover:cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" /> Enregistrement...
              </>
            ) : success ? (
              <>
                <Check className="text-green-500 h-4 w-4" /> Enregistré!
              </>
            ) : (
              "Enregistrer"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
