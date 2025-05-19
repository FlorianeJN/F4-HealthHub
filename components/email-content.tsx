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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Check, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";

type EmailContentProps = {
  onClose: () => void;
};

const formSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  content: z.string().min(1, "Le contenu est requis"),
});

type FormValues = z.infer<typeof formSchema>;

export default function EmailContent({ onClose }: EmailContentProps) {
  const numFacture = usePathname().split("/").pop();

  function generateContent(invoiceNumber: string | undefined) {
    if (!invoiceNumber) return;
    return `Bonjour,

Veuillez trouver ci-joint la facture n°${invoiceNumber} émise le 22 Nov.

Merci de votre confiance,
Cordialement,
Votre société`;
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: `Facture #${numFacture}`,
      content: generateContent(numFacture),
    },
  });

  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (data: FormValues) => {
    setSuccess(false);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);

    startTransition(async () => {
      //  await sendEmail(formData);
      setSuccess(true);
      setTimeout(() => onClose(), 2000);
    });
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-row justify-between items-center border-b pb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Envoyer la facture par courriel
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground text-3xl font-bold"
        >
          &times;
        </button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contenu</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi...
                </>
              ) : success ? (
                <>
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  Envoyé!
                </>
              ) : (
                "Envoyer"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
