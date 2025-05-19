"use client";

import { useState } from "react";
import { DownloadInvoiceButtonProps } from "./download-invoice-button";
import EmailContent from "./email-content";
import Modal from "./modal";
import { Button } from "./ui/button";

export default function SendEmailAction({
  invoiceNumber,
  date,
  enterpriseInfo,
  partnerInfo,
  shifts,
  amounts,
}: DownloadInvoiceButtonProps) {
  const [open, setOpen] = useState(false);

  function handleButtonClick() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      <Button
        onClick={handleButtonClick}
        className="hover:cursor-pointer"
        size="lg"
        variant="outline"
      >
        Envoyer la facture par courriel
      </Button>
      <Modal isOpen={open} onClose={closeModal}>
        <EmailContent
          amounts={amounts}
          date={date}
          enterpriseInfo={enterpriseInfo}
          invoiceNumber={invoiceNumber}
          partnerInfo={partnerInfo}
          shifts={shifts}
          onClose={closeModal}
        />
      </Modal>
    </>
  );
}
