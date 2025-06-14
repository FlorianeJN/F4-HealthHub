"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Shift } from "@/lib/definitions";
import { formatDate } from "@/lib/utils";
import { Button } from "./ui/button";

import { deleteShift } from "@/lib/actions";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "react-toastify";
import ConfirmationModal from "./confirmationModal";
import Modal from "./modal";
import ShiftForm from "./shift-form";

interface InvoiceShiftsTableProps {
  shifts: Shift[];
}

export function InvoiceShiftsTable({ shifts }: InvoiceShiftsTableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [shiftToDelete, setShiftToDelete] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<
    "add" | "update" | undefined
  >(undefined);
  const [shiftId, setShiftId] = useState<number>(0);

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleDelete(shiftId: number) {
    setModalContent(undefined);
    setShiftToDelete(shiftId);
    setIsOpen(true);
  }

  function handleUpdate(shiftId: number) {
    setShiftId(shiftId);
    setModalContent("update");
    setIsModalOpen(true);
  }

  async function handleConfirmDelete() {
    if (!shiftToDelete) {
      return;
    }

    const { success } = await deleteShift(shiftToDelete);

    if (success) {
      toast.success("Quart supprimé avec succès.");
    } else {
      toast.error(
        "Problème lors de la suppression du quart. Veuillez réessayer plus tard."
      );
    }

    setIsOpen(false);
  }

  function handleCancelDelete() {
    setIsOpen(false);
  }

  function handleAddShift() {
    setModalContent("add");
    setIsModalOpen(true);
  }

  const sortedShifts = [...shifts].sort(
    (a, b) =>
      new Date(a.date_quart).getTime() - new Date(b.date_quart).getTime()
  );

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent === "add" && (
          <ShiftForm mode="add" onClose={closeModal} />
        )}
        {modalContent === "update" && (
          <ShiftForm mode="update" shiftId={shiftId} onClose={closeModal} />
        )}
      </Modal>
      <Card>
        <CardHeader>
          <CardTitle>Liste des quarts</CardTitle>
          <div className="flex justify-end">
            <Button
              className="gap-2 hover:cursor-pointer"
              onClick={handleAddShift}
            >
              <IconPlus className="h-4 w-4" />
              Ajouter un quart
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Début</TableHead>
                  <TableHead>Fin</TableHead>
                  <TableHead>Pause</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Prestation</TableHead>
                  <TableHead>Taux</TableHead>
                  <TableHead>Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shifts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center">
                      Aucun quart trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedShifts.map((shift) => (
                    <TableRow
                      key={shift.id}
                      onClick={() => handleUpdate(shift.id)}
                      className="hover:cursor-pointer"
                    >
                      <TableCell>{formatDate(shift.date_quart)}</TableCell>
                      <TableCell>{shift.debut_quart}</TableCell>
                      <TableCell>{shift.fin_quart}</TableCell>
                      <TableCell>{shift.pause}</TableCell>
                      <TableCell>{shift.temps_total}</TableCell>
                      <TableCell>{shift.prestation}</TableCell>
                      <TableCell>{shift.taux_horaire} $</TableCell>
                      <TableCell>{shift.montant_total} $</TableCell>
                      <TableCell>
                        {
                          <Button
                            variant="outline"
                            className="hover:cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(shift.id);
                            }}
                          >
                            <IconTrash size={16} className="text-red-600" />
                            <span className="sr-only">Supprimer</span>
                          </Button>
                        }
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <ConfirmationModal
          isOpen={isOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          message="Êtes-vous sûr de vouloir supprimer ce quart ?"
        />
      </Card>
    </>
  );
}
