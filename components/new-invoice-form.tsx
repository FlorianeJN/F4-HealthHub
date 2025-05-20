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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createNewInvoice } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const partenaires = ["CHSLD Saint-Jean", "CHSLD Granby"];
const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];
const years = ["2025"];

const formSchema = z.object({
  partenaire: z.string().min(1, "Le partenaire est requis"),
  mois: z.string().min(1, "Le mois est requis"),
  annee: z.string().min(1, "L'année est requise"),
});
type FormValues = z.infer<typeof formSchema>;

interface NewInvoiceFormProps {
  onClose: () => void;
}

export function NewInvoiceForm({ onClose }: NewInvoiceFormProps) {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { partenaire: "", mois: "", annee: "" },
  });

  const onSubmit = async (data: FormValues) => {
    const newInvoiceNumber = await createNewInvoice(data);
    toast.success("Facture crée!");
    onClose();
    router.push(`/dashboard/invoices/${newInvoiceNumber}`);
  };

  return (
    <div className="p-1 space-y-6 w-full max-w-md mx-auto">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-lg font-semibold">Création de nouvelle facture</h2>
        <button
          onClick={onClose}
          type="button"
          className="text-2xl hover:cursor-pointer"
        >
          &times;
        </button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="partenaire"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Partenaire</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choisir un partenaire" />
                      </SelectTrigger>
                      <SelectContent>
                        {partenaires.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mois"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mois</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner un mois" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((m, i) => (
                          <SelectItem
                            key={m}
                            value={(i + 1).toString().padStart(2, "0")}
                          >
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="annee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Année</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner une année" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((y) => (
                          <SelectItem key={y} value={y}>
                            {y}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" className="hover:cursor-pointer">
              Créer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
