"use client";

import { useState } from "react";
import EmailContent from "./email-content";
import Modal from "./modal";
import { Button } from "./ui/button";

export default function SendEmailAction() {
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
        <EmailContent onClose={closeModal} />
      </Modal>
    </>
  );
}
