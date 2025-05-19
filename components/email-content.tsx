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

import { fetchPartnerEmailFromInvoiceNumber } from "@/lib/data";
import { Shift } from "@/lib/definitions";
import { generateInvoicePDFBlob, PartnerInfo } from "@/lib/generateInvoicePDF";
import { Check, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { EnterpriseInfo, InvoiceAmounts } from "./download-invoice-button";

type EmailContentProps = {
  onClose: () => void;
  invoiceNumber: string;
  date: string;
  enterpriseInfo: EnterpriseInfo;
  partnerInfo: PartnerInfo;
  shifts: Shift[];
  amounts: InvoiceAmounts;
};

const formSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  content: z.string().min(1, "Le contenu est requis"),
});

type FormValues = z.infer<typeof formSchema>;

export default function EmailContent({
  onClose,
  invoiceNumber,
  date,
  enterpriseInfo,
  partnerInfo,
  shifts,
  amounts,
}: EmailContentProps) {
  //  const numFacture = usePathname().split("/").pop();

  // Génère la date du jour en français, ex. "19 mai 2025"
  const today = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function generateContent(invoiceNumber: string | undefined) {
    if (!invoiceNumber) return;

    return `Bonjour,

Veuillez trouver ci-joint la facture n° ${invoiceNumber}, émise le ${today}.

Merci de votre confiance.

L’équipe F4 Santé inc.
Tél. : 514-797-6357
Email : f4sante@gmail.com
Site web : https://www.f4santeinc.com `;
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: `Facture #${invoiceNumber}`,
      content: generateContent(invoiceNumber),
    },
  });

  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (data: FormValues, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault(); // ✅ prevent full page reload
    setSuccess(false);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);

    startTransition(async () => {
      await sendEmail(formData);
      setSuccess(true);
      setTimeout(() => onClose(), 2000);
    });
  };

  async function sendEmail(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const partnerEmail =
      await fetchPartnerEmailFromInvoiceNumber(invoiceNumber);

    const pdfBuffer = generateInvoicePDFBlob({
      invoiceNumber: invoiceNumber,
      amounts: amounts,
      date: date,
      enterpriseInfo: enterpriseInfo,
      partnerInfo: partnerInfo,
      shifts: shifts,
    });

    const data = new FormData();
    data.append("content", content);
    data.append("title", title);
    data.append(
      "attachment",
      new Blob([pdfBuffer], { type: "application/pdf" }),
      `facture-${invoiceNumber}.pdf`
    );
    data.append("to", partnerEmail);

    const res = await fetch("/api/send-email", {
      method: "POST",
      body: data,
    });

    const responseData = await res.json();
    if (!res.ok) {
      throw new Error(responseData || "Email failed");
    }

    toast.success(`Courriel contenant la facture #${invoiceNumber} envoyé`);
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-row justify-between items-center border-b pb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Envoyer la facture par courriel
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-muted-foreground hover:cursor-pointer hover:text-foreground text-3xl font-bold"
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
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              className="hover:cursor-pointer"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="hover:cursor-pointer"
            >
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
