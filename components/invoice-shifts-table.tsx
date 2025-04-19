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
import ConfirmationModal from "./confirmationModal";

interface InvoiceShiftsTableProps {
  shifts: Shift[];
}

export function InvoiceShiftsTable({ shifts }: InvoiceShiftsTableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [shiftToDelete, setShiftToDelete] = useState<number | null>(null);

  function handleDelete(shiftId: number) {
    setShiftToDelete(shiftId);
    setIsOpen(true);
  }

  function handleConfirmDelete() {
    if (!shiftToDelete) {
      return;
    }

    deleteShift(shiftToDelete)
      .then(() => {
        // Refresh the page or update the state to reflect the deletion
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting shift:", error);
      });

    setIsOpen(false);
  }

  function handleCancelDelete() {
    setIsOpen(false);
  }

  function handleAddShift() {
    //TODO: Add shift using a modal
    console.log("add shift");
  }

  return (
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
                shifts.map((shift) => (
                  <TableRow key={shift.id}>
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
                          onClick={() => handleDelete(shift.id)}
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
  );
}
