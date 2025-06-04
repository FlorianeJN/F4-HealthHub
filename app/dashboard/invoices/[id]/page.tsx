export const dynamic = "force-dynamic";

import DownloadInvoiceButton from "@/components/download-invoice-button";
import SendEmailAction from "@/components/email-modal";

import { InvoiceShiftsTable } from "@/components/invoice-shifts-table";
import { InvoiceStats } from "@/components/invoice-stats";
import PDFImagesPreload from "@/components/PDFImagesPreload";

import StatusBadgeDropdown from "@/components/status-badge-dropdown";
//import { Badge } from "@/components/ui/badge";

import {
  fetchEnterpriseInfo,
  fetchInvoice,
  fetchInvoiceAmounts,
  fetchInvoiceRow,
  fetchPartnerByName,
  fetchStatus,
} from "@/lib/data";

import { formatDate } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "F4 HealthHub - Détails de la facture",
  description: "Consultez les détails de la facture et les quarts associés",
};

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const shifts = await fetchInvoice(id);
  const invoiceNumber = id;
  const [, month, year] = invoiceNumber.split("-");
  const date = new Date(parseInt(year), parseInt(month));
  const status = await fetchStatus(invoiceNumber);
  const enterpriseInfo = await fetchEnterpriseInfo();
  const amounts = await fetchInvoiceAmounts(invoiceNumber);
  const invoiceRow = await fetchInvoiceRow(invoiceNumber);
  const partner = invoiceRow?.nom_partenaire
    ? await fetchPartnerByName(invoiceRow.nom_partenaire)
    : null;
  const partnerInfo = partner
    ? {
        ...partner,
        telephone: partner.telephone ? String(partner.telephone) : undefined,
      }
    : { nom: invoiceRow?.nom_partenaire || "" };

  return (
    <>
      <PDFImagesPreload />

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-6 py-4 px-4 sm:px-6 md:gap-8 md:py-6 lg:px-8">
            {/* Header: Title + Status */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold">Facture {invoiceNumber}</h1>
                <p className="text-muted-foreground mt-1">
                  {formatDate(date.toISOString())}
                </p>
              </div>
              <StatusBadgeDropdown currentStatus={status} />
            </div>

            {/* Buttons */}
            <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:justify-end">
              <SendEmailAction
                invoiceNumber={invoiceNumber}
                date={date.toLocaleDateString("fr-CA")}
                enterpriseInfo={{
                  enterprise:
                    enterpriseInfo.enterprise &&
                    "nom" in enterpriseInfo.enterprise
                      ? (enterpriseInfo.enterprise as {
                          nom: string;
                          telephone?: string;
                          courriel?: string;
                          [key: string]: unknown;
                        })
                      : { nom: "Nom Entreprise inconnu" },
                  address: enterpriseInfo.address,
                }}
                partnerInfo={partnerInfo}
                shifts={shifts}
                amounts={amounts}
              />
              <DownloadInvoiceButton
                invoiceNumber={invoiceNumber}
                date={date.toLocaleDateString("fr-CA")}
                enterpriseInfo={{
                  enterprise:
                    enterpriseInfo.enterprise &&
                    "nom" in enterpriseInfo.enterprise
                      ? (enterpriseInfo.enterprise as {
                          nom: string;
                          telephone?: string;
                          courriel?: string;
                          [key: string]: unknown;
                        })
                      : { nom: "Nom Entreprise inconnu" },
                  address: enterpriseInfo.address,
                }}
                partnerInfo={partnerInfo}
                shifts={shifts}
                amounts={amounts}
              />
            </div>

            {/* Stats + Table */}
            <InvoiceStats num_facture={invoiceNumber} />
            <InvoiceShiftsTable shifts={shifts} />
          </div>
        </div>
      </div>
    </>
  );
}
